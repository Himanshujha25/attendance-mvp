import { useEffect, useState } from 'react';
import { getStudentClasses, markAttendance, checkAttendance } from '../../api/student';
import { toast } from 'react-toastify';

export default function MyClasses() {
  const [joinedClasses, setJoinedClasses] = useState([]);
  const [attending, setAttending] = useState("");
  const [code, setCode] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchClassesAndAttendance = async () => {
      try {
        const classes = await getStudentClasses(token);
        setJoinedClasses(classes);

        const statusMap = {};
        for (const cls of classes) {
          const marked = await checkAttendance(cls.classId, token);
          statusMap[cls.classId] = marked;
        }
        setAttendanceStatus(statusMap);
      } catch (err) {
        toast.error("❌ Failed to load classes");
      }
    };

    fetchClassesAndAttendance();
  }, [token]);

  const handleMark = async () => {
    if (!code) {
      toast.warning("Please enter attendance code");
      return;
    }

    try {
      await markAttendance(code.trim().toUpperCase(), token);
      toast.success("✅ Attendance marked successfully");
      setCode("");
      setAttendanceStatus(prev => ({ ...prev, [attending]: true }));
      setAttending("");
    } catch (err) {
      toast.error(`❌ ${err.response?.data?.message || "Failed to mark attendance"}`);
    }
  };

  return (
    <div className="mt-10 bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">📚 My Classes</h2>

      {joinedClasses.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">You haven’t joined any classes yet.</p>
      ) : (
        <ul className="space-y-5">
          {joinedClasses.map((cls) => (
            <li
              key={cls._id}
              className="border border-gray-300 p-5 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-md transition"
            >
              <div className="text-left mb-3 md:mb-0">
                <p className="text-xl font-semibold text-gray-800">
                  {cls.subject} <span className="text-sm text-gray-500">({cls.code})</span>
                </p>
                <p className="text-gray-600 text-sm mt-1">👨‍🏫 Teacher: {cls.teacher}</p>
              </div>

              <button
                onClick={() => {
                  if (!attendanceStatus[cls.classId]) setAttending(cls.classId);
                }}
                disabled={attendanceStatus[cls.classId]}
                className={`px-6 py-2 rounded-lg font-medium ${
                  attendanceStatus[cls.classId]
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {attendanceStatus[cls.classId] ? "✅ Attendance Marked" : "🟢 Mark Attendance"}
              </button>
            </li>
          ))}
        </ul>
      )}

      {attending && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">⏳ Enter Attendance Code</h3>
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-2xl text-black"
          />
          <button
            onClick={handleMark}
            className="w-full bg-[#002147] hover:bg-[#003366] text-white py-3 rounded-xl font-semibold"
          >
            🔒 Submit Code
          </button>
        </div>
      )}
    </div>
  );
}
