'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const SimpleNavbar = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-6 sm:px-8 md:px-12 backdrop-blur-lg bg-black/50 border-b border-white/10 shadow-lg"
    >
      <motion.div
        whileHover={{ scale: 1.05, textShadow: '0 0 8px var(--neon-color)' }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/" className="text-2xl font-bold text-[var(--neon-color)] hover:text-white transition-all duration-300">
          Nikilesh's Portfolio
        </Link>
      </motion.div>
      <ThemeToggle />
    </motion.header>
  );
};

export default SimpleNavbar;
