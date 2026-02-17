const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    createPO, getPOs, updatePO, getPendingPOs, 
    createPurchaseGRN, getGRNs, getPendingGRNs, 
    createPurchaseInvoice, getPurchaseInvoices, updatePurchaseInvoice,
    createPurchaseReturn, getPurchaseReturns, updatePurchaseReturn, getInvoicesBySupplier
} = require('../controllers/purchaseController');

router.use(protect);

router.route('/').get(getPOs).post(createPO);
router.route('/:id').put(updatePO);
router.get('/pending-pos', getPendingPOs);
router.route('/grn').get(getGRNs).post(createPurchaseGRN);
router.route('/invoices').get(getPurchaseInvoices).post(createPurchaseInvoice);
router.route('/invoices/:id').put(updatePurchaseInvoice);
router.get('/pending-grns', getPendingGRNs);
router.route('/returns').get(getPurchaseReturns).post(createPurchaseReturn);
router.route('/returns/:id').put(updatePurchaseReturn);
router.get('/supplier-invoices', getInvoicesBySupplier);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');
// const { 
//     // PO
//     createPO, 
//     getPOs, 
//     updatePO,
//     getPendingPOs, 
//     // GRN
//     createPurchaseGRN, 
//     getGRNs,
//     getPendingGRNs, 
//     // Invoice
//     createPurchaseInvoice, 
//     getPurchaseInvoices, 
//     updatePurchaseInvoice,
//     // Return (Debit Note)
//     createPurchaseReturn,
//     getPurchaseReturns,
//     updatePurchaseReturn,
//     getInvoicesBySupplier,
// } = require('../controllers/purchaseController');

// router.use(protect);

// // --- PURCHASE ORDERS ---
// router.route('/')
//     .get(getPOs)
//     .post(createPO);

// router.route('/:id')
//     .put(updatePO);

// // Helper for GRN dropdown
// router.get('/pending-pos', getPendingPOs);

// // --- PURCHASE GRN ---
// router.route('/grn')
//     .get(getGRNs)
//     .post(createPurchaseGRN);

// // --- PURCHASE INVOICE ---
// router.route('/invoices')
//     .get(getPurchaseInvoices)
//     .post(createPurchaseInvoice);

// router.route('/invoices/:id')
//     .put(updatePurchaseInvoice);

// // Helper for Invoice dropdown
// router.get('/pending-grns', getPendingGRNs);

// // --- PURCHASE RETURN (DEBIT NOTE) ---
// router.route('/returns')
//     .get(getPurchaseReturns)
//     .post(createPurchaseReturn);

// router.route('/returns/:id')
//     .put(updatePurchaseReturn);

// // Helper for Return dropdown
// router.get('/supplier-invoices', getInvoicesBySupplier);

// module.exports = router;