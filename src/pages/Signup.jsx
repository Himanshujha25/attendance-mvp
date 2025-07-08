import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // ✅ Add this line

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    adminCode: '',
  });

  const [emailValid, setEmailValid] = useState(true);
  const [adminCodeError, setAdminCodeError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setEmailValid(value.endsWith("@imsnoida.com"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailValid(true);
    setAdminCodeError(false);

    if (!form.email.endsWith("@imsnoida.com")) {
      setEmailValid(false);
      toast.error("❌ Please use your college email (@imsnoida.com)");
      return;
    }

    if (form.role === "admin" && form.adminCode !== "IMS2025ADMIN") {
      setAdminCodeError(true);
      toast.error("❌ Invalid Admin Code");
      return;
    }

    toast.success(`✅ Welcome ${form.name}! Registered as ${form.role.toUpperCase()}`);

  const encodedName = encodeURIComponent(form.name);
  const encodedRole = encodeURIComponent(form.role);

  navigate(`/login?name=${encodedName}&role=${encodedRole}`);
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

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-xl"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email (Use your @imsnoida.com)"
          value={form.email}
          onChange={handleChange}
          className={`w-full p-2 border rounded-xl ${!emailValid ? 'border-red-500' : ''}`}
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
          <>
            <input
              type="text"
              name="adminCode"
              placeholder="Enter Admin Code"
              value={form.adminCode}
              onChange={handleChange}
              className={`w-full p-2 border rounded-xl ${
                adminCodeError ? 'border-red-500' : ''
              }`}
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-[#002147] text-white py-2 rounded-xl hover:bg-[#003366]"
        >
          Sign Up
        </button>

        <p className="text-center text-sm mt-2">
          Already registered?{' '}
          <span
            className="text-blue-500 cursor-pointer underline"
            onClick={() => navigate('/login')}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}
