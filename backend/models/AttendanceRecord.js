const mongoose = require("mongoose");

const attendanceRecordSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClassCode",
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  studentId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
}

});

module.exports = mongoose.model("AttendanceRecord", attendanceRecordSchema);
