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
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// app.use((req, res, next) => {
//   res.setHeader(
//     'Content-Security-Policy',
//     "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
//   );
//   next();
// });


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

app.get("/", (req, res) => {
  res.json({ status: "SCAFF API is running", version: "1.0.0" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));