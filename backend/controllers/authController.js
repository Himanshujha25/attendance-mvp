const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User.js")

exports.register = async (req, res) => {
    try {
        const { name, email, password, rollno, dob, role, } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "user alreday exists" })
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            rollno,
            dob
        })
        res.status(201).json({ message: "user registerd sucessfully", user })
    } catch (err) {
        res.status(400).json({ message: "registration failed", error: err.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login request for:", email);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid email or password" });
        }

        console.log("User found:", user.email);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password doesn't match");
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing in .env");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        console.log("Token generated");

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                email: user.email,
                name: user.name,
                role: user.role,
                rollno: user.rollno,
                dob: user.dob,
            }
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};


exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT
    const { name, dob, rollno,  } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, dob, rollno,},
      { new: true }
    );

    res.status(200).json({
      message: "✅ Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "❌ Failed to update profile",
      error: err.message,
    });
  }
};
