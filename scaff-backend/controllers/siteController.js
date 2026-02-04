const Site = require('../models/Site');

// GET All Sites
exports.getSites = async (req, res) => {
    try {
        const sites = await Site.find().populate('customer', 'name code').sort({ _id: -1 });
        res.json(sites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE New Site
exports.createSite = async (req, res) => {
    try {
        const { name, address, state, contactPerson, mob1, mob2, customerId } = req.body;

        const site = await Site.create({
            name,
            address,
            state,
            contactPerson,
            mob1,
            mob2,
            customer: customerId
        });

        const populatedSite = await Site.findById(site._id).populate('customer', 'name code');
        res.status(201).json(populatedSite);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE Site
exports.updateSite = async (req, res) => {
    try {
        // If customerId is sent in body, we need to ensure it updates the 'customer' field
        const updateData = { ...req.body };
        if (updateData.customerId) {
            updateData.customer = updateData.customerId;
        }

        const updated = await Site.findByIdAndUpdate(req.params.id, updateData, { new: true })
            .populate('customer', 'name code');
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};