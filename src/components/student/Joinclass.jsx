// src/components/student/JoinClass.jsx
import { toast } from 'react-toastify';

const dummyClassCodes = {
  ECO2025: "Mr. Sharma",
  MATH101: "Ms. Verma",
  CS1101: "Dr. Gupta",
};

export default function JoinClass({ code, setCode, joinedClasses, setJoinedClasses }) {
 const handleJoinClass = () => {
  const upperCode = code.trim().toUpperCase();

  if (!dummyClassCodes[upperCode]) {
    return toast.error("Invalid class code");
  }

  if (joinedClasses.some(cls => cls.code === upperCode)) {
    return toast.warning("Already joined this class");
  }

  const updated = [
    ...joinedClasses,
    { code: upperCode, teacher: dummyClassCodes[upperCode], attendanceMarked: false }
  ];

  setJoinedClasses(updated);
  localStorage.setItem("joinedClasses", JSON.stringify(updated)); // Save it
  toast.success("Class joined");
  setCode('');
};


  return (
    <div className="bg-white text-black w-full max-w-md p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">➕ Join a Class</h2>
      <input
        type="text"
        placeholder="Class Code"
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
  );
}
