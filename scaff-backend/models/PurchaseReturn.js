const mongoose = require('mongoose');

const purchaseReturnSchema = new mongoose.Schema({
    docNo: { type: String, required: true, unique: true }, // e.g. PR-1001 (Debit Note)
    date: { type: Date, default: Date.now },
    
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    // Link to the original Purchase Invoice
    referenceInvoice: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseInvoice', required: true },

    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        itemName: String,
        unit: String,
        quantity: Number, // Returned Qty
        rate: Number,     // Original Rate from Invoice
        amount: Number
    }],

    subTotal: { type: Number, default: 0 },
    transportCharges: { type: Number, default: 0 },
    loadingCharges: { type: Number, default: 0 },
    
    taxCode: { type: mongoose.Schema.Types.ObjectId, ref: 'TaxCode' },
    taxAmount: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },

    remark: String,
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('PurchaseReturn', purchaseReturnSchema);