const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createChallan, getChallans, updateChallan } = require('../controllers/challanController');

router.route('/')
    .get(protect, getChallans)
    .post(protect, createChallan);

router.route('/:id')
    .put(protect, updateChallan); // ✅ Added

module.exports = router;