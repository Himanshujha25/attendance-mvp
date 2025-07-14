import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createClass } from '../../api/class'; // adjust the path if needed
import Sidebar from '../admin/Sidebar';
import TopBar from '../admin/TopBar';

function Addclass() {
  const [form, setForm] = useState({
    subject: '',
    code: '',
    teacher: ''
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createClass(form, token);
      toast.success("✅ Class added successfully");
      setForm({ subject: '', code: '', teacher: '' });
    } catch (err) {
      toast.error(`❌ ${err.response?.data?.message || 'Failed to add class'}`);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "Admin";

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-sans text-blue-700 text-center mb-2">IMS NOIDA</h1>
        <TopBar name={name} />

        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">➕ Add New Class</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="subject"
              placeholder="Subject Name (e.g. Mathematics)"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              name="code"
              placeholder="Unique Class Code (e.g. MTH101)"
              value={form.code}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              name="teacher"
              placeholder="Teacher Name"
              value={form.teacher}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              💾 Create Class
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addclass;
