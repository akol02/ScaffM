const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    code: { type: String, unique: true }, // Auto Generated (CUST-001)
    name: { type: String, required: true },
    
    // ✅ Address Details
    billingAddress: { type: String },
    billingState: { type: String },
    shippingAddress: { type: String },
    shippingState: { type: String },
    
    // ✅ Tax Details
    gstn: { type: String },
    pan: { type: String },
    
    // ✅ Contact Person Details
    contactPerson: { type: String }, // contact_person_name
    mob1: { type: String, required: true }, // contact_person_mob1
    mob2: { type: String }, // contact_person_mob2
    email: { type: String },
    
    // Currency Link
    currency: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Currency'
    },
    
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);