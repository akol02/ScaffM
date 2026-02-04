const Company = require('../models/Company');

exports.getCompanyProfile = async (req, res) => {
    const company = await Company.findOne();
    res.json(company || {});
};

exports.updateCompanyProfile = async (req, res) => {
    try {
        // Upsert: Update if exists, Create if not
        let company = await Company.findOne();
        if (company) {
            company = await Company.findByIdAndUpdate(company._id, req.body, { new: true });
        } else {
            company = await Company.create(req.body);
        }
        res.json(company);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};