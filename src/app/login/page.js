'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');  // Dummy password field
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'admin') {
      router.push('/admin');
    } else if (username === 'user') {
      router.push('/questionnaires?userId=1');
    } else {
      alert('Invalid username');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700">Login</h1>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mt-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-4 border rounded-lg"
          />
          <button
            onClick={handleLogin}
            className="w-full mt-6 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
