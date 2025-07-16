import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    adminCode: '',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  const [emailValid, setEmailValid] = useState(true);
  const [adminCodeError, setAdminCodeError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setEmailValid(value.endsWith("@imsnoida.com"));
    }
  };

  const sendOtp = async () => {
    if (!form.email.endsWith("@imsnoida.com")) {
      toast.error(" Use @imsnoida.com email");
      return;
    }
    try {
      await axios.post("https://attendance-mvp-1.onrender.com/api/auth/send-otp", { email: form.email });
      toast.success(" OTP sent to email");
      setOtpSent(true);
    } catch (err) {
      toast.error(" Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post("https://attendance-mvp-1.onrender.com/api/auth/verify-otp", {
        email: form.email,
        otp,
      });
      toast.success(" OTP verified!");
      setOtpVerified(true);
    } catch (err) {
      toast.error(" Invalid OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      toast.warning(" Please verify OTP before signing up");
      return;
    }

    if (form.role === "admin" && form.adminCode !== "IMS2025ADMIN") {
      setAdminCodeError(true);
      toast.error(" Invalid Admin Code");
      return;
    }

    try {
      const response = await axios.post("https://attendance-mvp-1.onrender.com/api/auth/register", form);
      toast.success(`✅ ${response.data.message || "Registered successfully"}`);
      navigate(`/?name=${encodeURIComponent(form.name)}&role=${encodeURIComponent(form.role)}`);
    } catch (err) {
      toast.error(` ${err.response?.data?.message || "Registration failed"}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#002147] to-[#004080] p-4">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-white">IMS Noida</h1>
        <p className="text-gray-300 text-lg">Attendance Management Portal</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Create an Account</h2>

        <input type="text" name="name" placeholder="Full Name" value={form.name}
          onChange={handleChange} className="w-full p-2 border rounded-xl" required />

        <div className="flex gap-2">
          <input
            type="email"
            name="email"
            placeholder="Email (Use your @imsnoida.com)"
            value={form.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded-xl ${!emailValid ? 'border-red-500' : ''}`}
            required
          />
          <button
            type="button"
            onClick={sendOtp}
            className="px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Send OTP
          </button>
        </div>

        {otpSent && (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded-xl"
              required
            />
            <button
              type="button"
              onClick={verifyOtp}
              className="px-4 bg-green-600 text-white rounded-xl hover:bg-green-700"
            >
              Verify OTP
            </button>
          </div>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-xl"
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 border rounded-xl"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        {form.role === "admin" && (
          <input
            type="text"
            name="adminCode"
            placeholder="Enter Admin Code"
            value={form.adminCode}
            onChange={handleChange}
            className={`w-full p-2 border rounded-xl ${adminCodeError ? 'border-red-500' : ''}`}
          />
        )}

        <button
          type="submit"
          className="w-full bg-[#002147] text-white py-2 rounded-xl hover:bg-[#003366] transition flex items-center justify-center"
          disabled={!otpVerified}
        >
          Sign Up
        </button>

        <p className="text-center text-sm mt-2">
          Already registered?{' '}
          <span
            className="text-blue-500 cursor-pointer underline"
            onClick={() => navigate('/')}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}
