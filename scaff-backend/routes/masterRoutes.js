const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    getCustomers, createCustomer, updateCustomer,
    getEmployees, createEmployee, updateEmployee,
    getItems, createItem, updateItem,
    getItemGroups, createItemGroup, updateItemGroup,
    getVendors, createVendor, updateVendor,
    getWarehouses, createWarehouse, updateWarehouse, // ✅
    getCurrencies, createCurrency, updateCurrency,    // ✅
    getFiscalYears, createFiscalYear, updateFiscalYear,
    getTaxCodes, createTaxCode, updateTaxCode,
    getStates, createState, updateState, syncStates
} = require('../controllers/masterController');

router.use(protect);

router.route('/customers').get(getCustomers).post(createCustomer);
router.route('/customers/:id').put(updateCustomer);

router.route('/employees').get(getEmployees).post(createEmployee);
router.route('/employees/:id').put(updateEmployee);

router.route('/groups').get(getItemGroups).post(createItemGroup);
router.route('/groups/:id').put(updateItemGroup);

router.route('/items').get(getItems).post(createItem);
router.route('/items/:id').put(updateItem);

router.route('/vendors').get(getVendors).post(createVendor);
router.route('/vendors/:id').put(updateVendor);

router.route('/warehouses').get(getWarehouses).post(createWarehouse);
router.route('/warehouses/:id').put(updateWarehouse);

router.route('/currencies').get(getCurrencies).post(createCurrency);
router.route('/currencies/:id').put(updateCurrency);

// --- FISCAL YEARS ---
router.route('/fiscal-years').get(getFiscalYears).post(createFiscalYear);
router.route('/fiscal-years/:id').put(updateFiscalYear);

// --- TAX CODES ---
router.route('/tax-codes').get(getTaxCodes).post(createTaxCode);
router.route('/tax-codes/:id').put(updateTaxCode);

// --- STATES ---
router.route('/states').get(getStates).post(createState);
router.route('/states/sync').post(syncStates); // ✅ For Bulk Upload
router.route('/states/:id').put(updateState);

module.exports = router;