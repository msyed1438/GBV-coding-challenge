'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');  // Dummy password field
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'admin') {
      router.push('/admin');  // Redirect to admin panel if "admin"
    } else if (username === 'user') {
      router.push('/questionnaires?userId=1');  // Redirect to questionnaires page
    } else {
      alert('Invalid username');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"  // Dummy password input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
