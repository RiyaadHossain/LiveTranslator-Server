const express = require("express");
const router = express.Router();
const statController = require("../controllers/statController");
const auth = require("../middleware/auth");

// Get overview/stat info (protected)
router.get("/", auth.protect, statController.getStats);

module.exports = router;
