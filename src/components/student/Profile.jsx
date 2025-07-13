import { useState, useEffect } from "react";
import { updateUserProfile } from "../../api/user";
import { toast } from "react-toastify";

export default function Profile({ user, setUser }) {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    name: "",
    email: "",
    rollno: "",
    dob: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        rollno: user.rollno || "",
        dob: user.dob || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await updateUserProfile(form, token);
      setUser(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));
      toast.success("✅ Profile updated successfully");
    } catch (err) {
      toast.error("❌ Failed to update profile");
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-xl w-full max-w-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">👤 Student Profile</h2>

      <label className="text-sm font-medium text-gray-700">Email (read-only)</label>
      <input
        type="email"
        name="email"
        value={form.email}
        disabled
        className="w-full p-2 border rounded mb-3 bg-gray-100 text-gray-600 cursor-not-allowed"
      />

      <label className="text-sm font-medium text-gray-700">Full Name</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <label className="text-sm font-medium text-gray-700">Roll Number</label>
      <input
        type="text"
        name="rollno"
        value={form.rollno}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <label className="text-sm font-medium text-gray-700">Date of Birth</label>
      <input
        type="date"
        name="dob"
        value={form.dob}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        💾 Save Profile
      </button>
    </div>
  );
}
