const SalesOrder = require('../models/SalesOrder');
const SalesInvoice = require('../models/SalesInvoice');
const SaleReturn = require('../models/SaleReturn');
const DeliveryChallan = require('../models/DeliveryChallan');

// Helper: Generate SO-RENT-001 or SO-SALE-001
const generateDocNo = async (type) => {
    const prefix = type === 'RENTAL' ? 'SO-RENT' : 'SO-SALE';
    const last = await SalesOrder.findOne({ orderType: type }).sort({ _id: -1 });
    let nextId = 1001;
    if (last && last.docNo) {
        const parts = last.docNo.split('-');
        nextId = parseInt(parts[2]) + 1;
    }
    return `${prefix}-${nextId}`;
};

// Helper: Generate INV-SALE-1001
const generateInvoiceNo = async () => {
    const last = await SalesInvoice.findOne().sort({ _id: -1 });
    let nextId = 1001;
    if (last && last.docNo) {
        const parts = last.docNo.split('-');
        nextId = parseInt(parts[2]) + 1;
    }
    return `INV-SALE-${nextId}`;
};

// Helper: Auto-Gen SR-1001
const generateReturnNo = async () => {
    const last = await SaleReturn.findOne().sort({ _id: -1 });
    let nextId = 1001;
    if (last && last.docNo) {
        const parts = last.docNo.split('-');
        nextId = parseInt(parts[1]) + 1;
    }
    return `SR-${nextId}`;
};

// --- SALES ORDERS ---

exports.createOrder = async (req, res) => {
    try {
        const docNo = await generateDocNo(req.body.orderType);
        const order = await SalesOrder.create({ ...req.body, docNo });
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const type = req.query.type;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 7;
        const skip = (page - 1) * limit;

        const filter = type ? { orderType: type } : {};
        const totalDocs = await SalesOrder.countDocuments(filter);
        const orders = await SalesOrder.find(filter)
            .populate('customer', 'name')
            .populate('site', 'name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            orders,
            pagination: { currentPage: page, totalPages: Math.ceil(totalDocs / limit), totalItems: totalDocs }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- SALES INVOICES ---

exports.getPendingDCs = async (req, res) => {
    try {
        const { customerId } = req.query;
        const dcs = await DeliveryChallan.find({ customer: customerId })
            .populate({
                path: 'referenceOrder',
                match: { orderType: 'SALE' }
            })
            .populate('items.item');

        const saleDCs = dcs.filter(d => d.referenceOrder !== null);
        res.json(saleDCs);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createInvoice = async (req, res) => {
    try {
        const docNo = await generateInvoiceNo();
        const invoice = await SalesInvoice.create({ ...req.body, docNo });
        res.status(201).json(invoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getInvoices = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 7;
        const skip = (page - 1) * limit;

        const total = await SalesInvoice.countDocuments();
        const data = await SalesInvoice.find()
            .populate('customer', 'name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({ data, totalPages: Math.ceil(total / limit) });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateInvoice = async (req, res) => {
    try {
        const updated = await SalesInvoice.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('customer', 'name');
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get single Invoice details (for the Eye/View button)
exports.getInvoiceDetails = async (req, res) => {
    try {
        const invoice = await SalesInvoice.findById(req.params.id)
            .populate('customer')
            .populate('site')
            .populate('taxCode')
            .populate('referenceDC');
        res.json(invoice);
    } catch (error) {
        res.status(404).json({ message: "Invoice not found" });
    }
};


// 1. Get Invoices for a specific Customer (to populate the "Against" dropdown)
exports.getInvoicesByCustomer = async (req, res) => {
    try {
        const { customerId } = req.query;
        const invoices = await SalesInvoice.find({ customer: customerId })
            .select('docNo date items subTotal taxAmount grandTotal taxCode');
        res.json(invoices);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// 2. Create Sale Return
exports.createSaleReturn = async (req, res) => {
    try {
        const docNo = await generateReturnNo();
        const saleReturn = await SaleReturn.create({ ...req.body, docNo });
        res.status(201).json(saleReturn);
    } catch (error) { res.status(400).json({ message: error.message }); }
};

// 3. Get Sale Return History
exports.getSaleReturns = async (req, res) => {
    try {
        const data = await SaleReturn.find()
            .populate('customer', 'name')
            .sort({ createdAt: -1 });
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// 4. Update Sale Return
exports.updateSaleReturn = async (req, res) => {
    try {
        const { items, ...headerData } = req.body;
        
        // Find and Update
        const updatedReturn = await SaleReturn.findByIdAndUpdate(
            req.params.id,
            { ...headerData, items },
            { new: true }
        );

        if (!updatedReturn) {
            return res.status(404).json({ message: "Sale Return not found" });
        }

        res.json(updatedReturn);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};