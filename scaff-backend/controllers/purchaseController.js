const PurchaseOrder = require('../models/PurchaseOrder');

const generatePONo = async () => {
    const last = await PurchaseOrder.findOne().sort({ _id: -1 });
    let nextId = 1001;
    if (last && last.docNo) {
        const parts = last.docNo.split('-');
        nextId = parseInt(parts[1]) + 1;
    }
    return `PO-${nextId}`;
};

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
        const limit = 7;
        const skip = (page - 1) * limit;
        const total = await PurchaseOrder.countDocuments();
        const orders = await PurchaseOrder.find()
            .populate('supplier', 'name')
            .sort({ createdAt: -1 }).skip(skip).limit(limit);
        res.json({ orders, pagination: { currentPage: page, totalPages: Math.ceil(total / limit) } });
    } catch (error) { res.status(500).json({ message: error.message }); }
};