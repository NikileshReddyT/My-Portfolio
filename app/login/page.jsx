"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would be an API call to authenticate
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('adminToken', 'admin-token-123');
      router.push('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-12">
      <motion.div 
        className="max-w-md w-full neon-card rounded-xl p-8 border border-[var(--card-border)] bg-[var(--card-bg)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--heading-color)] mb-2">Admin Login</h1>
          <p className="text-[var(--text-secondary)]">Sign in to access the admin panel</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-500 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-[var(--text-color)] font-medium mb-2">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-[var(--text-secondary)]" />
              </div>
              <input
                type="text"
                id="username"
                className="w-full pl-10 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] focus:border-[var(--neon-color)] focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] transition-colors text-[var(--text-color)]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-[var(--text-color)] font-medium mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-[var(--text-secondary)]" />
              </div>
              <input
                type="password"
                id="password"
                className="w-full pl-10 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] focus:border-[var(--neon-color)] focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] transition-colors text-[var(--text-color)]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 bg-[var(--neon-color)] text-[var(--button-text)] rounded-lg font-medium hover:opacity-90 transition-all duration-300"
          >
            <FaSignInAlt className="mr-2" />
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          <p>Demo credentials: admin / password</p>
        </div>
      </motion.div>
    </div>
  );
}
