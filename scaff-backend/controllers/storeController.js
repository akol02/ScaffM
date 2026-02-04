const DeliveryChallan = require('../models/DeliveryChallan');
const SalesOrder = require('../models/SalesOrder');
const GoodsReceivedNote = require('../models/GoodsReceivedNote');
const MissingMaterial = require('../models/MissingMaterial');
const ExtraItemAdjustment = require('../models/ExtraItemAdjustment');
const Item = require('../models/Item');

// Helper: Auto-Gen DC-001
const generateDCNo = async () => {
    const last = await DeliveryChallan.findOne().sort({ _id: -1 });
    let nextId = 1001;
    if (last && last.docNo) {
        const parts = last.docNo.split('-');
        nextId = parseInt(parts[1]) + 1;
    }
    return `DC-${nextId}`;
};

// Helper: Auto-Gen GRN-001
const generateGRNNo = async () => {
    const last = await GoodsReceivedNote.findOne().sort({ _id: -1 });
    let nextId = 1001;
    if (last && last.docNo) {
        const parts = last.docNo.split('-');
        nextId = parseInt(parts[1]) + 1;
    }
    return `GRN-${nextId}`;
};


// Helper
const generateMISSNo = async () => {
    const last = await MissingMaterial.findOne().sort({ _id: -1 });
    let nextId = 1001;
    if (last && last.docNo) {
        const parts = last.docNo.split('-');
        nextId = parseInt(parts[1]) + 1;
    }
    return `MISS-${nextId}`;
};

// Helper
const generateADJNo = async () => {
    const last = await ExtraItemAdjustment.findOne().sort({ _id: -1 });
    let nextId = 1001;
    if (last && last.docNo) {
        const parts = last.docNo.split('-');
        nextId = parseInt(parts[1]) + 1;
    }
    return `ADJ-${nextId}`;
};

// 1. Get Pending Orders (With Item Code & Rate details)
// Returns only orders that are not fully completed, and only items inside them that have pending qty.
exports.getPendingOrders = async (req, res) => {
    try {
        const { customerId, siteId } = req.query;
        
        const orders = await SalesOrder.find({
            customer: customerId,
            site: siteId,
            status: { $ne: 'Completed' }
        }).populate('items.item', 'code name'); // Fetch Item Code

        const pendingOrders = orders.map(order => {
            const pendingItems = order.items.map(i => ({
                item: i.item._id,
                itemCode: i.item.code, // Item ID (Code)
                itemName: i.itemName,
                unit: i.unit,
                orderQty: i.quantity,
                deliveredQty: i.deliveredQty || 0,
                pending: i.quantity - (i.deliveredQty || 0),
                rate: i.rate,
                amount: i.amount
            })).filter(i => i.pending > 0);

            if (pendingItems.length > 0) {
                return {
                    _id: order._id,
                    docNo: order.docNo,
                    date: order.date,
                    items: pendingItems
                };
            }
            return null;
        }).filter(o => o !== null);

        res.json(pendingOrders);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// 2. Create Challan
exports.createChallan = async (req, res) => {
    try {
        const { customer, site, warehouse, referenceOrder, vehicleNo, driverName, driverMobile, remark, items } = req.body;
        
        const docNo = await generateDCNo();

        // A. Create the Challan
        const challan = await DeliveryChallan.create({
            docNo, date: new Date(), customer, site, warehouse, referenceOrder,
            vehicleNo, driverName, driverMobile, remark, items
        });

        // B. Update Sales Order (Increase Delivered Qty)
        // We only update the order if the item exists in the original order.
        // Manual/Extra items added to the challan are ignored for order tracking.
        if (referenceOrder) {
            const order = await SalesOrder.findById(referenceOrder);
            if (order) {
                let allDelivered = true;

                for (const chItem of items) {
                    // Try to find the item in the Sales Order
                    const orderItem = order.items.find(i => i.item.toString() === chItem.item.toString());
                    
                    if (orderItem) {
                        // Update the delivered count
                        orderItem.deliveredQty = (orderItem.deliveredQty || 0) + Number(chItem.currentQty);
                        
                        // Check if this specific item is NOT fully delivered yet
                        if (orderItem.deliveredQty < orderItem.quantity) {
                            allDelivered = false;
                        }
                    }
                    // If orderItem is undefined, it means this item was added manually to the DC (Extra Item).
                    // We don't update the order status based on extra items.
                }

                // Check global status of the order
                // If any item in the original order is not fully delivered, status is Partial.
                const isActuallyComplete = order.items.every(i => (i.deliveredQty || 0) >= i.quantity);
                
                order.status = isActuallyComplete ? 'Completed' : 'Partial';
                await order.save();
            }
        }

        res.status(201).json(challan);
    } catch (err) { 
        console.error(err);
        res.status(400).json({ message: err.message }); 
    }
};

// 3. Update Challan (Complex: Revert old qty -> Apply new qty)
exports.updateChallan = async (req, res) => {
    try {
        const { items: newItems, ...headerData } = req.body;
        const oldChallan = await DeliveryChallan.findById(req.params.id);
        
        if (!oldChallan) return res.status(404).json({ message: "Challan not found" });

        const order = await SalesOrder.findById(oldChallan.referenceOrder);

        if (order) {
            // A. Revert Old Quantities (Undo previous delivery)
            for (const oldItem of oldChallan.items) {
                const orderItem = order.items.find(i => i.item.toString() === oldItem.item.toString());
                if (orderItem) {
                    orderItem.deliveredQty -= oldItem.currentQty; // Subtract old sent amount
                    if (orderItem.deliveredQty < 0) orderItem.deliveredQty = 0; // Safety check
                }
            }

            // B. Apply New Quantities (Add new delivery)
            for (const newItem of newItems) {
                const orderItem = order.items.find(i => i.item.toString() === newItem.item.toString());
                if (orderItem) {
                    orderItem.deliveredQty += Number(newItem.currentQty); // Add new amount
                }
            }

            // C. Re-evaluate Order Status
            const isActuallyComplete = order.items.every(i => (i.deliveredQty || 0) >= i.quantity);
            order.status = isActuallyComplete ? 'Completed' : 'Partial';
            
            await order.save();
        }

        // D. Update Challan Document
        const updatedChallan = await DeliveryChallan.findByIdAndUpdate(req.params.id, {
            ...headerData,
            items: newItems
        }, { new: true });

        res.json(updatedChallan);
    } catch (err) { 
        console.error(err);
        res.status(400).json({ message: err.message }); 
    }
};

// 4. Get All Challans
exports.getChallans = async (req, res) => {
    try {
        const data = await DeliveryChallan.find()
            .populate('customer', 'name')
            .populate('site', 'name')
            .populate('referenceOrder', 'docNo')
            .populate('items.item', 'code name') // Fetch code/name for display
            .sort({ createdAt: -1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
};


// ==========================================
// RENTAL INVENTORY LOGIC (Updated)
// ==========================================

// 1. Get Site Inventory (Delivered - Returned - MISSING)
exports.getSiteInventory = async (req, res) => {
    try {
        const { siteId } = req.query;

        // A. Fetch Deliveries (In)
        const deliveries = await DeliveryChallan.find({ site: siteId }).populate('items.item', 'name code monthlyRentRate replacementValue'); // Fetch replacement val for missing
        
        // B. Fetch Returns (Out)
        const returns = await GoodsReceivedNote.find({ site: siteId });

        // C. Fetch Missing (Lost)
        const missing = await MissingMaterial.find({ site: siteId });

        const itemMap = {};

        // 1. Add Delivered
        deliveries.forEach(dc => {
            dc.items.forEach(i => {
                const itemId = i.item._id.toString();
                if (!itemMap[itemId]) {
                    itemMap[itemId] = {
                        item: i.item,
                        itemCode: i.item.code,
                        itemName: i.item.name,
                        unit: i.unit,
                        rate: i.item.replacementValue || 0, // Default to Replacement Value for Missing
                        totalDelivered: 0,
                        totalReturned: 0,
                        totalMissing: 0
                    };
                }
                itemMap[itemId].totalDelivered += i.currentQty;
            });
        });

        // 2. Subtract Returned
        returns.forEach(grn => {
            grn.items.forEach(i => {
                const itemId = i.item.toString();
                if (itemMap[itemId]) itemMap[itemId].totalReturned += i.totalQty;
            });
        });

        // 3. Subtract Missing
        missing.forEach(mm => {
            mm.items.forEach(i => {
                const itemId = i.item.toString();
                if (itemMap[itemId]) itemMap[itemId].totalMissing += i.missingQty;
            });
        });

        // D. Calculate Balance
        const siteStock = Object.values(itemMap)
            .map(i => ({
                ...i,
                balanceQty: i.totalDelivered - i.totalReturned - i.totalMissing
            }))
            .filter(i => i.balanceQty > 0); // Only show what is physically supposed to be there

        res.json(siteStock);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// 2. Create GRN
exports.createGRN = async (req, res) => {
    try {
        const { customer, site, warehouse, vehicleNo, driverName, remark, items } = req.body;
        const docNo = await generateGRNNo();

        const grn = await GoodsReceivedNote.create({
            docNo, date: new Date(), customer, site, warehouse,
            vehicleNo, driverName, remark, items
        });

        res.status(201).json(grn);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// 3. Get All GRNs
exports.getGRNs = async (req, res) => {
    try {
        const data = await GoodsReceivedNote.find()
            .populate('customer', 'name')
            .populate('site', 'name')
            .sort({ createdAt: -1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// 4. Update GRN
exports.updateGRN = async (req, res) => {
    try {
        const { items, ...headerData } = req.body;
        
        // In a strict ERP, changing a GRN is restricted because it affects billing logic.
        // For this system, we allow updating the details.
        
        const updatedGRN = await GoodsReceivedNote.findByIdAndUpdate(
            req.params.id,
            { ...headerData, items },
            { new: true }
        );

        if (!updatedGRN) return res.status(404).json({ message: "GRN not found" });

        res.json(updatedGRN);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// ✅ NEW: Get Challans for a specific Site (for Dropdown)
exports.getChallansBySite = async (req, res) => {
    try {
        const { siteId } = req.query;
        if (!siteId) return res.json([]);
        
        const challans = await DeliveryChallan.find({ site: siteId })
            .select('docNo date')
            .sort({ createdAt: -1 });
            
        res.json(challans);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// Update: Create Missing Entry (Include referenceChallan)
exports.createMissingEntry = async (req, res) => {
    try {
        const { customer, site, referenceChallan, remark, items } = req.body;
        const docNo = await generateMISSNo();

        const entry = await MissingMaterial.create({
            docNo, date: new Date(), customer, site,
            referenceChallan, // ✅ Save ID
            remark, items
        });

        res.status(201).json(entry);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// Update: Get Missing Entries (Populate referenceChallan)
exports.getMissingEntries = async (req, res) => {
    try {
        const data = await MissingMaterial.find()
            .populate('customer', 'name')
            .populate('site', 'name')
            .populate('referenceChallan', 'docNo') // ✅ Get Doc No
            .sort({ createdAt: -1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// Update: Update Missing Entry
exports.updateMissingEntry = async (req, res) => {
    try {
        const { items, ...headerData } = req.body;
        const updated = await MissingMaterial.findByIdAndUpdate(
            req.params.id,
            { ...headerData, items },
            { new: true }
        );
        res.json(updated);
    } catch (err) { res.status(400).json({ message: err.message }); }
};


// ==========================================
// EXTRA ITEM ADJUSTMENT LOGIC
// ==========================================

// 1. Get Excess Pool (Items returned in GRN as Excess, not yet adjusted)
exports.getExcessPool = async (req, res) => {
    try {
        const { siteId } = req.query;
        
        const grns = await GoodsReceivedNote.find({ site: siteId }).populate('items.item');
        const adjs = await ExtraItemAdjustment.find({ site: siteId });

        const map = {};

        // Sum Excess
        grns.forEach(g => {
            g.items.forEach(i => {
                if (i.qtyExcess > 0) {
                    const id = i.item._id.toString();
                    if (!map[id]) map[id] = { 
                        id, 
                        name: i.item.name, 
                        code: i.item.code, 
                        unit: i.unit, 
                        total: 0, 
                        used: 0 
                    };
                    map[id].total += i.qtyExcess;
                }
            });
        });

        // Subtract Used
        adjs.forEach(a => {
            a.adjustments.forEach(row => {
                if (map[row.excessItem.toString()]) {
                    map[row.excessItem.toString()].used += row.adjustedQty;
                }
            });
        });

        const pool = Object.values(map)
            .map(x => ({ ...x, balance: x.total - x.used }))
            .filter(x => x.balance > 0);

        res.json(pool);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// 2. Get Delivery Challans for a Site (Dropdown)
exports.getChallansBySite = async (req, res) => {
    try {
        const { siteId } = req.query;
        const challans = await DeliveryChallan.find({ site: siteId }).select('docNo date');
        res.json(challans);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// 3. Get Items inside a specific Delivery Challan (Target Dropdown)
exports.getChallanItems = async (req, res) => {
    try {
        const { challanId } = req.query;
        const dc = await DeliveryChallan.findById(challanId).populate('items.item');
        if (!dc) return res.json([]);

        // Return items present in this DC
        const items = dc.items.map(i => ({
            id: i.item._id,
            name: i.item.name,
            code: i.item.code,
            unit: i.unit,
            currentQty: i.currentQty // Qty currently in DC
        }));

        res.json(items);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// 4. Create Adjustment & Update Delivery Challan
exports.createAdjustment = async (req, res) => {
    try {
        const { customer, site, referenceChallan, adjustments, remark } = req.body;
        
        const docNo = await generateADJNo();

        // A. Create Adjustment Record
        const entry = await ExtraItemAdjustment.create({
            docNo, date: new Date(), customer, site,
            referenceChallan, adjustments, remark
        });

        // B. Update the Target Delivery Challan
        const challan = await DeliveryChallan.findById(referenceChallan);
        if(challan) {
            adjustments.forEach(adj => {
                // Find if the target item exists in DC
                const dcItem = challan.items.find(i => i.item.toString() === adj.challanItem.toString());
                
                if (dcItem) {
                    // Logic: We are saying Excess Item A replaces Challan Item B.
                    // Usually this implies adding quantity to Item B in the DC (because it was short/missing?)
                    // OR adding Item A to the DC.
                    // Based on "Adjust A to B", we usually increase B's count or mark A as delivered as B.
                    // Assuming standard reconciliation: We increase the quantity of the Target Item in the DC.
                    dcItem.currentQty += adj.adjustedQty;
                } else {
                    // Item B wasn't in DC? Add it.
                    challan.items.push({
                        item: adj.challanItem,
                        itemName: adj.challanItemName,
                        itemCode: adj.challanItemCode, // Ensure backend passes this or fetch it
                        unit: 'Nos', // Default or fetch
                        currentQty: adj.adjustedQty,
                        orderQty: 0,
                        pendingQty: 0,
                        rate: 0,
                        amount: 0
                    });
                }
            });
            await challan.save();
        }

        res.status(201).json(entry);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// 5. Get Adjustments List
exports.getAdjustments = async (req, res) => {
    try {
        const data = await ExtraItemAdjustment.find()
            .populate('customer', 'name')
            .populate('site', 'name')
            .populate('referenceChallan', 'docNo')
            .sort({ createdAt: -1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// 6. Update Adjustment (Edit)
exports.updateAdjustment = async (req, res) => {
    try {
        const updated = await ExtraItemAdjustment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) { res.status(400).json({ message: err.message }); }
};