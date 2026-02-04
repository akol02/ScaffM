const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    code: { type: String, unique: true }, // Auto-generated ID (e.g. ITM-1001)
    name: { type: String, required: true },
    
    // ✅ Connection to Item Group Master (Dropdown Selection)
    group: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ItemGroup', 
        required: true 
    },
    
    unit: { type: String, required: true }, // Unit of Measurement
    hsnCode: { type: String },              // Manual HSN
    
    // ✅ Financials
    purchaseRate: { type: Number, default: 0 },
    sellRate: { type: Number, default: 0 },
    monthlyRentRate: { type: Number, default: 0 },
    
    // ✅ Logistics
    weight: { type: Number, default: 0 }, // Weight per unit
    
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);