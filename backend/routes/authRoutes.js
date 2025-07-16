const express = require('express');
const router = express.Router();
const { register, login, getProfile,updateProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');
const { sendOTP, verifyOTP } = require('../controllers/otpController'); 

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getProfile); 
router.put("/profile", auth, updateProfile);
router.post('/send-otp', sendOTP); 
router.post('/verify-otp', verifyOTP); 
module.exports = router;
