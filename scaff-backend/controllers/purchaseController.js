const PurchaseOrder = require('../models/PurchaseOrder');
const PurchaseGRN = require('../models/PurchaseGRN');
const FiscalYear = require('../models/FiscalYear');
const PurchaseInvoice = require('../models/PurchaseInvoice');
const PurchaseReturn = require('../models/PurchaseReturn');

// --- ID GENERATORS ---
const generatePONo = async () => {
    const last = await PurchaseOrder.findOne().sort({ _id: -1 });
    let nextId = 1001;
    if (last && last.docNo) {
        const parts = last.docNo.split('-');
        nextId = parseInt(parts[1]) + 1;
    }
    return `PO-${nextId}`;
};

const generateGRNNo = async () => {
    const last = await PurchaseGRN.findOne().sort({ _id: -1 });
    let nextId = 1001;
    if (last && last.docNo) {
        const parts = last.docNo.split('-');
        nextId = parseInt(parts[2]) + 1;
    }
    return `P-GRN-${nextId}`;
};

const generatePINVNo = async () => {
    const last = await PurchaseInvoice.findOne().sort({ _id: -1 });
    let nextId = 1001;
    if (last && last.docNo) {
        const parts = last.docNo.split('-');
        nextId = parseInt(parts[1]) + 1;
    }
    return `PINV-${nextId}`;
};

const generatePRNo = async () => {
    const last = await PurchaseReturn.findOne().sort({ _id: -1 });
    let nextId = 1001;
    if (last && last.docNo) {
        const parts = last.docNo.split('-');
        nextId = parseInt(parts[1]) + 1;
    }
    return `PR-${nextId}`;
};

// ==========================================
// 1. PURCHASE ORDERS
// ==========================================

exports.createPO = async (req, res) => {
    try {
        const docNo = await generatePONo();
        const po = await PurchaseOrder.create({ ...req.body, docNo });
        res.status(201).json(po);
    } catch (error) { res.status(400).json({ message: error.message }); }
};

exports.getPOs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 7;
        const skip = (page - 1) * limit;
        const total = await PurchaseOrder.countDocuments();
        const orders = await PurchaseOrder.find()
            .populate('supplier', 'name')
            .populate('warehouse', 'name')
            .sort({ createdAt: -1 }).skip(skip).limit(limit);
        res.json({ orders, pagination: { currentPage: page, totalPages: Math.ceil(total / limit) } });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.updatePO = async (req, res) => {
    try {
        const { items, ...headerData } = req.body;
        const updatedOrder = await PurchaseOrder.findByIdAndUpdate(
            req.params.id,
            { ...headerData, items },
            { new: true }
        );
        if (!updatedOrder) return res.status(404).json({ message: "PO not found" });
        res.json(updatedOrder);
    } catch (error) { res.status(400).json({ message: error.message }); }
};

// ==========================================
// 2. PURCHASE GRN (INWARD)
// ==========================================

exports.getPendingPOs = async (req, res) => {
    try {
        const { supplierId } = req.query;
        const orders = await PurchaseOrder.find({ 
            supplier: supplierId, 
            status: { $nin: ['Received', 'Close', 'Cancel'] }
        }).populate('items.item', 'name code unit');
        
        const pending = orders.map(o => {
            const items = o.items.map(i => ({
                item: i.item._id,
                itemName: i.item.name,
                unit: i.unit,
                quantity: i.quantity,
                receivedQty: i.receivedQty || 0,
                rate: i.rate,
                pending: i.quantity - (i.receivedQty || 0)
            })).filter(i => i.pending > 0);

            if (items.length > 0) {
                return { 
                    _id: o._id, 
                    docNo: o.docNo, 
                    date: o.date,
                    items: items
                };
            }
            return null;
        }).filter(o => o !== null);
        
        res.json(pending);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createPurchaseGRN = async (req, res) => {
    try {
        const { date, items, referenceOrder, driverName, driverMobile, vehicleNo, ...rest } = req.body;
        
        const fy = await FiscalYear.findOne({ fromDate: { $lte: new Date(date) }, toDate: { $gte: new Date(date) } });
        if(!fy) return res.status(400).json({ message: "No Fiscal Year found for this date" });

        const docNo = await generateGRNNo();
        
        const grn = await PurchaseGRN.create({ 
            ...rest, 
            date, items, referenceOrder, vehicleNo, 
            driverName, driverMobile,
            docNo, 
            fiscalYear: fy._id 
        });

        // Update PO Status
        if(referenceOrder) {
            const po = await PurchaseOrder.findById(referenceOrder);
            if(po) {
                let allReceived = true;
                po.items.forEach(pItem => {
                    const received = items.find(g => g.item.toString() === pItem.item.toString());
                    if(received) {
                        pItem.receivedQty = (pItem.receivedQty || 0) + Number(received.receivedQty);
                    }
                    if((pItem.receivedQty || 0) < pItem.quantity) allReceived = false;
                });
                
                // Update Status: Ensure 'Received' matches the Model Enum
                po.status = allReceived ? 'Received' : 'Partial';
                await po.save();
            }
        }

        res.status(201).json(grn);
    } catch (err) { 
        console.error(err);
        res.status(400).json({ message: err.message }); 
    }
};

exports.getGRNs = async (req, res) => {
    try {
        const data = await PurchaseGRN.find()
            .populate('supplier', 'name')
            .populate('referenceOrder', 'docNo')
            .sort({ createdAt: -1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// ==========================================
// 3. PURCHASE INVOICE
// ==========================================

exports.getPendingGRNs = async (req, res) => {
    try {
        const { supplierId } = req.query;
        // Logic: Should strictly filter GRNs not yet invoiced.
        // For simplicity, returning all GRNs for the supplier.
        const grns = await PurchaseGRN.find({ supplier: supplierId })
            .populate('items.item', 'name')
            .sort({ createdAt: -1 });
        
        res.json(grns);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createPurchaseInvoice = async (req, res) => {
    try {
        const docNo = await generatePINVNo();
        const invoice = await PurchaseInvoice.create({ ...req.body, docNo });
        res.status(201).json(invoice);
    } catch (error) { res.status(400).json({ message: error.message }); }
};

exports.getPurchaseInvoices = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 8;
        const skip = (page - 1) * limit;

        const total = await PurchaseInvoice.countDocuments();
        const data = await PurchaseInvoice.find()
            .populate('supplier', 'name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({ data, totalPages: Math.ceil(total / limit), currentPage: page });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updatePurchaseInvoice = async (req, res) => {
    try {
        const updated = await PurchaseInvoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// ==========================================
// 4. PURCHASE RETURN (DEBIT NOTE)
// ==========================================

exports.getInvoicesBySupplier = async (req, res) => {
    try {
        const { supplierId } = req.query;
        const invoices = await PurchaseInvoice.find({ supplier: supplierId })
            .select('docNo date items subTotal taxAmount grandTotal taxCode');
        res.json(invoices);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createPurchaseReturn = async (req, res) => {
    try {
        const docNo = await generatePRNo();
        const pr = await PurchaseReturn.create({ ...req.body, docNo });
        res.status(201).json(pr);
    } catch (error) { res.status(400).json({ message: error.message }); }
};

exports.getPurchaseReturns = async (req, res) => {
    try {
        const data = await PurchaseReturn.find()
            .populate('supplier', 'name')
            .sort({ createdAt: -1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updatePurchaseReturn = async (req, res) => {
    try {
        const { items, ...headerData } = req.body;
        const updated = await PurchaseReturn.findByIdAndUpdate(
            req.params.id,
            { ...headerData, items },
            { new: true }
        );
        res.json(updated);
    } catch (err) { res.status(400).json({ message: err.message }); }
};