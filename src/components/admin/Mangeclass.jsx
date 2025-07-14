import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../admin/Sidebar';
import TopBar from '../admin/TopBar';
import { getAllClasses, deleteClassByCode } from '../../api/class';

export default function Mangeclass() {
  const [classes, setClasses] = useState([]);
  const token = localStorage.getItem("token");

  const fetchClasses = async () => {
    try {
      const res = await getAllClasses(token);
      setClasses(res);
    } catch (err) {
      toast.error("❌ Failed to fetch classes");
    }
  };

  const handleDelete = async (code) => {
    if (!window.confirm(`Are you sure you want to delete class ${code}?`)) return;

    try {
      await deleteClassByCode(code, token);
      toast.success(`🗑️ Class ${code} deleted successfully`);
      setClasses(classes.filter(cls => cls.code !== code));
    } catch (err) {
      toast.error("❌ Failed to delete class");
    }
  };

  const name = JSON.parse(localStorage.getItem("user"))?.name || "Admin";

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">IMS NOIDA</h1>
        <TopBar name={name} />

        <div className="mt-10 bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-4 text-blue-800">📚 All Classes</h2>

          {classes.length === 0 ? (
            <p className="text-center text-gray-500">No classes available.</p>
          ) : (
            <table className="w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Subject</th>
                  <th className="p-2 border">Code</th>
                  <th className="p-2 border">Teacher</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls) => (
                  <tr key={cls._id} className="text-center">
                    <td className="p-2 border">{cls.subject}</td>
                    <td className="p-2 border">{cls.code}</td>
                    <td className="p-2 border">{cls.teacher}</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleDelete(cls.code)}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
