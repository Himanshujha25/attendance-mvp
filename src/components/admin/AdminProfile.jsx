import { useEffect, useState } from 'react';
import { User, Mail, Shield, Calendar } from 'lucide-react';

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
    <div className="bg-white text-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg w-full max-w-xl mx-auto mt-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-700">
        👤 Admin Profile
      </h2>

      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <User className="text-blue-600 w-5 h-5" />
          <span className="font-semibold">Name:</span>
          <span className="truncate">{user.name}</span>
        </div>

        <div className="flex items-center gap-4">
          <Mail className="text-blue-600 w-5 h-5" />
          <span className="font-semibold">Email:</span>
          <span className="truncate">{user.email}</span>
        </div>

        <div className="flex items-center gap-4">
          <Shield className="text-blue-600 w-5 h-5" />
          <span className="font-semibold">Role:</span>
          <span className="capitalize">{user.role}</span>
        </div>

        {user.dob && (
          <div className="flex items-center gap-4">
            <Calendar className="text-blue-600 w-5 h-5" />
            <span className="font-semibold">DOB:</span>
            <span>{user.dob}</span>
          </div>
        )}
      </div>
    </div>
  );
}
