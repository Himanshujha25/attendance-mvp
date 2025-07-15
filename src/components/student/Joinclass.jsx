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

      const res = await getStudentClasses(token);
      setJoinedClasses(res);
      setCode('');
    } catch (err) {
      toast.error(` ${err.response?.data?.message || "Failed to join class"}`);
    }
  };

  return (
    <div className="bg-white text-black w-full max-w-lg mx-auto p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">➕ Join a Class</h2>

      <input
        type="text"
        placeholder="Enter 6-digit Class Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
      />

      <button
        onClick={handleJoinClass}
        className="w-full bg-[#002147] hover:bg-[#003366] text-white py-3 rounded-xl font-semibold transition-all"
      >
        🚀 Join Class
      </button>
    </div>
  );
}
