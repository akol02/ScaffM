const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userCode: { type: String, required: true, unique: true },
    name: { type: String, required: true }, // ✅ Added Name
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Operator', 'Viewer'], default: 'Operator' }, // ✅ Role
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);