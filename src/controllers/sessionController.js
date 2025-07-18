const Session = require("../models/Session");
const Patient = require("../models/Patient");

// Add a new session
exports.addSession = async (req, res) => {
  try {
    // Validate patient exists
    const patient = await Patient.findById(req.body.patient);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    const session = new Session(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get session list, with optional query filter by any field
exports.getSessions = async (req, res) => {
  try {
    let filter = {};
    const queryKeys = Object.keys(req.query);
    if (queryKeys.length === 1) {
      const field = queryKeys[0];
      const value = req.query[field];
      filter[field] = { $regex: value, $options: "i" };
    }
    const sessions = await Session.find(filter).populate("patient");
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
