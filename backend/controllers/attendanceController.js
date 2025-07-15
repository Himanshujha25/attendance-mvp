const AttendanceCode = require("../models/Attendance");
const AttendanceRecord = require("../models/AttendanceRecord"); // ✅ this stores attendance records
const ClassCode = require("../models/Class");
const User =require("../models/User")


function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

exports.createAttendanceCode = async (req, res) => {
  try {
    const { code } = req.body; // class code, e.g., "MTH101"

    if (!code) {
      return res.status(400).json({ message: "❌ Class code is required" });
    }

    // 🔍 Find class by its unique code
    const classData = await ClassCode.findOne({ code: code.toUpperCase() });

    if (!classData) {
      return res.status(404).json({ message: "❌ Class not found with this code" });
    }

    const attendanceCode = generateCode();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 2 * 60 * 1000); // valid for 2 mins

    const newCode = await AttendanceCode.create({
      classId: classData._id,
      code: attendanceCode,
      date: now.toISOString().split("T")[0],
      time: now.toTimeString().split(" ")[0],
      expiresAt,
    });

    res.status(201).json({
      message: "✅ Attendance code generated",
      code: newCode.code,
      expiresAt: newCode.expiresAt,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Failed to generate attendance code",
      error: error.message,
    });
  }
};


exports.verifyAttendanceCode = async (req, res) => {
  try {
    const { code } = req.body;
    const studentId = req.user.id;
    const attendanceCode = await AttendanceCode.findOne({ code: code.toUpperCase() });
    console.log("Attendance Code Record:", attendanceCode);

    if (!attendanceCode) {
      return res.status(404).json({ message: "❌ Invalid code" });
    }

    if (new Date() > attendanceCode.expiresAt) {
      return res.status(400).json({ message: "⏰ Code has expired" });
    }

    const today = new Date().toISOString().split("T")[0];

    // Check if already marked for the same class and day
    const alreadyMarked = await AttendanceRecord.findOne({
      studentId,
      classId: attendanceCode.classId,
      date: today,
    });

    if (alreadyMarked) {
      return res.status(400).json({ message: "⚠️ Attendance already marked today" });
    }

    // ✅ Mark attendance
    await AttendanceRecord.create({
      studentId,
      classId: attendanceCode.classId,
      date: today,
      time: new Date().toTimeString().split(" ")[0],
    });

    // 🎯 Get class info
    const classDetails = await ClassCode.findById(attendanceCode.classId);

    res.status(200).json({
      message: "✅ Attendance marked successfully",
      subject: classDetails.subject,
      teacher: classDetails.teacher,
      time: new Date().toLocaleTimeString(),
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to verify code", error: err.message });
  }
};

// controllers/attendanceController.js

exports.checkAttendance = async (req, res) => {
  try {
    const { classId } = req.params;
    const studentId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

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
// Get all dates on which attendance was marked
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

exports.getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "❌ Date is required" });
    }

    // Get all attendance records for the given date
    const records = await AttendanceRecord.find({ date }).populate("studentId", "name email");

    const response = records.map((record) => ({
      name: record.studentId.name,
      email: record.studentId.email,
      classId: record.classId,
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

