const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createOrder, getOrders } = require('../controllers/salesController');

router.use(protect);

router.route('/')
    .get(getOrders)  // ?type=RENTAL or ?type=SALE
    .post(createOrder);

module.exports = router;