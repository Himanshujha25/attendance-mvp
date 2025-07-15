const AttendanceCode = require("../models/Attendance");
const AttendanceRecord = require("../models/AttendanceRecord");
const ClassCode = require("../models/Class");
const User = require("../models/User");
const moment = require("moment-timezone"); // ✅ install this if not already

// Generate a random 6-character code
function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// ✅ Generate an attendance code for a class
exports.createAttendanceCode = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code)
      return res.status(400).json({ message: "❌ Class code is required" });

    const classData = await ClassCode.findOne({ code: code.toUpperCase() });

    if (!classData)
      return res.status(404).json({ message: "❌ Class not found" });

    const attendanceCode = generateCode();
    const now = moment().tz("Asia/Kolkata");
    const expiresAt = now.clone().add(2, "minutes").toDate();

    const newCode = await AttendanceCode.create({
      classId: classData._id,
      code: attendanceCode,
      date: now.format("YYYY-MM-DD"),
      time: now.format("HH:mm:ss"),
      expiresAt,
    });

    res.status(201).json({
      message: "✅ Code generated",
      code: newCode.code,
      expiresAt: newCode.expiresAt,
      subject: classData.subject,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Failed to generate code",
      error: error.message,
    });
  }
};

// ✅ Verify and mark attendance
exports.verifyAttendanceCode = async (req, res) => {
  try {
    const { code } = req.body;
    const studentId = req.user.id;

    const attendanceCode = await AttendanceCode.findOne({ code: code.toUpperCase() });

    if (!attendanceCode)
      return res.status(404).json({ message: "❌ Invalid code" });

    if (new Date() > attendanceCode.expiresAt)
      return res.status(400).json({ message: "⏰ Code has expired" });

    const now = moment().tz("Asia/Kolkata");
    const today = now.format("YYYY-MM-DD");

    // Check if already marked
    const alreadyMarked = await AttendanceRecord.findOne({
      studentId,
      classId: attendanceCode.classId,
      date: today,
    });

    if (alreadyMarked)
      return res.status(400).json({ message: "⚠️ Attendance already marked for this class today" });

    // ✅ Save attendance
    const newRecord = await AttendanceRecord.create({
      studentId,
      classId: attendanceCode.classId,
      date: today,
      time: now.format("HH:mm:ss"),
    });

    const classDetails = await ClassCode.findById(attendanceCode.classId);

    res.status(200).json({
      message: "✅ Attendance marked successfully",
      subject: classDetails.subject,
      teacher: classDetails.teacher,
      time: newRecord.time,
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
};

// ✅ Check if student has already marked attendance
exports.checkAttendance = async (req, res) => {
  try {
    const { classId } = req.params;
    const studentId = req.user.id;
    const today = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

    const alreadyMarked = await AttendanceRecord.findOne({
      classId,
      studentId,
      date: today,
    });

    res.status(200).json({ marked: !!alreadyMarked });

  } catch (err) {
    res.status(500).json({ message: "❌ Error checking attendance", error: err.message });
  }
};

// ✅ Get all attendance dates
exports.getAllAttendanceDates = async (req, res) => {
  try {
    const dates = await AttendanceRecord.find().distinct("date");
    res.status(200).json(dates);
  } catch (error) {
    res.status(500).json({
      message: "❌ Failed to fetch attendance dates",
      error: error.message,
    });
  }
};

// ✅ Get attendance by date with optional subject filtering
exports.getAttendanceByDate = async (req, res) => {
  try {
    const { date, subject } = req.query;

    if (!date) {
      return res.status(400).json({ message: "❌ Date is required" });
    }

    // Load all records for that date
    const records = await AttendanceRecord.find({ date })
      .populate("studentId", "name email")
      .populate("classId", "subject code");

    // Filter by subject if needed
    const filteredRecords = subject
      ? records.filter((record) => record.classId?.subject === subject)
      : records;

    const response = filteredRecords.map((record) => ({
      name: record.studentId?.name,
      email: record.studentId?.email,
      subject: record.classId?.subject || "Unknown",
      classCode: record.classId?.code || "N/A",
      time: record.time,
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "❌ Failed to fetch attendance for date",
      error: error.message,
    });
  }
};
