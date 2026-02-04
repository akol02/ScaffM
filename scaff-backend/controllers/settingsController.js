const Settings = require('../models/Settings');

exports.getSettings = async (req, res) => {
    try {
        // Find the first document, if none, return empty object
        const settings = await Settings.findOne();
        res.json(settings || {});
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateSettings = async (req, res) => {
    try {
        // Upsert: Update if exists, create if not
        const settings = await Settings.findOne();
        if (settings) {
            const updated = await Settings.findByIdAndUpdate(settings._id, req.body, { new: true });
            res.json(updated);
        } else {
            const newSettings = await Settings.create(req.body);
            res.json(newSettings);
        }
    } catch (err) { res.status(400).json({ message: err.message }); }
};