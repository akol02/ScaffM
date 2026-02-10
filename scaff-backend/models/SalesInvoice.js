const mongoose = require('mongoose');

const salesInvoiceSchema = new mongoose.Schema({
    docNo: { type: String, required: true, unique: true }, // INV-SALE-1001
    date: { type: Date, default: Date.now },
    
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' }, // Optional for Sales
    
    // ✅ Link to the Delivery Challan being billed
    referenceDC: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryChallan', required: true },

    billingAddress: String,
    siteAddress: String,

    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        itemName: String,
        unit: String,
        quantity: Number,
        rate: Number,
        amount: Number
    }],

    subTotal: { type: Number, default: 0 },
    transportCharges: { type: Number, default: 0 },
    loadingCharges: { type: Number, default: 0 },
    
    taxCode: { type: mongoose.Schema.Types.ObjectId, ref: 'TaxCode' },
    taxAmount: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('SalesInvoice', salesInvoiceSchema);