// src/components/student/ClassList.jsx
export default function ClassList({ joinedClasses, openAttendanceModal }) {
  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-xl font-semibold text-center mb-2">📚 Your Classes</h2>
      {joinedClasses.length === 0 ? (
        <div className="bg-white text-black p-4 rounded-xl shadow-md text-center">
          No classes joined yet.
        </div>
      ) : (
        joinedClasses.map((cls) => (
          <div
            key={cls.code}
            className="bg-white text-black p-4 rounded-xl shadow-md text-center"
          >
            <p className="text-lg font-semibold">{cls.code} - {cls.teacher}</p>
            <button
              disabled={cls.attendanceMarked}
              onClick={() => openAttendanceModal(cls.code)}
              className={`mt-2 text-xl px-4 py-2 rounded-xl text-white ${
                cls.attendanceMarked ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {cls.attendanceMarked ? '✅ Marked' : 'Mark Attendance'}
            </button>
          </div>
        ))
      )}
    </div>
  );
}
