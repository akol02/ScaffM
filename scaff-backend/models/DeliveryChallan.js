const mongoose = require('mongoose');

const deliveryChallanSchema = new mongoose.Schema({
    docNo: { type: String, required: true, unique: true }, // DC-001
    date: { type: Date, default: Date.now },
    
    // Parties
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    
    // Link to Sales Order
    referenceOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesOrder', required: true },
    
    // Logistics
    vehicleNo: { type: String },
    driverName: { type: String },
    driverMobile: { type: String },
    remark: { type: String },

    // Items Sent Now
    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        itemName: { type: String },
        unit: { type: String },
        orderQty: { type: Number },    // Total asked
        pendingQty: { type: Number },  // Remained before this DC
        currentQty: { type: Number, required: true }, // Sending NOW
        rate: { type: Number },
        amount: { type: Number }
    }]
}, { timestamps: true });

module.exports = mongoose.model('DeliveryChallan', deliveryChallanSchema);