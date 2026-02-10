const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
    docNo: { type: String, required: true, unique: true }, // PO-1001
    date: { type: Date, default: Date.now },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' }, // Where to deliver
    currency: { type: mongoose.Schema.Types.ObjectId, ref: 'Currency' },
    currencyRate: { type: Number, default: 1 },
    referenceNo: { type: String }, // Supplier Quote Ref
    
    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
        itemName: String,
        unit: String,
        quantity: { type: Number, required: true },
        rate: { type: Number, required: true },
        amount: { type: Number, required: true },
        remark: String
    }],

    subTotal: { type: Number, default: 0 },
    transportCharges: { type: Number, default: 0 },
    loadingCharges: { type: Number, default: 0 },
    taxCode: { type: mongoose.Schema.Types.ObjectId, ref: 'TaxCode' },
    taxAmount: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
    terms: [{ type: String }],
    status: { type: String, enum: ['Pending', 'Received', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);