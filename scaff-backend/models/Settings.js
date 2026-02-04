const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    companyName: { type: String },
    invoicePrefix: { type: String, default: 'INV-' },
    challanPrefix: { type: String, default: 'CHL-' },
    defaultCurrency: { type: mongoose.Schema.Types.ObjectId, ref: 'Currency' },
    termsAndConditions: { type: String } // Default Invoice Terms
});

module.exports = mongoose.model('Settings', settingsSchema);