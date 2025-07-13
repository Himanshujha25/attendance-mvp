const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,         
    required: true,
    unique: true,
  },
  password: String,
  role: {
    type: String,         
    enum: ['student', 'admin'],  
    default: 'student',
  },
  rollno: String,
  dob: String,
  profileImage: String,
});

module.exports = mongoose.model("User", userSchema);
