const ClassCode = require("../models/Class");

exports.createClass = async (req, res) => {
  try {
    const { subject, teacher, code } = req.body;

    if (!code || code.length !== 6) {
      return res.status(400).json({ message: "❌ Code must be exactly 6 characters long." });
    }

    // Check if the code already exists
    const existingClass = await ClassCode.findOne({ code: code.toUpperCase() });
    if (existingClass) {
      return res.status(400).json({ message: "❌ Code already exists. Choose a different one." });
    }

    const newClass = await ClassCode.create({
      subject,
      code: code.toUpperCase(), // normalize to uppercase
      teacher,
    });

    res.status(201).json({
      message: "✅ Class created successfully",
      code: newClass.code,
      classId: newClass._id, // ✅ this is needed to link with attendance
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Error creating class", error: error.message });
  }
};


exports.leaveClass=async(req,res)=>{
    try{
     const {code}=req.params
      const result= await ClassCode.findOneAndDelete({
        code:code.toUpperCase()
      })
      if(!result){
        res.status(300).json({message:"something went wrong"})
      }
      else{
        res.status(201).json({message:"succesfully delete the class"})
      }
    }
    catch (err){
  res.status(500).json({message:"something went wrong"})
    }
}