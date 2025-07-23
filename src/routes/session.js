const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");
const auth = require("../middleware/auth");
const multer = require("multer");
const { translateController } = require("../controllers/translateController");

// Multer config
const storage = multer.memoryStorage(); // or diskStorage if preferred
const upload = multer({ storage });

// Add session (protected)
router.post("/", auth.protect, sessionController.addSession);

// Get session list (protected)
router.get("/", auth.protect, sessionController.getSessions);

router.post("/translate", auth.protect, upload.single("file"), translateController.translateAudio);

module.exports = router;
