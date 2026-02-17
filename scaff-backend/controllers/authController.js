const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Safer User Code Generator
const generateUserCode = async () => {
    try {
        const lastUser = await User.findOne().sort({ createdAt: -1 });
        let nextId = 1001;
        if (lastUser && lastUser.userCode) {
            const parts = lastUser.userCode.split('-');
            if (parts.length === 2) {
                const numericPart = parseInt(parts[1]);
                if (!isNaN(numericPart)) nextId = numericPart + 1;
            }
        }
        return `USR-${nextId}`;
    } catch (err) {
        return `USR-${Math.floor(Math.random() * 9000) + 1000}`; // Fallback
    }
};

exports.registerUser = async (req, res) => {
    try {
        const { email, mobile, password, name } = req.body;

        if (!email || !password || !mobile) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email already registered' });

        const userCode = await generateUserCode();
        
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            userCode,
            name: name || "Admin",
            email,
            mobile,
            password: hashedPassword,
            role: 'Admin' // First user is always Admin
        });

        // Generate Token
        // Ensure JWT_SECRET is in your Render Environment variables!
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '30d' });

        res.status(201).json({
            _id: user.id,
            userCode: user.userCode,
            email: user.email,
            token,
            message: "Registration successful"
        });
    } catch (error) {
        console.error("REGISTRATION ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { userCode, password } = req.body;
        const user = await User.findOne({ userCode });
        
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                userCode: user.userCode,
                email: user.email,
                name: user.name,
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '30d' })
            });
        } else {
            res.status(401).json({ message: 'Invalid User Code or Password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};