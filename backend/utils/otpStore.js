// utils/otpStore.js
const otpMap = new Map(); // email => { otp, expiresAt }

module.exports = {
  setOTP: (email, otp) => {
    otpMap.set(email, {
      otp,
      expiresAt: Date.now() + 2 * 60 * 1000, // 2 minutes validity
    });
  },
  getOTP: (email) => otpMap.get(email),
  deleteOTP: (email) => otpMap.delete(email),
};


