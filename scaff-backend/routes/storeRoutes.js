const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    createChallan, getChallans, getPendingOrders, updateChallan,
    getSiteInventory, createGRN, getGRNs, updateGRN,
    createMissingEntry, getMissingEntries, updateMissingEntry,
    // ✅ New Imports
    getExcessPool, getChallansBySite, getChallanItems, createAdjustment, getAdjustments, updateAdjustment
} = require('../controllers/storeController');

router.use(protect);

// --- DELIVERY CHALLANS ---
router.route('/delivery-challans').get(getChallans).post(createChallan);
router.route('/delivery-challans/:id').put(updateChallan);
router.get('/pending-orders', getPendingOrders);

// --- RENTAL GRN ---
router.route('/rental-grn').get(getGRNs).post(createGRN);
router.route('/rental-grn/:id').put(updateGRN);
router.get('/site-inventory', getSiteInventory);

// --- MISSING MATERIAL ---
router.route('/missing-entries').get(getMissingEntries).post(createMissingEntry);
router.route('/missing-entries/:id').put(updateMissingEntry);

// --- EXTRA ITEM ADJUSTMENT ---
router.route('/adjustments').get(getAdjustments).post(createAdjustment);
router.route('/adjustments/:id').put(updateAdjustment);

// Helpers
router.get('/excess-pool', getExcessPool);
router.get('/challans-by-site', getChallansBySite);
router.get('/challan-items', getChallanItems);

module.exports = router;