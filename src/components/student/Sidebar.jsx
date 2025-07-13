// src/components/Sidebar.jsx
export default function Sidebar({ onTabChange }) {
  return (
    <div className="h-screen w-60 bg-[#002147] text-white fixed top-0 left-0 flex flex-col justify-between shadow-lg">
      {/* Top Logo */}
      <div>
        <div className="p-5 border-b border-blue-900">
          <h1 className="text-2xl font-bold">IMS Noida</h1>
          <p className="text-sm text-gray-300">Student Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col gap-4 px-4">
          <button onClick={() => onTabChange('profile')} className="hover:text-blue-300 text-left">👤 Profile</button>
          <button onClick={() => onTabChange('join')} className="hover:text-blue-300 text-left">➕ Join Class</button>
          <button onClick={() => onTabChange('classes')} className="hover:text-blue-300 text-left">📚 My Classes</button>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-blue-900">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="w-full py-2 bg-red-600 rounded-xl hover:bg-red-700"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
