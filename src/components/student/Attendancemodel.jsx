// src/components/student/AttendanceModal.jsx
export default function AttendanceModal({
  showModal,
  onClose,
  onSubmit,
  attendanceCodeInput,
  setAttendanceCodeInput
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-sm sm:max-w-md p-6 rounded-2xl shadow-xl text-black">
        <h3 className="text-xl font-semibold text-center mb-4 text-[#002147]">
          🔐 Enter Attendance Code
        </h3>

        <input
          type="text"
          value={attendanceCodeInput}
          onChange={(e) => setAttendanceCodeInput(e.target.value)}
          placeholder="Enter today's code"
          className="w-full p-3 border border-gray-300 rounded-xl mb-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-xl transition-all"
          >
            ❌ Cancel
          </button>
          <button
            onClick={onSubmit}
            className="w-full sm:w-1/2 bg-[#002147] hover:bg-[#003366] text-white py-2 rounded-xl transition-all"
          >
            ✅ Submit
          </button>
        </div>
      </div>
    </div>
  );
}
