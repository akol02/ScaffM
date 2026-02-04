const mongoose = require('mongoose');

const extraAdjSchema = new mongoose.Schema({
    docNo: { type: String, required: true, unique: true }, // ADJ-001
    date: { type: Date, default: Date.now },
    
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    
    // ✅ The specific Delivery Challan this adjustment modifies
    referenceChallan: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryChallan', required: true },

    adjustments: [{
        // SOURCE: The Excess Item (from GRN)
        excessItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        excessItemName: String,
        excessItemCode: String,
        
        // TARGET: The Item in the Challan we are swapping to
        challanItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        challanItemName: String,
        challanItemCode: String,

        // Quantity Swapped
        adjustedQty: { type: Number, required: true },
    }],
    
    remark: { type: String },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('ExtraItemAdjustment', extraAdjSchema);