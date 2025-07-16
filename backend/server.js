const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors({
  origin: ['https://attendance-mvp.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/authRoutes");
const classroute=require("./routes/classRoutes")
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const attendanceRoutes=require("./routes/attendanceRoutes")
const pdfRoutes = require("./routes/pdfRoutes"); 


// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/class",classroute)
app.use("/api/enroll", enrollmentRoutes);
app.use("/api/attendance",attendanceRoutes)
app.use("/api/admin", pdfRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB Error", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT,"0.0.0.0" ,() => {
  console.log(`🚀 Server running on port ${PORT}`);
});
