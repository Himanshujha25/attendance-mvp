import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createClass } from '../../api/class';
import Sidebar from '../admin/Sidebar';
import TopBar from '../admin/TopBar';
import { Menu, X } from 'lucide-react';

function Addclass() {
  const [form, setForm] = useState({
    subject: '',
    code: '',
    teacher: ''
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "Admin";

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

  return (
    <div className="flex bg-gray-100 min-h-screen relative">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg transition-transform duration-300 transform lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar />
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md lg:hidden"
        onClick={() => setSidebarOpen(prev => !prev)}
      >
        {sidebarOpen ? <X className="w-6 h-6 text-[#002147]" /> : <Menu className="w-6 h-6 text-[#002147]" />}
      </button>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 p-4 sm:p-6 w-full">
        {/* Header */}
        <h1 className="text-xl sm:text-3xl font-bold text-center text-blue-700 mb-4">IMS NOIDA</h1>
        <TopBar name={name} />

        {/* Add Class Form */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md max-w-xl mx-auto mt-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">➕ Add New Class</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="subject"
              placeholder="Subject Name (e.g. Mathematics)"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />

            <input
              type="text"
              name="code"
              placeholder="Unique Class Code (e.g. MTH101)"
              value={form.code}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />

            <input
              type="text"
              name="teacher"
              placeholder="Teacher Name"
              value={form.teacher}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
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
