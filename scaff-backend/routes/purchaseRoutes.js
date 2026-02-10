const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createPO, getPOs } = require('../controllers/purchaseController');

router.use(protect);
router.route('/').get(getPOs).post(createPO);
module.exports = router;