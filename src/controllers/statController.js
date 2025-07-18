const { STATUS } = require("../enums/session");
const Patient = require("../models/Patient");
const Session = require("../models/Session");

// Get overview/stat info
exports.getStats = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const translationSessions = await Session.countDocuments();
    // Active patients: random value for now
    const activePatients = Math.floor(Math.random() * totalPatients) || 0;
    const completedSessions = await Session.countDocuments({
      status: STATUS.COMPLETED,
    });
    res.json({
      totalPatients,
      translationSessions,
      activePatients,
      completedSessions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
