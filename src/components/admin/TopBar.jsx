export default function TopBar({name}) {
  return (
    <div className="bg-white p-4 shadow-md rounded-xl mb-6 flex justify-between items-center mt-1 ">
      <h1 className="text-2xl font-semibold text-[#002147]">📋 Attendance Management Portal (Admin)</h1>
      <div className="text-gray-700 text-2xl">
        Welcome, <strong>{name}</strong>
      </div>
    </div>
  );
}
