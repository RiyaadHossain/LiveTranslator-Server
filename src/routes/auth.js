const express = require("express");
const router = express.Router();
const { register, login, me } = require("../controllers/authController");
const auth = require("../middleware/auth");

// Auth routes
router.post("/register", register);
router.post("/login", login);

// Get logged-in user
router.get("/me", auth.protect, me);

module.exports = router;
