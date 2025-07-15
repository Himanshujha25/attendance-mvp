import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Menu, X } from 'lucide-react';
import Sidebar from '../admin/Sidebar';
import TopBar from '../admin/TopBar';
import { getAllClasses, deleteClassByCode } from '../../api/class';

export default function Mangeclass() {
  const [classes, setClasses] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");
  const name = JSON.parse(localStorage.getItem("user"))?.name || "Admin";

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await getAllClasses(token);
        setClasses(res);
      } catch (err) {
        toast.error("❌ Failed to fetch classes");
      }
    };
    fetchClasses();
  }, []);

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

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg transition-transform duration-300 transform lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar />
      </div>

      {/* Overlay when sidebar is open (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar toggle button */}
      <button
        className="fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md lg:hidden"
        onClick={() => setSidebarOpen(prev => !prev)}
      >
        {sidebarOpen ? <X className="w-6 h-6 text-[#002147]" /> : <Menu className="w-6 h-6 text-[#002147]" />}
      </button>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 p-4 sm:p-6 w-full">
        <h1 className="text-xl sm:text-3xl font-bold text-center text-blue-700 mb-4">IMS NOIDA</h1>
        <TopBar name={name} />

        <div className="mt-6 bg-white p-4 sm:p-6 rounded-xl shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 text-blue-800">📚 All Classes</h2>

          {classes.length === 0 ? (
            <p className="text-center text-gray-500">No classes available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[600px] w-full text-sm sm:text-base border border-gray-300">
                <thead className="bg-gray-200 text-gray-800">
                  <tr>
                    <th className="p-3 border">Subject</th>
                    <th className="p-3 border">Code</th>
                    <th className="p-3 border">Teacher</th>
                    <th className="p-3 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((cls) => (
                    <tr key={cls._id} className="text-center hover:bg-gray-50">
                      <td className="p-3 border">{cls.subject}</td>
                      <td className="p-3 border">{cls.code}</td>
                      <td className="p-3 border">{cls.teacher}</td>
                      <td className="p-3 border">
                        <button
                          onClick={() => handleDelete(cls.code)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm transition-all"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
