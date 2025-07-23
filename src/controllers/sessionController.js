const Session = require("../models/Session");
const Patient = require("../models/Patient");
const { SESSION_TYPE, STATUS } = require("../enums/session");

// Add a new session
exports.addSession = async (req, res) => {
  try {
    console.log("Adding session with data:", req.body);

    // Validate patient exists
    const { patient, duration, translationHistory } = req.body;
    const patientObj = await Patient.findById(patient);
    if (!patientObj) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Derive session fields from translationHistory
    const messageCount = Array.isArray(translationHistory)
      ? translationHistory.length
      : 0;

    // Calculate translationAccuracy (dummy: percent of non-empty translatedText)
    const validTranslations =
      translationHistory?.filter(
        (t) => t.translatedText && t.translatedText.trim()
      ).length || 0;
    const translationAccuracy = messageCount
      ? Math.round((validTranslations / messageCount) * 100)
      : null;

    // Summary: join all translatedText
    const summary =
      translationHistory?.map((t) => t.translatedText).join(" ") || "";
    // Key topics: extract keywords from originalText (dummy: first word of each)

    const keyTopics =
      translationHistory
        ?.map((t) => t.originalText?.split(" ")[0])
        .filter(Boolean) || [];

    // Default status and sessionType
    const status = STATUS.COMPLETED;
    const sessionType = SESSION_TYPE.CONSULTATION;

    console.log({ translationAccuracy, summary, keyTopics });

    const session = new Session({
      patient,
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toLocaleTimeString(),
      duration: duration?.toString(),
      status,
      translationAccuracy,
      messageCount,
      sessionType,
      summary,
      keyTopics,
    });

    await session.save();
    res.status(201).json(session);
  } catch (error) {
    console.log(error);
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
