const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    code: { type: String, unique: true }, // Auto: WH-001
    name: { type: String, required: true },
    address: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Warehouse', warehouseSchema);