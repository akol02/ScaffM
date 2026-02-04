const mongoose = require('mongoose');

const fiscalYearSchema = new mongoose.Schema({
    code: { type: String, unique: true, required: true }, // e.g. FY-2025-26
    name: { type: String, required: true },               // e.g. April 2025 - March 2026
    fromDate: { type: Date, required: true },             // 2025-04-01
    toDate: { type: Date, required: true },               // 2026-03-31
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('FiscalYear', fiscalYearSchema);