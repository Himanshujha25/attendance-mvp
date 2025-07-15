// src/components/AdminSidebar.jsx
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react'; // icon library (Tailwind-friendly)

export default function AdminSidebar() {
  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleDateString();

  const navLinkStyle = 'block px-4 py-2 rounded hover:bg-blue-900 transition';

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="bg-[#002147] text-white p-4 sm:hidden flex justify-between items-center">
        <h2 className="text-xl font-bold">🛠 Admin Panel</h2>
        <button onClick={() => setOpen(!open)} className="text-white">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed sm:relative top-0 left-0 h-screen bg-[#002147] text-white w-64 p-6 flex flex-col justify-between transition-transform duration-300 z-50
        ${open ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
      >
        {/* Top Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 hidden sm:block">🛠 Admin Panel</h2>

          <nav className="space-y-2 text-md">
            <NavLink to="/admin/dashboard" className={navLinkStyle}>
              👤 Profile
            </NavLink>
            <NavLink to="/admin/classes" className={navLinkStyle}>
              🏫 Manage Classes
            </NavLink>
            <NavLink to="/admin/addclass" className={navLinkStyle}>
              ➕ Add New Class
            </NavLink>
            <NavLink to="/admin/generate-code" className={navLinkStyle}>
              🔐 Generate Code
            </NavLink>
            <NavLink to="/admin/reports" className={navLinkStyle}>
              📁 Attendance Reports
            </NavLink>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="text-md text-gray-300 mt-6">
          <div className="mb-3">⏰ {formattedTime}</div>
          <NavLink
            to="/"
            className="block hover:text-red-300"
            onClick={() => localStorage.clear()}
          >
            🔓 Logout
          </NavLink>
        </div>
      </div>
    </>
  );
}
