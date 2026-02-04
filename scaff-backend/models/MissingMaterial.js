const mongoose = require('mongoose');

const missingMaterialSchema = new mongoose.Schema({
    docNo: { type: String, required: true, unique: true }, // MISS-001
    date: { type: Date, default: Date.now },
    
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    
    // ✅ NEW: Link to Delivery Challan
    referenceChallan: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryChallan' },
    
    remark: { type: String },

    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        itemCode: { type: String },
        itemName: { type: String },
        unit: { type: String },
        missingQty: { type: Number, required: true },
        rate: { type: Number }, // Replacement Value
        amount: { type: Number }
    }],
    
    status: { type: String, enum: ['Reported', 'Invoiced', 'Written Off'], default: 'Reported' },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('MissingMaterial', missingMaterialSchema);