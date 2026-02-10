const mongoose = require('mongoose');

const saleReturnSchema = new mongoose.Schema({
    docNo: { type: String, required: true, unique: true }, // SR-1001
    date: { type: Date, default: Date.now },
    
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    // ✅ Link to the Sales Invoice being returned
    referenceInvoice: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesInvoice', required: true },

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

module.exports = mongoose.model('SaleReturn', saleReturnSchema);