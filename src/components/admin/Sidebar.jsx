// src/components/AdminSidebar.jsx
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AdminSidebar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleDateString();

  return (
    <div className="w-64 bg-[#002147] text-white min-h-screen p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6">🛠 Admin Panel</h2>

        <nav className="space-y-4">
          <NavLink to="/admin/dashboard" className="block hover:text-blue-300">
            👤 Profile
          </NavLink>
          <NavLink to="/admin/classes" className="block hover:text-blue-300">
            🏫 Manage Classes
          </NavLink>
          <NavLink to="/admin/addclass" className="block hover:text-blue-300">
            ➕ Add New Class
          </NavLink>
          <NavLink to="/admin/generate-code" className="block hover:text-blue-300">
            🔐 Generate Code
          </NavLink>
          <NavLink to="/admin/reports" className="block hover:text-blue-300">
            📁 Attendance Reports
          </NavLink>
        </nav>
      </div>

      <div className="mt-6 text-sm text-gray-300">
        <div className="mb-4">⏰ {formattedTime}</div>
        <NavLink to="/" className="block hover:text-red-300">
          🔓 Logout
        </NavLink>
      </div>
    </div>
  );
}
