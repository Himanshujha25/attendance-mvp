const express = require("express");
const router = express.Router();

const { createClass, leaveClass } = require("../controllers/classController");
const auth = require("../middleware/auth");
const { requireRole } = require("../middleware/role");

router.post("/create", auth, requireRole("admin"), createClass);
router.delete("/delete/:code",auth, requireRole("admin"),leaveClass)
module.exports = router;
