const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper to generate next ID
const generateUserCode = async () => {
    const count = await User.countDocuments();
    return `USR-${1001 + count}`; // Simple sequential logic
};

exports.registerUser = async (req, res) => {
    try {
        const { email, password, mobile } = req.body;
        
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Auto Generate Code
        const userCode = await generateUserCode();

        const user = await User.create({
            userCode,
            email,
            mobile,
            password: hashedPassword
        });

        res.status(201).json({
            _id: user.id,
            userCode: user.userCode,
            email: user.email,
            message: "User registered successfully"
        });
    } catch (error) {
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
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
            });
        } else {
            res.status(401).json({ message: 'Invalid User Code or Password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};