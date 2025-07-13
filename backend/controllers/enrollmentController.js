// controllers/enrollmentController.js
const Enrollment = require("../models/Enrollment");
const ClassCode = require("../models/Class");

exports.joinClass = async (req, res) => {
  try {
    const { code } = req.body;
    const studentId = req.user.id; // coming from JWT middleware

    // Check if class code exists
    const classExists = await ClassCode.findOne({ code: code.toUpperCase() });
    if (!classExists) {
      return res.status(404).json({ message: "❌ Invalid class code" });
    }

    // Prevent duplicate joining
    const alreadyJoined = await Enrollment.findOne({ studentId, classCode: code.toUpperCase() });
    if (alreadyJoined) {
      return res.status(400).json({ message: "❌ Already joined this class" });
    }

    const join = await Enrollment.create({
      studentId,
      classCode: code.toUpperCase(),
      teacher: classExists.teacher,
      subject: classExists.subject
    });
    

    res.status(201).json({ message: "✅ Successfully joined class", 
       studentId,
      classCode: code.toUpperCase(),
      teacher: classExists.teacher,
      subject: classExists.subject
      });
  } catch (error) {
    res.status(500).json({ message: "❌ Failed to join class", error: error.message });
  }
};

exports.leaveClass = async (req, res) => {
  try {
    const { code } = req.params;
    const studentId = req.user.id;

    const result = await Enrollment.findOneAndDelete({
      studentId,
      classCode: code.toUpperCase()
    });

    if (!result) {
      return res.status(404).json({ message: "❌ You are not enrolled in this class" });
    }

    res.status(200).json({ message: "✅ Successfully left the class" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error while leaving class", error: error.message });
  }
};
