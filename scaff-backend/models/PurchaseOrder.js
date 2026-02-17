const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
    docNo: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' },
    currencyRate: { type: Number, default: 1 },
    
    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
        itemName: String,
        unit: String,
        quantity: Number,
        receivedQty: { type: Number, default: 0 }, 
        rate: Number,
        amount: Number,
        remark: String
    }],

    subTotal: { type: Number, default: 0 },
    transportCharges: { type: Number, default: 0 },
    loadingCharges: { type: Number, default: 0 },
    taxCode: { type: mongoose.Schema.Types.ObjectId, ref: 'TaxCode' },
    taxAmount: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
    
    // ✅ ENSURE 'Received' and 'Partial' ARE HERE
    status: { 
        type: String, 
        enum: ['Open', 'Pending', 'Partial', 'Received', 'Close', 'Cancel'], 
        default: 'Open' 
    },

    shippingAddress: String, // Ensure this field exists if used
    billingAddress: String,

    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);