import { useEffect, useState } from 'react';
import Sidebar from '../components/student/Sidebar';
import Profile from '../components/student/Profile';
import JoinClass from '../components/student/Joinclass';
import ClassList from '../components/student/Classlist';
import AttendanceModal from '../components/student/Attendancemodel';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from '../api/user'; // ⬅️ Import this API call

export default function StudentHome() {
  const [selectedTab, setSelectedTab] = useState("profile");
  const [user, setUser] = useState({ name: '', email: '', role: '', rollNo: '', dob: '', });
  const [code, setCode] = useState('');
  const [joinedClasses, setJoinedClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClassCode, setSelectedClassCode] = useState(null);
  const [attendanceCodeInput, setAttendanceCodeInput] = useState('');

  const date = new Date();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      return navigate("/login");
    }

    if (storedUser.role !== "student") {
      return navigate("/admin/dashboard");
    }

    setUser(storedUser);

    const storedClasses = JSON.parse(localStorage.getItem("joinedClasses"));
    if (storedClasses) setJoinedClasses(storedClasses);
  }, []);

  // ✅ Profile update function
  const handleProfileUpdate = async (updatedUserData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await updateUserProfile(updatedUserData, token);
      setUser(response.user); // update local state
      localStorage.setItem("user", JSON.stringify(response.user)); // update localStorage
      toast.success("✅ Profile updated successfully");
    } catch (error) {
      toast.error("❌ Failed to update profile");
    }
  };

  const openAttendanceModal = (classCode) => {
    setSelectedClassCode(classCode);
    setAttendanceCodeInput('');
    setShowModal(true);
  };

  const handleVerifyCode = () => {
    if (attendanceCodeInput !== todayCode) {
      return toast.error("Invalid attendance code");
    }

    const updated = joinedClasses.map(cls =>
      cls.code === selectedClassCode ? { ...cls, attendanceMarked: true } : cls
    );

    setJoinedClasses(updated);
    localStorage.setItem("joinedClasses", JSON.stringify(updated));
    setShowModal(false);

    toast.success("Attendance marked & saved");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#002147] to-[#004080] text-white">
      <Sidebar onTabChange={setSelectedTab} />
      <div className="ml-60 w-full p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2">🎓 Welcome, {user.name}</h1>
        <h3 className='py-2'>{date.toLocaleString()}</h3>

        {selectedTab === 'profile' && (
          <Profile user={user} setUser={setUser} onSave={handleProfileUpdate} />
        )}

        {selectedTab === 'join' && (
          <JoinClass
            code={code}
            setCode={setCode}
            joinedClasses={joinedClasses}
            setJoinedClasses={setJoinedClasses}
          />
        )}

        {selectedTab === 'classes' && (
          <ClassList
            joinedClasses={joinedClasses}
            openAttendanceModal={openAttendanceModal}
          />
        )}

        <AttendanceModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleVerifyCode}
          attendanceCodeInput={attendanceCodeInput}
          setAttendanceCodeInput={setAttendanceCodeInput}
        />
      </div>
    </div>
  );
}
