const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getUsers, createUser, updateUser, getProfile, updateProfile } = require('../controllers/userController');
const { getSettings, updateSettings } = require('../controllers/settingsController');

router.use(protect);

// Profile
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// User Management
router.route('/users').get(getUsers).post(createUser);
router.route('/users/:id').put(updateUser);

// Settings
router.route('/settings').get(getSettings).post(updateSettings);

module.exports = router;