const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getCompanyProfile, updateCompanyProfile } = require('../controllers/companyController');

router.route('/')
    .get(protect, getCompanyProfile)
    .post(protect, updateCompanyProfile);

module.exports = router;