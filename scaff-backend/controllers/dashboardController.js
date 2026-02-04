const Customer = require('../models/Customer');
const Item = require('../models/Item');
const Employee = require('../models/Employee');
const Challan = require('../models/Challan');
const SalesOrder = require('../models/SalesOrder'); // ✅ Import SalesOrder

exports.getDashboardStats = async (req, res) => {
    try {
        // 1. BASIC COUNTS
        const customerCount = await Customer.countDocuments();
        const employeeCount = await Employee.countDocuments();
        const itemCount = await Item.countDocuments();
        
        // 2. INVENTORY VALUE (Sum of Purchase Rate * Quantity is ideal, but here we use Item Value)
        const items = await Item.find();
        const totalStockValue = items.reduce((acc, item) => acc + (item.purchaseRate || 0), 0); // Using Purchase Rate for Asset Value

        // 3. FINANCIALS (From Sales Orders)
        const financials = await SalesOrder.aggregate([
            { 
                $group: { 
                    _id: null, 
                    totalRevenue: { $sum: "$grandTotal" },
                    totalOrders: { $sum: 1 }
                } 
            }
        ]);
        
        const totalRevenue = financials.length > 0 ? financials[0].totalRevenue : 0;
        const totalOrders = financials.length > 0 ? financials[0].totalOrders : 0;

        // Count Active Rentals vs Sales
        const rentalCount = await SalesOrder.countDocuments({ orderType: 'RENTAL' });

        // 4. CHART 1: SALES TREND (Last 6 Months Revenue)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const salesTrendRaw = await SalesOrder.aggregate([
            { $match: { createdAt: { $gte: sixMonthsAgo } } },
            { 
                $group: { 
                    _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } }, 
                    total: { $sum: "$grandTotal" } 
                } 
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const lineChartData = salesTrendRaw.map(item => ({
            name: `${monthNames[item._id.month - 1]}`,
            value: item.total
        }));

        // 5. CHART 2: INVENTORY CATEGORY DISTRIBUTION
        const categoryData = await Item.aggregate([
            { 
                $lookup: {
                    from: "itemgroups", // Collection name is lowercase plural
                    localField: "group",
                    foreignField: "_id",
                    as: "groupInfo"
                }
            },
            { $unwind: "$groupInfo" },
            { $group: { _id: "$groupInfo.name", count: { $sum: 1 } } }
        ]);
        
        const pieChartData = categoryData.map(c => ({
            name: c._id || "Other",
            value: c.count
        }));

        // 6. RECENT ACTIVITY (Latest 5 Challans)
        const recentChallans = await Challan.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('site', 'name')
            .populate('customer', 'name');

        const activityFeed = recentChallans.map(c => ({
            id: c._id,
            type: c.type, // Delivery/Return
            title: c.customer?.name || "Unknown",
            subtitle: c.site?.name || "Unknown Site",
            date: c.createdAt,
            amount: `${c.items.length} Items`,
            status: "Completed"
        }));

        res.json({
            counts: {
                revenue: totalRevenue,
                rentals: rentalCount,
                customers: customerCount,
                stockValue: totalStockValue,
            },
            charts: {
                pie: pieChartData,
                line: lineChartData
            },
            recentActivity: activityFeed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};