// src/components/student/AttendanceModal.jsx
export default function AttendanceTable({ showModal, onClose, onSubmit, attendanceCodeInput, setAttendanceCodeInput }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-80 text-black">
        <h3 className="text-lg font-bold mb-4 text-center">🔐 Attendance Code</h3>
        <input
          type="text"
          value={attendanceCodeInput}
          onChange={(e) => setAttendanceCodeInput(e.target.value)}
          placeholder="Enter today's code"
          className="w-full p-2 border rounded-xl mb-4"
        />
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-xl hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-[#002147] text-white px-4 py-2 rounded-xl hover:bg-[#003366]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
