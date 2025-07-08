import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

const dummyClassCodes = {
  ECO2025: "Mr. Sharma",
  MATH101: "Ms. Verma",
  CS1101: "Dr. Gupta",
};

export default function StudentHome() {
  const [selectedTab, setSelectedTab] = useState("profile");
  const [user, setUser] = useState({ name: '', email: '', role: '', rollNo: '' });
  const [code, setCode] = useState('');
  const [joinedClasses, setJoinedClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClassCode, setSelectedClassCode] = useState(null);
  const [attendanceCodeInput, setAttendanceCodeInput] = useState('');
  const [password, setPassword] = useState('');
  const todayCode = "IMS2025";

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user'));
    if (u) setUser(u);
  }, []);

  const handleJoinClass = () => {
    const upperCode = code.trim().toUpperCase();
    if (!dummyClassCodes[upperCode]) return toast.error("❌ Invalid class code");
    if (joinedClasses.some(cls => cls.code === upperCode))
      return toast.warning("⚠️ Already joined");

    setJoinedClasses(prev => [
      ...prev,
      { code: upperCode, teacher: dummyClassCodes[upperCode], attendanceMarked: false },
    ]);
    toast.success(" Class joined successfully");
    setCode('');
  };

  const openAttendanceModal = (classCode) => {
    setSelectedClassCode(classCode);
    setAttendanceCodeInput('');
    setShowModal(true);
  };

  const handleVerifyCode = () => {
    if (attendanceCodeInput !== todayCode) return toast.error("❌ Invalid or expired code");

    const updated = joinedClasses.map((cls) =>
      cls.code === selectedClassCode ? { ...cls, attendanceMarked: true } : cls
    );
    setJoinedClasses(updated);
    setShowModal(false);

    const attendanceData = {
      name: user.name,
      email: user.email,
      rollNo: user.rollNo,
      classCode: selectedClassCode,
      date: new Date().toLocaleDateString(),
    };
    console.log("📩 Send to Admin:", attendanceData);
    toast.success(" Attendance marked & sent");
  };

 const handleProfileUpdate = () => {
  const updatedUser = { ...user };
  if (password) {
    updatedUser.password = password;
  }

  // Check age
  const dob = new Date(user.dob);
  const age = new Date().getFullYear() - dob.getFullYear();
  if (age < 18) {
    return toast.error("User must be at least 18 years old.");
  }

  localStorage.setItem('user', JSON.stringify(updatedUser));
  setPassword('');
  toast.success("Profile updated successfully!");
  console.log(user)
};


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#002147] to-[#004080] text-white">
      <Sidebar onTabChange={setSelectedTab} />

      <div className="ml-60 w-full p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2">🎓 Welcome, {user.name}</h1>
        <p className="mb-6 text-sm text-gray-200">📅 {today}</p>

        {selectedTab === "profile" && (
  <div className="bg-white text-black w-full max-w-md p-6 rounded-2xl shadow-lg space-y-4">
    <h2 className="text-2xl font-bold text-center mb-2">👤 Profile Details</h2>

    {/* Profile Image */}
    <div className="flex justify-center">
      <label className="cursor-pointer relative group">
        <img
          src={user.profileImage || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-[#002147] shadow-md"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () =>
                setUser({ ...user, profileImage: reader.result });
              reader.readAsDataURL(file);
            }
          }}
        />
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#002147] text-white px-2 text-xs rounded opacity-0 group-hover:opacity-100 transition">
          Change
        </span>
      </label>
    </div>

    {/* Name */}
    <input
      type="text"
      placeholder="Full Name"
      className="w-full border p-2 rounded-xl"
      value={user.name}
      onChange={(e) => setUser({ ...user, name: e.target.value })}
    />

    {/* Email (read-only) */}
    <input
      type="email"
      value={user.email}
      readOnly
      className="w-full bg-gray-100 border p-2 rounded-xl text-gray-600 cursor-not-allowed"
    />

    {/* Roll No */}
    <input
      type="text"
      placeholder="Roll Number"
      className="w-full border p-2 rounded-xl"
      value={user.rollNo}
      onChange={(e) => setUser({ ...user, rollNo: e.target.value })}
    />

    {/* Date of Birth */}
    <input
      type="date"
      className="w-full border p-2 rounded-xl"
      value={user.dob || ''}
      onChange={(e) => {
        const dob = new Date(e.target.value);
        const age = new Date().getFullYear() - dob.getFullYear();
        if (age < 18) {
          toast.error("You must be 18 or older.");
        } else {
          setUser({ ...user, dob: e.target.value });
        }
      }}
    />

    {/* New Password */}
    <input
      type="password"
      placeholder="New Password (optional)"
      className="w-full border p-2 rounded-xl"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      onClick={handleProfileUpdate}
      className="w-full bg-[#002147] text-white py-2 rounded-xl hover:bg-[#003366]"
    >
      Save Profile
    </button>
  </div>
)}


        {selectedTab === "join" && (
          <div className="bg-white text-black w-full max-w-md p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">➕ Join a Class</h2>
            <input
              type="text"
              placeholder="Class Code (e.g. ECO2025)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border rounded-xl mb-2"
            />
            <button
              onClick={handleJoinClass}
              className="w-full bg-[#002147] text-white py-2 rounded-xl hover:bg-[#003366]"
            >
              Join
            </button>
          </div>
        )}

        {selectedTab === "classes" && (
          <div className="w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold text-center mb-2">📚 Your Classes</h2>

            {joinedClasses.length === 0 ? (
              <div className="bg-white text-black p-4 rounded-xl shadow-md text-center">
                You haven't joined any classes yet.
              </div>
            ) : (
              joinedClasses.map((cls) => (
                <div
                  key={cls.code}
                  className="bg-white text-black p-4 rounded-xl shadow-md flex flex-col items-center"
                >
                  <p className="text-lg font-semibold">{cls.code} - {cls.teacher}</p>
                  <button
                    onClick={() => openAttendanceModal(cls.code)}
                    disabled={cls.attendanceMarked}
                    className={`mt-2 text-xl px-4 py-2 rounded-xl text-white ${
                      cls.attendanceMarked
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {cls.attendanceMarked ? "✅ Marked" : "Mark Attendance"}
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Attendance Modal */}
        {showModal && (
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
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded-xl hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerifyCode}
                  className="bg-[#002147] text-white px-4 py-2 rounded-xl hover:bg-[#003366]"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
