const express = require("express");
const router = express.Router();
const {
  createAttendanceCode,
  verifyAttendanceCode,
  checkAttendance,getAllAttendanceDates,getAttendanceByDate} = require("../controllers/attendanceController");
const auth = require("../middleware/auth");
const { requireRole } = require("../middleware/role");

router.post("/generate", auth, requireRole("admin"), createAttendanceCode);


router.post("/verify", auth, requireRole("student"), verifyAttendanceCode);

router.get("/check/:classId", auth, requireRole("student"), checkAttendance);
router.get("/attendance-dates", auth, requireRole("admin"), getAllAttendanceDates);
router.get("/attendances",  auth, requireRole("admin"), getAttendanceByDate);

module.exports = router;
