const mongoose = require("mongoose");

const attendanceCodeSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class", // 👈 Make sure this matches your Class model
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: String,
  expiresAt: Date,
});

module.exports = mongoose.model("AttendanceCode", attendanceCodeSchema);
