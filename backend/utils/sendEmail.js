// utils/sendEmail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jhahimanshu930@gmail.com",
    pass: "qjbd kauu bnqc xsgl", // ⚠️ Use Gmail App Password
  },
});

module.exports = async function sendEmail(to, subject, text) {
  await transporter.sendMail({
    from: "IMS Noida <your-email@gmail.com>",
    to,
    subject,
    text,
  });
};
