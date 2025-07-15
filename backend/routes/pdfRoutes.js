// routes/pdfRoutes.js or inside adminRoutes.js
const express = require("express");
const router = express.Router();
const { downloadAttendancePDF } = require("../controllers/pdfController");
const auth = require("../middleware/auth");
const {requireRole} = require("../middleware/role");

router.get("/download-pdf", auth, requireRole("admin"), downloadAttendancePDF);

module.exports = router;
