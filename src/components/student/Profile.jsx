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
      toast.success(" Profile updated successfully");
    } catch (err) {
      toast.error("❌ Failed to update profile");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-md px-6 py-10 text-black">
      <h2 className="text-2xl font-semibold text-center text-[#002147] mb-4">👤 Student Profile</h2>

      <div className="space-y-3">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            disabled
            className="w-full px-3 py-2 border bg-gray-100 text-gray-500 rounded-md text-sm"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
          />
        </div>

        {/* Roll Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Roll Number</label>
          <input
            type="text"
            name="rollno"
            value={form.rollno}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSubmit}
        className="mt-5 w-full bg-[#002147] text-white py-2 rounded-md text-sm font-medium hover:bg-[#003366] transition"
      >
        💾 Save Changes
      </button>
    </div>
  );
}
