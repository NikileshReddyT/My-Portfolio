"use client";

import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-color)] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl text-center neon-card p-8 rounded-xl border border-[var(--card-border)]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-[var(--neon-color)] mb-4">
            404
          </h1>
          <h2 className="text-4xl font-bold mb-6 text-[var(--heading-color)]">Page Not Found</h2>
          <p className="text-xl mb-8 text-[var(--text-secondary)]">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>
        
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link 
            href="/"
            className="flex items-center justify-center px-6 py-3 bg-[var(--neon-color)] text-[var(--button-text)] rounded-lg font-medium hover:opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            <FaHome className="mr-2" />
            Back to Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center px-6 py-3 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg font-medium text-[var(--text-color)] hover:bg-[var(--card-hover)] transition-all duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
        </motion.div>
        
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="neon-card p-6 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]">
            <h3 className="text-xl font-bold mb-3 text-[var(--heading-color)]">Need Help?</h3>
            <p className="mb-4 text-[var(--text-secondary)]">
              If you believe this is an error, please contact me directly.
            </p>
            <a 
              href="mailto:nikileshreddyt@gmail.com" 
              className="text-[var(--neon-color)] hover:opacity-80 transition-colors"
            >
              nikileshreddyt@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
