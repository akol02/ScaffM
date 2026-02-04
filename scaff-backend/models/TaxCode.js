const mongoose = require('mongoose');

const taxCodeSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "GST 18%"
    cgst: { type: Number, default: 0 },
    sgst: { type: Number, default: 0 },
    igst: { type: Number, default: 0 },
    totalRate: { type: Number, required: true }, // Auto-calculated (18%)
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('TaxCode', taxCodeSchema);