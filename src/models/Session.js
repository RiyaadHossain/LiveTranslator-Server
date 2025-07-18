const mongoose = require("mongoose");
const { STATUS, EMERGENCY_LEVEL, SESSION_TYPE } = require("../enums/session");

const sessionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    duration: { type: String },
    status: {
      type: String,
      enum: Object.values(STATUS),
      required: true,
    },
    translationAccuracy: { type: Number },
    messageCount: { type: Number },
    sessionType: {
      type: String,
      enum: Object.values(SESSION_TYPE),
      required: true,
    },
    summary: { type: String },
    keyTopics: [{ type: String }],
    emergencyLevel: { type: String, enum: Object.values(EMERGENCY_LEVEL) },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
