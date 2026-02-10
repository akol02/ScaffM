const Customer = require('../models/Customer');
const Employee = require('../models/Employee');
const Item = require('../models/Item');
const ItemGroup = require('../models/ItemGroup');
const Vendor = require('../models/Vendor');
const Warehouse = require('../models/Warehouse');
const Currency = require('../models/Currency');
const FiscalYear = require('../models/FiscalYear');
const TaxCode = require('../models/TaxCode');
const State = require('../models/State');
const Supplier = require('../models/Supplier');

// ==========================================
// 🛠️ HELPER FUNCTIONS
// ==========================================

// Helper: Auto-Generate Sequential Codes (e.g., CUST-001, EMP-005)
const getNextCode = async (Model, prefix) => {
    const lastRecord = await Model.findOne().sort({ _id: -1 });
    let nextNum = 1;
    if (lastRecord && lastRecord.code) {
        const parts = lastRecord.code.split('-');
        const numPart = parseInt(parts[1]);
        if (!isNaN(numPart)) nextNum = numPart + 1;
    }
    return `${prefix}-${String(nextNum).padStart(3, '0')}`;
};

// Helper: Generate Indian Fiscal Year Code & Name
// Logic: If Month >= April (3), Start Year = Current Year. Else Start Year = Prev Year.
const getFYDetails = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth(); // 0 (Jan) to 11 (Dec)

    let startYear = (month >= 3) ? year : year - 1;
    let endYear = startYear + 1;

    return {
        code: `FY-${startYear}-${String(endYear).slice(-2)}`, // e.g., FY-2025-26
        name: `Apr ${startYear} - Mar ${endYear}`       // e.g., Apr 2025 - Mar 2026
    };
};

// ==========================================
// 1. CUSTOMERS
// ==========================================
exports.getCustomers = async (req, res) => {
    try {
        // Populate Currency details for display
        const data = await Customer.find()
            .populate('currency', 'code symbol')
            .sort({ createdAt: -1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createCustomer = async (req, res) => {
    try {
        const code = await getNextCode(Customer, 'CUST');
        const customer = await Customer.create({ ...req.body, code });
        res.status(201).json(customer);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateCustomer = async (req, res) => {
    try {
        const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('currency', 'code symbol');
        res.json(updated);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// ==========================================
// 2. EMPLOYEES
// ==========================================
exports.getEmployees = async (req, res) => {
    try {
        const data = await Employee.find().sort({ _id: -1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createEmployee = async (req, res) => {
    try {
        const code = await getNextCode(Employee, 'EMP');
        const employee = await Employee.create({ ...req.body, code });
        res.status(201).json(employee);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateEmployee = async (req, res) => {
    try {
        const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// ==========================================
// 3. ITEM GROUPS (CATEGORIES)
// ==========================================
exports.getItemGroups = async (req, res) => {
    try {
        const data = await ItemGroup.find().sort({ name: 1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createItemGroup = async (req, res) => {
    try {
        const group = await ItemGroup.create(req.body);
        res.status(201).json(group);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateItemGroup = async (req, res) => {
    try {
        const updated = await ItemGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// ==========================================
// 4. ITEM MASTER (INVENTORY)
// ==========================================
exports.getItems = async (req, res) => {
    try {
        const data = await Item.find()
            .populate('group', 'name') // Fetch Group Name
            .sort({ _id: -1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createItem = async (req, res) => {
    try {
        const { name } = req.body;
        // Generate prefix based on item name (e.g., CUP for Cuplock) or default to ITM
        const prefix = name ? name.substring(0, 3).toUpperCase() : 'ITM';
        const code = await getNextCode(Item, prefix);

        const item = await Item.create({ ...req.body, code });
        
        // Populate group before returning for immediate UI update
        const populatedItem = await Item.findById(item._id).populate('group', 'name');
        res.status(201).json(populatedItem);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateItem = async (req, res) => {
    try {
        const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('group', 'name');
        res.json(updated);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// ==========================================
// 5. VENDORS (SUPPLIERS)
// ==========================================
exports.getVendors = async (req, res) => {
    try {
        const data = await Vendor.find()
            .populate('currency', 'code symbol')
            .sort({ createdAt: -1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createVendor = async (req, res) => {
    try {
        const code = await getNextCode(Vendor, 'VEN');
        const vendor = await Vendor.create({ ...req.body, code });
        res.status(201).json(vendor);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateVendor = async (req, res) => {
    try {
        const updated = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('currency', 'code symbol');
        res.json(updated);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// ==========================================
// 6. WAREHOUSES
// ==========================================
exports.getWarehouses = async (req, res) => {
    try {
        const data = await Warehouse.find().sort({ name: 1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createWarehouse = async (req, res) => {
    try {
        const code = await getNextCode(Warehouse, 'WH');
        const warehouse = await Warehouse.create({ ...req.body, code });
        res.status(201).json(warehouse);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateWarehouse = async (req, res) => {
    try {
        const updated = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// ==========================================
// 7. CURRENCIES
// ==========================================
exports.getCurrencies = async (req, res) => {
    try {
        const data = await Currency.find().sort({ name: 1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createCurrency = async (req, res) => {
    try {
        // No auto-code needed (User selects INR/USD)
        const currency = await Currency.create(req.body);
        res.status(201).json(currency);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateCurrency = async (req, res) => {
    try {
        const updated = await Currency.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// ==========================================
// 8. FISCAL YEARS
// ==========================================
exports.getFiscalYears = async (req, res) => {
    try {
        const data = await FiscalYear.find().sort({ fromDate: -1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createFiscalYear = async (req, res) => {
    try {
        const { fromDate, toDate } = req.body;
        
        // Auto-Generate Code/Name based on Indian FY Logic
        const { code, name } = getFYDetails(fromDate);

        // Check for duplicates (Code must be unique)
        const exists = await FiscalYear.findOne({ code });
        if(exists) {
            return res.status(400).json({ message: `Fiscal Year ${code} already exists.` });
        }

        const fy = await FiscalYear.create({
            code,
            name,
            fromDate,
            toDate
        });
        res.status(201).json(fy);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateFiscalYear = async (req, res) => {
    try {
        // Note: Code/Name typically shouldn't change, but dates might need adjustment
        const updated = await FiscalYear.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// ==========================================
// TAX CODES
// ==========================================
exports.getTaxCodes = async (req, res) => {
    try {
        const data = await TaxCode.find().sort({ name: 1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createTaxCode = async (req, res) => {
    try {
        const { name, cgst, sgst, igst } = req.body;
        const totalRate = (parseFloat(cgst) || 0) + (parseFloat(sgst) || 0) + (parseFloat(igst) || 0);
        
        const tax = await TaxCode.create({ name, cgst, sgst, igst, totalRate });
        res.status(201).json(tax);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateTaxCode = async (req, res) => {
    try {
        const { name, cgst, sgst, igst } = req.body;
        const totalRate = (parseFloat(cgst) || 0) + (parseFloat(sgst) || 0) + (parseFloat(igst) || 0);
        
        const updated = await TaxCode.findByIdAndUpdate(req.params.id, { name, cgst, sgst, igst, totalRate }, { new: true });
        res.json(updated);
    } catch (err) { res.status(400).json({ message: err.message }); }
};


// ==========================================
// STATE MASTER
// ==========================================

// 1. Get All States
exports.getStates = async (req, res) => {
    try {
        // Sort by GST Code (numerical order)
        const data = await State.find().sort({ code: 1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// 2. Create Single State (Manual)
exports.createState = async (req, res) => {
    try {
        const { name, code } = req.body;
        const exists = await State.findOne({ code });
        if(exists) return res.status(400).json({ message: "State code already exists" });

        const state = await State.create({ name, code });
        res.status(201).json(state);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// 3. Update State
exports.updateState = async (req, res) => {
    try {
        const updated = await State.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// 4. Bulk Sync (For External API Data)
exports.syncStates = async (req, res) => {
    try {
        const statesData = req.body; // Array of { name, code }
        
        // Upsert logic: Update if code exists, Insert if not
        const operations = statesData.map(state => ({
            updateOne: {
                filter: { code: state.code },
                update: { $set: { name: state.name } },
                upsert: true
            }
        }));

        await State.bulkWrite(operations);
        res.json({ message: "States Synced Successfully" });
    } catch (err) { res.status(500).json({ message: err.message }); }
};


// --- SUPPLIERS ---
exports.getSuppliers = async (req, res) => {
    try {
        // ✅ Populate currency to get the object instead of just the ID string
        const data = await Supplier.find()
            .populate('currency', 'code symbol')
            .sort({ createdAt: -1 });
        res.json(data);
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
};

exports.createSupplier = async (req, res) => {
    try {
        const code = await getNextCode(Supplier, 'SUP');
        const supplier = await Supplier.create({ ...req.body, code });
        res.status(201).json(supplier);
    } catch (err) { 
        res.status(400).json({ message: err.message }); 
    }
};

exports.updateSupplier = async (req, res) => {
    try {
        const updated = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('currency', 'code symbol');
        res.json(updated);
    } catch (err) { 
        res.status(400).json({ message: err.message }); 
    }
};