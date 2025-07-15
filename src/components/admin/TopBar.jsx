export default function TopBar({ name }) {
  return (
    <div className="bg-white p-4 shadow-md rounded-xl mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-1">
      <h1 className="text-xl sm:text-2xl font-semibold text-[#002147] text-center sm:text-left">
        🎓 <span className="text-[#004080]">Admin Dashboard</span> – Attendance Made Easy
      </h1>

      <div className="text-gray-700 text-center sm:text-right text-base sm:text-lg">
        👋 Hello, <span className="font-bold text-[#002147]">{name}</span>
      </div>
    </div>
  );
}
