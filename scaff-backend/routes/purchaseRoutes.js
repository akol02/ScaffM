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