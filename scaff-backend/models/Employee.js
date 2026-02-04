const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // EMP-001
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String },
    dept: { type: String },
    role: { type: String },
    status: { type: String, default: 'Active' }
});

module.exports = mongoose.model('Employee', employeeSchema);