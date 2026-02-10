const path = require("path");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const fs = require("fs"); // Added for diagnostic
const connectDB = require("./config/db");
const { createRequestHandler } = require("@react-router/express");

dotenv.config();
connectDB();

const app = express();

// ✅ 1. Fix CSP/Eval Warning
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(morgan("tiny"));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/masters', require('./routes/masterRoutes'));
app.use('/api/company', require('./routes/companyRoutes'));
app.use('/api/purchase', require('./routes/purchaseRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/sites', require('./routes/siteRoutes')); 
app.use('/api/challans', require('./routes/challanRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/sales', require('./routes/salesRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/store', require('./routes/storeRoutes'));

// ✅ 2. Setup Paths
const buildPath = path.resolve(__dirname, "build");
const clientBuildPath = path.join(buildPath, "client");
const serverBuildPath = path.join(buildPath, "server", "index.js");

// ✅ 3. DIAGNOSTIC: Check if build folder actually exists on Render
if (!fs.existsSync(clientBuildPath)) {
    console.error(`❌ ERROR: Client build folder NOT FOUND at ${clientBuildPath}`);
} else {
    console.log(`✅ SUCCESS: Client build folder found.`);
}

// Serve Static Assets
app.use(express.static(clientBuildPath, { maxAge: "1h" }));
app.use("/assets", express.static(path.join(clientBuildPath, "assets"), {
  immutable: true,
  maxAge: "1y",
}));

// ✅ 4. The Catch-All Handler (Handles / and all frontend routes)
app.all("*", (req, res, next) => {
  try {
    // We check if the server build file exists before requiring it
    if (!fs.existsSync(serverBuildPath)) {
        return res.status(500).send("Server build file missing. Did you push the 'build' folder to GitHub?");
    }
    
    return createRequestHandler({
      build: require(serverBuildPath),
    })(req, res, next);
  } catch (error) {
    console.error("SSR Rendering Error:", error);
    next(error);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 ScaffRent Monolith Running on port ${PORT}`);
  console.log(`📂 Serving static files from: ${clientBuildPath}`);
});