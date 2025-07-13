// src/components/admin/AdminProfile.jsx
import { useEffect, useState } from 'react';

export default function AdminProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    dob: '',
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user'));
    if (stored) setUser(stored);
  }, []);

  return (
    <div className="bg-white text-gray-800 rounded-xl p-6 shadow-md w-full ">
      <h2 className="text-2xl font-bold mb-4">👤 Admin Profile</h2>
      <div className="space-y-3">
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Role:</strong> {user.role}</div>
      </div>
    </div>
  );
}
