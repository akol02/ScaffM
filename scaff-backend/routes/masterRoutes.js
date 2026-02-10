const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    // Customers
    getCustomers, createCustomer, updateCustomer,
    // Suppliers (Fixed imports)
    getSuppliers, createSupplier, updateSupplier,
    // Employees
    getEmployees, createEmployee, updateEmployee,
    // Items & Groups
    getItems, createItem, updateItem,
    getItemGroups, createItemGroup, updateItemGroup,
    // Vendors
    getVendors, createVendor, updateVendor,
    // Logistics & Misc
    getWarehouses, createWarehouse, updateWarehouse,
    getCurrencies, createCurrency, updateCurrency,
    getFiscalYears, createFiscalYear, updateFiscalYear,
    getTaxCodes, createTaxCode, updateTaxCode,
    // States
    getStates, createState, updateState, syncStates
} = require('../controllers/masterController');

// All master routes require a valid login token
router.use(protect);

// --- CUSTOMERS ---
router.route('/customers').get(getCustomers).post(createCustomer);
router.route('/customers/:id').put(updateCustomer);

// --- SUPPLIERS (Now Active) ---
router.route('/suppliers').get(getSuppliers).post(createSupplier);
router.route('/suppliers/:id').put(updateSupplier);

// --- EMPLOYEES ---
router.route('/employees').get(getEmployees).post(createEmployee);
router.route('/employees/:id').put(updateEmployee);

// --- ITEM GROUPS ---
router.route('/groups').get(getItemGroups).post(createItemGroup);
router.route('/groups/:id').put(updateItemGroup);

// --- ITEMS ---
router.route('/items').get(getItems).post(createItem);
router.route('/items/:id').put(updateItem);

// --- VENDORS ---
router.route('/vendors').get(getVendors).post(createVendor);
router.route('/vendors/:id').put(updateVendor);

// --- WAREHOUSES ---
router.route('/warehouses').get(getWarehouses).post(createWarehouse);
router.route('/warehouses/:id').put(updateWarehouse);

// --- CURRENCIES ---
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
router.route('/states/sync').post(syncStates); 
router.route('/states/:id').put(updateState);

module.exports = router;