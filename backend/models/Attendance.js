const mongoose = require('mongoose');

const attendanceCodeSchema = new mongoose.Schema({
  subject: { type: String, },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
   date: { type: String, required: true }, // Use 'YYYY-MM-DD'
  time: { type: String, required: true }, 
});

module.exports = mongoose.model('AttendanceCode', attendanceCodeSchema);
