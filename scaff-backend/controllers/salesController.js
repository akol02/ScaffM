const SalesOrder = require('../models/SalesOrder');

// Generate Doc No: SO-RENT-001 or SO-SALE-001
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

exports.createOrder = async (req, res) => {
    try {
        const docNo = await generateDocNo(req.body.orderType);
        const order = await SalesOrder.create({ ...req.body, docNo });
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ✅ UPDATED GET ORDERS (With Pagination)
exports.getOrders = async (req, res) => {
    try {
        const type = req.query.type;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 7; // Default 7 per page
        const skip = (page - 1) * limit;

        const filter = type ? { orderType: type } : {};
        
        // 1. Get Total Count for Pagination Logic
        const totalDocs = await SalesOrder.countDocuments(filter);
        const totalPages = Math.ceil(totalDocs / limit);

        // 2. Fetch Paginated Data
        const orders = await SalesOrder.find(filter)
            .populate('customer', 'name')
            .populate('site', 'name')
            .sort({ createdAt: -1 }) // Latest first
            .skip(skip)
            .limit(limit);

        res.json({
            orders,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalItems: totalDocs
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};