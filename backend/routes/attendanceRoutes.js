const express = require("express");
const router = express.Router();
const {
  createAttendanceCode,
  verifyAttendanceCode,
  checkAttendance,
} = require("../controllers/attendanceController");
const auth = require("../middleware/auth");
const { requireRole } = require("../middleware/role");

// ✅ Only admin can generate attendance codes
router.post("/generate", auth, requireRole("admin"), createAttendanceCode);

// ✅ Students verify and mark attendance
router.post("/verify", auth, requireRole("student"), verifyAttendanceCode);

// ✅ Students check if they already marked attendance (GET with classId in URL)
router.get("/check/:classId", auth, requireRole("student"), checkAttendance);

module.exports = router;
