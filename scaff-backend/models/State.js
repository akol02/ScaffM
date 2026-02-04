const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // e.g. "27"
    name: { type: String, required: true },               // e.g. "Maharashtra"
    country: { type: String, default: "India" }
}, { timestamps: true });

module.exports = mongoose.model('State', stateSchema);