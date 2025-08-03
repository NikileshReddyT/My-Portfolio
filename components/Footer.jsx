'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full border-t border-[var(--neon-color)] border-opacity-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-6"
      >
        <p className="text-center text-[var(--text-color)]">
          Developed in{' '}
          <span className="font-semibold text-[var(--neon-color)]">
            Next.js
          </span>{' '}
          by{' '}
          <span className="font-semibold text-[var(--neon-color)]">
            Nikilesh Reddy T
          </span>{' '}
          with{' '}
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
              color: ['var(--neon-color)', '#ff0000', 'var(--neon-color)']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block"
          >
            <FaHeart className="inline-block w-4 h-4" />
          </motion.span>
        </p>
        <div className="text-center mt-4">
          <Link href="/admin" className="text-sm text-gray-400 hover:text-[var(--neon-color)] transition-colors">
            Admin
          </Link>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
