// controllers/otpController.js
const otpGenerator = require("otp-generator");
const sendEmail = require("../utils/sendEmail");
const { setOTP, getOTP, deleteOTP } = require("../utils/otpStore");

exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.endsWith("@imsnoida.com")) {
    return res.status(400).json({ message: "❌ Please use a valid @imsnoida.com email" });
  }

  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
  setOTP(email, otp);

  try {
    await sendEmail(email, "IMS Noida OTP Verification", `Your OTP is: ${otp}`);
    res.status(200).json({ message: "✅ OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "❌ Failed to send OTP", error: error.message });
  }
};

exports.verifyOTP = (req, res) => {
  const { email, otp } = req.body;
  const stored = getOTP(email);

  if (!stored) return res.status(400).json({ message: "❌ OTP not sent or expired" });

  if (Date.now() > stored.expiresAt) {
    deleteOTP(email);
    return res.status(400).json({ message: "❌ OTP expired" });
  }

  if (stored.otp !== otp) {
    return res.status(400).json({ message: "❌ Incorrect OTP" });
  }

  deleteOTP(email);
  res.status(200).json({ message: "✅ OTP verified successfully" });
};
