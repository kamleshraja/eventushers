const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
mongoose.set("bufferCommands", false);
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/hire", require("./routes/hireRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/pages", require("./routes/pageRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Event Ushers Express API Server", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`[Express API Server]: Running on http://localhost:${PORT}`);
});
