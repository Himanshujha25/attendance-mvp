import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Sidebar from '../admin/Sidebar';
import TopBar from '../admin/TopBar';

export default function GenerateCode() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [code, setCode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const name = user?.name || "Admin";

  // 👉 Fetch classes created by this teacher
  const fetchClasses = async () => {
    try {
      const res = await axios.get("https://attendance-mvp-1.onrender.com/api/class/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Filter only this teacher's classes
      const teacherClasses = res.data.filter(c => c.teacher === user.name);
      setClasses(teacherClasses);
    } catch (err) {
      toast.error("❌ Failed to load classes");
    }
  };

  const generateCode = async () => {
    if (!selectedClass) {
      toast.warn("⚠️ Please select a class first");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        'https://attendance-mvp-1.onrender.com/api/attendance/generate',
        {
          subject: selectedClass.subject,
          code: selectedClass.code,
          teacher: selectedClass.teacher
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCode(res.data.code);
      setTimeLeft(60);
      toast.success(`✅ Code generated for ${selectedClass.subject}`);
    } catch (err) {
      toast.error(`❌ ${err.response?.data?.message || 'Failed to generate code'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 || !code) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, code]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">IMS NOIDA</h1>
        <TopBar name={name} />

        <div className="bg-white p-8 rounded-xl shadow-md max-w-md mx-auto mt-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">🎯 Generate Attendance Code</h2>

          {/* Dropdown for class selection */}
          <select
            value={selectedClass.code || ''}
            onChange={(e) =>
              setSelectedClass(classes.find(c => c.code === e.target.value))
            }
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">-- Select a Class --</option>
            {classes.map(cls => (
              <option key={cls._id} value={cls.code}>
                {cls.subject} ({cls.code})
              </option>
            ))}
          </select>

          <button
            onClick={generateCode}
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading || timeLeft > 0}
          >
            {loading ? 'Generating...' : '➕ Generate Code'}
          </button>

          {code && (
            <div className="mt-6">
              <p className="text-lg font-medium">✅ Attendance Code:</p>
              <div className="text-3xl font-bold text-green-700 my-2">{code}</div>
              <p className="text-gray-600">⏳ Expires in: {timeLeft}s</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
