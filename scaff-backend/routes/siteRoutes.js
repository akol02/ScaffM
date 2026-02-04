const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getSites, createSite, updateSite } = require('../controllers/siteController');

router.route('/')
    .get(protect, getSites)
    .post(protect, createSite);

router.route('/:id')
    .put(protect, updateSite); // ✅ Added

module.exports = router;