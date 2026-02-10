const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    code: { type: String, unique: true }, 
    name: { type: String, required: true },
    contactPerson: { type: String },
    mob1: { type: String, required: true },
    mob2: { type: String },
    email: { type: String },
    billingAddress: { type: String },
    billingState: { type: String },
    shippingAddress: { type: String },
    shippingState: { type: String },
    gstn: { type: String },
    pan: { type: String },
    currency: { type: mongoose.Schema.Types.ObjectId, ref: 'Currency' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Supplier', supplierSchema);