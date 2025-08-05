"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaUser, FaSignInAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // In a real application, you would validate credentials against a database
    // For this example, we'll use a simple check
    if (credentials.username === 'admin' && credentials.password === 'password123') {
      // Set admin session (in a real app, this would be a secure token)
      localStorage.setItem('isAdmin', 'true');
      router.push('/admin');
    } else {
      setError('Invalid credentials. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <motion.div 
        className="max-w-md w-full neon-card rounded-xl p-8 border border-[var(--card-border)] bg-[var(--card-bg)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--heading-color)] mb-2">Admin Portal</h1>
          <p className="text-[var(--text-secondary)]">Secure Access Dashboard</p>
        </div>

        <div className="p-8">
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
                  name="username"
                  className="w-full pl-10 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] focus:border-[var(--neon-color)] focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] transition-colors text-[var(--text-color)]"
                  value={credentials.username}
                  onChange={handleChange}
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
                  name="password"
                  className="w-full pl-10 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] focus:border-[var(--neon-color)] focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] transition-colors text-[var(--text-color)]"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-500 text-center">
                {error}
              </div>
            )}

            <motion.button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-[var(--neon-color)] text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  <FaSignInAlt className="mr-2" /> Sign In
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center text-xs text-[var(--text-secondary)] border-t border-[var(--card-border)] pt-6">
            <p> 2025 Nikilesh Reddy. All rights reserved.</p>
            <p className="mt-1">Unauthorized access is prohibited.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
