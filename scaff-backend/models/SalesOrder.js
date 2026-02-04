const mongoose = require('mongoose');

const salesOrderSchema = new mongoose.Schema({
    docNo: { type: String, required: true, unique: true }, // e.g., SO-RENT-001
    orderType: { type: String, enum: ['RENTAL', 'SALE'], required: true },
    date: { type: Date, default: Date.now },
    
    // Header Details
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' }, // Required for Rental logic
    
    currency: { type: mongoose.Schema.Types.ObjectId, ref: 'Currency' },
    currencyRate: { type: Number, default: 1 },
    
    referenceNo: { type: String }, // Manual Reference / PO Number
    billingAddress: { type: String },
    siteAddress: { type: String },
    
    duration: { type: Number }, // Duration in days (Only for Rental)

    // Items Grid
    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
        itemName: { type: String },
        unit: { type: String },
        
        // Quantity Tracking for Challans
        quantity: { type: Number, required: true },      // Total Ordered Qty
        deliveredQty: { type: Number, default: 0 },      // ✅ Qty already sent via Delivery Challans
        
        rate: { type: Number, required: true },
        amount: { type: Number, required: true },
        remark: { type: String }
    }],

    // Footer & Financials
    subTotal: { type: Number, default: 0 },
    transportCharges: { type: Number, default: 0 },
    loadingCharges: { type: Number, default: 0 },
    
    taxCode: { type: mongoose.Schema.Types.ObjectId, ref: 'TaxCode' },
    taxAmount: { type: Number, default: 0 },
    
    grandTotal: { type: Number, default: 0 },

    terms: [{ type: String }], // Array of Terms & Conditions

    // Order Lifecycle Status
    status: { 
        type: String, 
        enum: ['Pending', 'Partial', 'Completed', 'Closed'], 
        default: 'Pending' 
    },

    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('SalesOrder', salesOrderSchema);