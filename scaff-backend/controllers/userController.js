const User = require('../models/User');
const bcrypt = require('bcryptjs');

// --- USER MANAGEMENT (ADMIN) ---

// Get All Users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// Create User (Admin creates sub-users)
exports.createUser = async (req, res) => {
    try {
        const { name, email, mobile, password, role } = req.body;
        
        // Auto-Generate Code
        const lastUser = await User.findOne().sort({ _id: -1 });
        let nextId = 1001;
        if (lastUser && lastUser.userCode) {
            const parts = lastUser.userCode.split('-');
            if(parts[1]) nextId = parseInt(parts[1]) + 1;
        }
        const userCode = `USR-${nextId}`;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ userCode, name, email, mobile, password: hashedPassword, role });
        res.status(201).json(user);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// Update User (Admin updating others)
exports.updateUser = async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        const updateData = { ...rest };

        // Only hash password if it's being changed
        if (password && password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updated = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
        res.json(updated);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// --- PROFILE (LOGGED IN USER) ---

// Get Own Profile
exports.getProfile = async (req, res) => {
    try {
        // req.user.id comes from authMiddleware
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// Update Own Profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, mobile, password } = req.body;
        const updateData = { name, mobile };

        if (password && password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updated = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select('-password');
        res.json(updated);
    } catch (err) { res.status(400).json({ message: err.message }); }
};