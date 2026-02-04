const mongoose = require('mongoose');

const challanSchema = new mongoose.Schema({
    challanNo: { type: String, required: true, unique: true }, // e.g., CHL-1001
    type: { type: String, enum: ['Delivery', 'Return'], required: true }, // Going Out or Coming In
    date: { type: Date, default: Date.now },
    
    // The Connection: Customer -> Site
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    
    // Logistics Details
    vehicleNo: { type: String },
    
    // The Items (What is being delivered)
    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
        quantity: { type: Number, required: true },
        // We capture weight at the time of delivery for historical accuracy
        weight: { type: Number } 
    }]
}, { timestamps: true });

module.exports = mongoose.model('Challan', challanSchema);