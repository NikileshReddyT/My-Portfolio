'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-scroll';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', to: 'home', offset: 0 },
    { name: 'Skills', to: 'skills', offset: -70 },
    { name: 'Projects', to: 'projects', offset: -70 },
    { name: 'Contact', to: 'contact', offset: -70 },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-[var(--card-bg)] shadow-lg' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="#home"
            className="text-[20px] xs:text-[22px] font-bold text-[var(--neon-color)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Nikilesh's Portfolio
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center gap-8 flex-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  bounce: 0.5,
                  duration: 0.5,
                  delay: index * 0.1
                }}
              >
                <Link
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={item.offset}
                  duration={150}
                  easing="linear"
                  className="cursor-pointer text-lg font-semibold text-[var(--text-color)] hover:text-[var(--neon-color)] transition-colors duration-200 ease-in-out"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-[var(--text-color)] hover:text-[var(--neon-color)] transition-colors"
            >
              {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -20,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
        className="md:hidden overflow-hidden backdrop-blur-lg"
      >
        <div className="px-4 py-3 space-y-3 bg-[var(--card-bg)] flex justify-center items-center flex-col shadow-lg">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <Link
                to={item.to}
                spy={true}
                smooth={true}
                offset={item.offset}
                duration={150}
                easing="linear"
                className="block px-4 py-2 rounded-lg text-[var(--text-color)] hover:text-[var(--neon-color)] hover:bg-[var(--hover-bg)] transition-all duration-200 text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
