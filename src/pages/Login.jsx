// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true); // ⏳ Start loading

  const { email, password } = form;

  if (!email.endsWith('@imsnoida.com')) {
    setError('❌ Only IMS email addresses (e.g. yourname@imsnoida.com) are allowed.');
    setLoading(false);
    return;
  }

  if (password.length < 8) {
    setError('❌ Password must be at least 8 characters long.');
    setLoading(false);
    return;
  }

  try {
    const response = await loginUser(form);
    toast.success(`✅ ${response.message || "Login successful"}`);

    const { token, user } = response;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    // ✅ Redirect based on role
    if (user.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (user.role === 'student') {
      navigate('/student/dashboard');
    } else {
      toast.error("❌ Unknown role");
    }

  } catch (err) {
    toast.error(`❌ ${err.response?.data?.message || err.message || "Login failed"}`);
  } finally {
    setLoading(false); // ✅ Stop loading
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#002147] to-[#004080] p-4">
      {/* Branding */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-white">IMS Noida</h1>
        <p className="text-gray-300 text-lg">Attendance Management Portal</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login to Your Account</h2>

        <input
          type="email"
          name="email"
          placeholder="Email (must end with @imsnoida.com)"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-xl"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-xl"
          required
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

       <button
  type="submit"
  className="w-full bg-[#002147] text-white py-2 rounded-xl hover:bg-[#003366] transition flex items-center justify-center"
  disabled={loading}
>
  {loading ? 'Logging in...' : 'Login'}
</button>


        <p className="text-center text-sm mt-2">
          Don’t have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer underline"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
