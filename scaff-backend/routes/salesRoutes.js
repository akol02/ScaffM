const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    createOrder, 
    getOrders, 
    createInvoice, 
    getInvoices, 
    getPendingDCs, 
    updateInvoice, 
    getInvoiceDetails,
    createSaleReturn, 
    getSaleReturns, 
    getInvoicesByCustomer
} = require('../controllers/salesController');

router.use(protect);

// Routes for Sales Orders (Standard and Rental)
router.route('/')
    .get(getOrders)
    .post(createOrder);

// Routes for Sales Invoices
router.route('/invoices')
    .get(getInvoices)
    .post(createInvoice);

router.route('/invoices/:id')
    .get(protect, getInvoiceDetails) // ✅ For View
    .put(protect, updateInvoice);    

// Helper for Invoice Dropdown
router.get('/pending-dcs', getPendingDCs);

// --- SALE RETURN ---
router.route('/returns').get(protect, getSaleReturns).post(protect, createSaleReturn);
router.get('/customer-invoices', protect, getInvoicesByCustomer); // Helper

module.exports = router;