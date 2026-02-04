const mongoose = require('mongoose');

const grnSchema = new mongoose.Schema({
    docNo: { type: String, required: true, unique: true }, // GRN-001
    date: { type: Date, default: Date.now },
    
    // Parties
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    
    // Logistics
    vehicleNo: { type: String },
    driverName: { type: String },
    remark: { type: String },

    // Returned Items
    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        itemCode: { type: String },
        itemName: { type: String },
        unit: { type: String },
        
        // Return Breakdown
        qtyOk: { type: Number, default: 0 },       // Good condition
        qtyExchange: { type: Number, default: 0 }, // Damaged/Repair
        qtyExcess: { type: Number, default: 0 },   // Extra returned
        
        totalQty: { type: Number, required: true }, // Ok + Exchange
        
        rate: { type: Number },
        amount: { type: Number }
    }],
    
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('GoodsReceivedNote', grnSchema);