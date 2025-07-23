const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
const auth = require("../middleware/auth");

// Add patient (protected)
router.post("/", auth.protect, patientController.addPatient);

// Get patient list (protected)
router.get("/", auth.protect, patientController.getPatients);

// Get single patient by ID (protected)
router.get("/:id", auth.protect, patientController.getPatientById);

module.exports = router;
