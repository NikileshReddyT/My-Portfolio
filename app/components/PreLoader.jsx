'use client';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import SplitText from './ui/SplitText';
import { useEffect, useState } from 'react';

const PreLoader = ({ onLoadingComplete, theme = 'sunset' }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
    const timer = setTimeout(() => {
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.5 }
      }}
      className={`fixed inset-0 z-[100] flex items-center justify-center ${theme === 'sunset' ? 'bg-[var(--card-bg)]' : 'bg-[var(--light-card-bg)]'}`}
      data-theme={theme}
    >
      <div className="flex flex-col items-center gap-8">
                        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{ duration: 0.5 }}
          className="neon-card p-12 rounded-xl relative overflow-hidden flex items-baseline"
        >
          {/* Animated Border Lines */}
          <div className="absolute inset-x-0 top-0 h-[2px] animate-border-flow bg-gradient-to-r from-transparent via-[var(--neon-color)] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[2px] animate-border-flow-reverse bg-gradient-to-r from-transparent via-[var(--neon-color)] to-transparent" />
          <div className="absolute inset-y-0 left-0 w-[2px] animate-border-flow-down bg-gradient-to-b from-transparent via-[var(--neon-color)] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-[2px] animate-border-flow-up bg-gradient-to-b from-transparent via-[var(--neon-color)] to-transparent" />

          {/* Logo */}
          <motion.div layoutId="preloader-N" className="text-6xl font-bold text-[var(--neon-color)]">
            N
          </motion.div>
          <motion.div className="text-6xl font-bold text-[var(--neon-color)]">
            R
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="h-8"
        >
          <TypeAnimation
            sequence={[
              'LOADING',
              1000,
              'INITIALIZING',
              1000,
              'PREPARING',
              1000,
            ]}
            wrapper="span"
            speed={50}
            className="text-[var(--neon-color)] font-mono text-lg tracking-wider"
            style={{ textShadow: '0 0 5px var(--neon-color)' }}
            repeat={0}
          />
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut"
          }}
          className="w-48 h-[2px] origin-left bg-gradient-to-r from-transparent via-[var(--neon-color)] to-transparent"
          style={{ boxShadow: '0 0 10px var(--neon-color)' }}
        />
      </div>
    </motion.div>
  );
};

export default PreLoader;
