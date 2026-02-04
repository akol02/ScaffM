const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    code: { type: String, unique: true }, // Auto Generated (VEN-001)
    name: { type: String, required: true },
    
    // Addresses
    billingAddress: { type: String },
    billingState: { type: String },
    shippingAddress: { type: String },
    shippingState: { type: String },
    
    // Tax Info
    gstn: { type: String },
    pan: { type: String },
    
    // Contact Info
    contactPerson: { type: String },
    mob1: { type: String, required: true },
    mob2: { type: String },
    email: { type: String },

    currency: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Currency'
    },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vendor', vendorSchema);