const mongoose = require('mongoose');

const purchaseGRNSchema = new mongoose.Schema({
    docNo: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    fiscalYear: { type: mongoose.Schema.Types.ObjectId, ref: 'FiscalYear', required: true },

    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    referenceOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder', required: true },
    
    reference: { type: String },
    vehicleNo: { type: String },
    
    // ✅ ADDED DRIVER DETAILS
    driverName: { type: String },
    driverMobile: { type: String },
    
    remark: { type: String },

    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
        itemName: String,
        unit: String,
        orderQty: Number,
        pendingQty: Number,
        receivedQty: { type: Number, required: true },
        rate: Number,
        amount: Number
    }],

    totalAmount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('PurchaseGRN', purchaseGRNSchema);