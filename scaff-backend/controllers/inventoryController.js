const InventoryTxn = require('../models/InventoryTxn');
const FiscalYear = require('../models/FiscalYear'); // ✅ Required for linking

// Helper: Generate Doc No (MAT-IN-001)
const generateDocNo = async (type) => {
    const prefix = type === 'INWARD' ? 'MAT-IN' : 'MAT-OUT';
    const last = await InventoryTxn.findOne({ txnType: type }).sort({ _id: -1 });
    let nextId = 1001;
    if (last && last.docNo) {
        const parts = last.docNo.split('-');
        nextId = parseInt(parts[2]) + 1;
    }
    return `${prefix}-${nextId}`;
};

// ✅ CREATE TRANSACTION (With Auto FY Link)
exports.createTransaction = async (req, res) => {
    try {
        const { txnType, date, reference, remark, warehouse, items } = req.body;
        
        // 1. AUTO-DETECT FISCAL YEAR BASED ON DATE
        const txnDate = new Date(date);
        
        // Find the Fiscal Year range that covers this transaction date
        const activeFY = await FiscalYear.findOne({
            fromDate: { $lte: txnDate }, // FY Start <= Txn Date
            toDate: { $gte: txnDate }    // FY End >= Txn Date
        });

        // Block transaction if FY doesn't exist
        if (!activeFY) {
            return res.status(400).json({ 
                message: `No Fiscal Year defined for date: ${date}. Go to Masters > Fiscal Years and create it first.` 
            });
        }

        // 2. Generate Document Number
        const docNo = await generateDocNo(txnType);

        // 3. Create Record linked to found FY
        const newTxn = await InventoryTxn.create({
            docNo,
            txnType,
            date,
            fiscalYear: activeFY._id, // ✅ THIS LINKS IT AUTOMATICALLY
            warehouse,
            reference,
            remark,
            items
        });
        
        res.status(201).json(newTxn);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ✅ UPDATED GET TRANSACTIONS (With Pagination)
exports.getTransactions = async (req, res) => {
    try {
        const type = req.query.type; 
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 7; // Default 7
        const skip = (page - 1) * limit;

        const filter = type ? { txnType: type } : {};
        
        // 1. Get Total Count
        const totalDocs = await InventoryTxn.countDocuments(filter);
        const totalPages = Math.ceil(totalDocs / limit);

        // 2. Fetch Data
        const transactions = await InventoryTxn.find(filter)
            .populate('warehouse', 'name')
            .populate('fiscalYear', 'code')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
            
        res.json({
            transactions,
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