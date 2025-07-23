// Get single patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const Patient = require("../models/Patient");

// Add a new patient
exports.addPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get patient list, with optional query filter
exports.getPatients = async (req, res) => {
  try {
    let filter = {};

    // Only one field filter at a time, e.g. ?firstName=John
    const queryKeys = Object.keys(req.query);
    if (queryKeys.length === 1) {
      const field = queryKeys[0];
      const value = req.query[field];
      filter[field] = value === "true" ? true : false;
    }

    const patients = await Patient.find(filter);
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
