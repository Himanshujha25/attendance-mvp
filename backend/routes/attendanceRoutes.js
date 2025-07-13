const express = require("express");
const router = express.Router();
const { createAttendanceCode,verifyAttendanceCode } = require("../controllers/attendanceController");
const auth = require("../middleware/auth");
const { requireRole } = require("../middleware/role");

// ✅ Only admin can generate attendance codes
router.post("/generate", auth, requireRole("admin"), createAttendanceCode);
router.post("/verify", auth, requireRole("student"), verifyAttendanceCode);
module.exports = router;
