const Challan = require('../models/Challan');

// Helper: Generate CHL-1001
const generateChallanNo = async () => {
    const last = await Challan.findOne().sort({ _id: -1 });
    let nextId = 1001;
    if (last && last.challanNo) {
        const parts = last.challanNo.split('-');
        nextId = parseInt(parts[1]) + 1;
    }
    return `CHL-${nextId}`;
};

exports.createChallan = async (req, res) => {
    try {
        const { type, customer, site, vehicleNo, items } = req.body;
        const challanNo = await generateChallanNo();
        
        const newChallan = await Challan.create({
            challanNo,
            type,
            customer,
            site,
            vehicleNo,
            items
        });

        res.status(201).json(newChallan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getChallans = async (req, res) => {
    try {
        const challans = await Challan.find()
            .populate('customer', 'name')
            .populate('site', 'name')
            .populate('items.item', 'name code')
            .sort({ createdAt: -1 });
        res.json(challans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateChallan = async (req, res) => {
    try {
        const updated = await Challan.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('customer', 'name')
            .populate('site', 'name')
            .populate('items.item', 'name code');
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};