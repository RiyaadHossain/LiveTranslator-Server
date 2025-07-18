const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: String },
  age: { type: String },
  gender: { type: String },
  phone: { type: String },
  email: { type: String },
  language: { type: String, required: true },
  address: { type: String },
  emergencyContact: { type: String },
  emergencyPhone: { type: String },
  medicalCondition: { type: String, required: true },
  allergies: { type: String },
  medications: { type: String },
  insuranceId: { type: String },
  bloodType: { type: String },
  notes: { type: String },
  isFavorite: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Patient", patientSchema);
