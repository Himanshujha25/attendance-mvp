import { useState } from "react";

export default function Sidebar({ onTabChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-5 left-2 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-[#002147] p-2 rounded-md focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-[#002147] text-white z-40 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:flex`}
      >
        <div className="flex flex-col justify-between h-full">
          {/* Top Section */}
          <div>
            <div className="p-5 border-b border-blue-900">
              <h1 className="text-2xl font-bold px-6">IMS Noida</h1>
              <p className="text-sm text-gray-300 px-6">Student Dashboard</p>
            </div>

            <nav className="mt-6 flex flex-col gap-4 px-4">
              <button
                onClick={() => {
                  onTabChange("profile");
                  setIsOpen(false);
                }}
                className="hover:text-blue-300 text-left"
              >
                👤 Profile
              </button>
              <button
                onClick={() => {
                  onTabChange("join");
                  setIsOpen(false);
                }}
                className="hover:text-blue-300 text-left"
              >
                ➕ Join Class
              </button>
              <button
                onClick={() => {
                  onTabChange("classes");
                  setIsOpen(false);
                }}
                className="hover:text-blue-300 text-left"
              >
                📚 My Classes
              </button>
            </nav>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-blue-900">
            <button
              onClick={handleLogout}
              className="w-full py-2 bg-red-600 rounded-xl hover:bg-red-700"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay when sidebar is open (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
