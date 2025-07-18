const express = require("express");
const cors = require("cors");
const app = express();

// Import routes
const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patient");
const sessionRoutes = require("./routes/session");
const statRoutes = require("./routes/stat");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/stat", statRoutes);

module.exports = app;
