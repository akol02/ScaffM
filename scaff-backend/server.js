const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const helmet = require('helmet');


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON body
app.use(cors()); // Allow Frontend to hit API

// To this (More relaxed for development/API use):
app.use(
  helmet({
    contentSecurityPolicy: false, // Disables the strict CSP that blocks 'eval'
  })
);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/masters', require('./routes/masterRoutes'));
app.use('/api/company', require('./routes/companyRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/sites', require('./routes/siteRoutes')); 
app.use('/api/challans', require('./routes/challanRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/sales', require('./routes/salesRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/store', require('./routes/storeRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));