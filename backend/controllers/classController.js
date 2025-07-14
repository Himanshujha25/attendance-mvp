const ClassCode = require("../models/Class");

exports.createClass = async (req, res) => {
  try {
    const { subject, teacher, code } = req.body;

    if (!subject || !teacher || !code) {
      return res.status(400).json({ message: "❌ All fields (subject, teacher, code) are required." });
    }

    if (code.length !== 6) {
      return res.status(400).json({ message: "❌ Code must be exactly 6 characters long." });
    }

    const existingClass = await ClassCode.findOne({ code: code.toUpperCase() });
    if (existingClass) {
      return res.status(400).json({ message: "❌ Code already exists. Choose a different one." });
    }

    const newClass = await ClassCode.create({
      subject,
      code: code.toUpperCase(),
      teacher,
    });

    res.status(201).json({
      message: "✅ Class created successfully",
      code: newClass.code,
      classId: newClass._id,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Error creating class", error: error.message });
  }
};

exports.leaveClass = async (req, res) => {
  try {
    const { code } = req.params;

    if (!code || code.length !== 6) {
      return res.status(400).json({ message: "❌ Invalid code" });
    }

    const deleted = await ClassCode.findOneAndDelete({ code: code.toUpperCase() });

    if (!deleted) {
      return res.status(404).json({ message: "❌ Class not found or already deleted" });
    }

    res.status(200).json({ message: "✅ Class deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "❌ Something went wrong", error: err.message });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const allClasses = await ClassCode.find();
    res.status(200).json(allClasses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch classes", error: err.message });
  }
};
