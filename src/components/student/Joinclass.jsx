// src/components/student/JoinClass.jsx
import { useState } from 'react';
import { toast } from 'react-toastify';
import { joinClass, getStudentClasses } from '../../api/student';

export default function JoinClass({ setJoinedClasses }) {
  const [code, setCode] = useState('');
  const token = localStorage.getItem("token");

  const handleJoinClass = async () => {
    const trimmedCode = code.trim().toUpperCase();

    if (!trimmedCode || trimmedCode.length !== 6) {
      toast.error("❌ Please enter a valid 6-character class code");
      return;
    }

    try {
      await joinClass(trimmedCode, token);
      toast.success("✅ Class joined successfully");

      // Refresh class list
      const res = await getStudentClasses(token);
      setJoinedClasses(res);
      setCode('');
    } catch (err) {
      toast.error(`❌ ${err.response?.data?.message || "Failed to join class"}`);
    }
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
