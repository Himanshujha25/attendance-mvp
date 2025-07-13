const AttendanceCode = require("../models/Attendance");
const AttendanceRecord = require("../models/AttendanceRecord"); // ✅ this stores attendance records
const ClassCode = require("../models/Class");

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// ✅ Generate attendance code
exports.createAttendanceCode = async (req, res) => {
  try {
    const { classId } = req.body;

    if (!classId) {
      return res.status(400).json({ message: "❌ classId is required" });
    }

    const code = generateCode();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 2 * 60 * 1000); // valid for 2 mins

    const newCode = await AttendanceCode.create({
      classId,
      code,
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

// ✅ Verify attendance code
exports.verifyAttendanceCode = async (req, res) => {
  try {
    const { code } = req.body;
    const studentId = req.user.id;

    const attendanceCode = await AttendanceCode.findOne({ code: code.toUpperCase() });

    if (!attendanceCode) {
      return res.status(404).json({ message: "❌ Invalid code" });
    }

    if (new Date() > attendanceCode.expiresAt) {
      return res.status(400).json({ message: "⏰ Code has expired" });
    }

    const today = new Date().toISOString().split("T")[0];

    const alreadyMarked = await AttendanceRecord.findOne({
      studentId,
      date: today,
    });

    if (alreadyMarked) {
      return res.status(400).json({ message: "⚠️ Attendance already marked today" });
    }

    await AttendanceRecord.create({
      studentId,
      date: today,
      time: new Date().toTimeString().split(" ")[0],
    });


    res.status(200).json({
      message: "✅ Attendance marked successfully",

      subject: ClassCode.subject,
      teacher: ClassCode.teacher,

      time: new Date().toLocaleTimeString(),
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to verify code", error: err.message });
  }
};
