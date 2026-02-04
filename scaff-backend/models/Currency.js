const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // e.g. INR, USD
    name: { type: String, required: true }, // e.g. Indian Rupee
    symbol: { type: String, required: true }, // e.g. ₹
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Currency', currencySchema);