const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g. "Green Valley Phase 1"
    address: { type: String, required: true },
    state: { type: String, required: true },
    contactPerson: { type: String },
    mob1: { type: String, required: true },
    mob2: { type: String },
    customer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer', 
        required: true 
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Site', siteSchema);