const mongoose = require('mongoose');

const inventoryTxnSchema = new mongoose.Schema({
    docNo: { type: String, required: true, unique: true }, // Auto: MAT-IN-001
    txnType: { type: String, enum: ['INWARD', 'OUTWARD'], required: true },
    date: { type: Date, default: Date.now },
    
    // ✅ AUTO-LINKED FIELD
    fiscalYear: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'FiscalYear', 
        required: true 
    },

    reference: { type: String }, // Manual Ref
    remark: { type: String },
    
    // Header Selection
    warehouse: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Warehouse', 
        required: true 
    },

    // Grid Details
    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
        itemCode: { type: String },
        itemName: { type: String },
        unit: { type: String },
        quantity: { type: Number, required: true },
        rate: { type: Number, required: true }, 
        amount: { type: Number, required: true } 
    }]
}, { timestamps: true });

module.exports = mongoose.model('InventoryTxn', inventoryTxnSchema);