const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userCode: { type: String, required: true, unique: true },
    name: { type: String, default: "Admin User" }, // Default value prevents crashes
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Operator', 'Viewer'], default: 'Admin' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);