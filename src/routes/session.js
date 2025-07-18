const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");
const auth = require("../middleware/auth");

// Add session (protected)
router.post("/", auth.protect, sessionController.addSession);

// Get session list (protected)
router.get("/", auth.protect, sessionController.getSessions);

module.exports = router;
