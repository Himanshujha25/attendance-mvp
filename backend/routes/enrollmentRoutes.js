// routes/enrollmentRoutes.js
const express = require("express");
const router = express.Router();
const { joinClass, leaveClass } = require("../controllers/enrollmentController");
const auth = require("../middleware/auth");
const { requireRole } = require("../middleware/role");

// Only students can join class
router.post("/join", auth, requireRole("student"), joinClass);
router.delete("/leave/:code",auth,requireRole("student"),leaveClass)

module.exports = router;
