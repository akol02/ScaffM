const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createTransaction, getTransactions } = require('../controllers/inventoryController');

router.use(protect);

router.route('/')
    .get(getTransactions)  // ?type=INWARD or ?type=OUTWARD
    .post(createTransaction);

module.exports = router;