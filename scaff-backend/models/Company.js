const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    mobile: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    gstn: { type: String },
    pan: { type: String }
});

module.exports = mongoose.model('Company', companySchema);