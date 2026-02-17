const mongoose = require('mongoose');

const purchaseInvoiceSchema = new mongoose.Schema({
    docNo: { type: String, required: true, unique: true }, // PINV-1001
    date: { type: Date, default: Date.now },
    
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    referenceGRN: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseGRN', required: true },
    
    // Address Snapshots
    billingAddress: String,
    
    // Items (Pulled from GRN)
    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        itemName: String,
        unit: String,
        quantity: Number, // This is the Received Qty
        rate: Number,
        amount: Number
    }],

    // Financials
    subTotal: { type: Number, default: 0 },
    transportCharges: { type: Number, default: 0 },
    loadingCharges: { type: Number, default: 0 },
    
    taxCode: { type: mongoose.Schema.Types.ObjectId, ref: 'TaxCode' },
    taxAmount: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },

    remark: String,
    status: { type: String, default: 'Open' }, // Open / Paid
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('PurchaseInvoice', purchaseInvoiceSchema);