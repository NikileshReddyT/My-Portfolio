'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-scroll';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', to: 'home', offset: 0 },
    { name: 'Education', to: 'education', offset: -100 },
    { name: 'Experience', to: 'experience', offset: -60 },
    { name: 'Skills', to: 'skills', offset: -50 },
    { name: 'Projects', to: 'projects', offset: -70 },
    { name: 'Contact', to: 'contact', offset: -150 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSetActive = (to) => {
    setActiveSection(to);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-[#0014284d] shadow-lg' : ''
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="text-[20px] xs:text-[22px] font-bold text-[var(--neon-color)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              offset={0}
              className="cursor-pointer"
              onSetActive={handleSetActive}
            >
              Nikilesh's Portfolio
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                spy={true}
                smooth={true}
                offset={item.offset + 20}
                duration={500}
                onSetActive={handleSetActive}
                className={`cursor-pointer text-[var(--text-color)] hover:text-[var(--neon-color)] transition-colors font-bold ${activeSection === item.to ? '!text-[var(--neon-color)] font-black' : ''
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-[var(--text-color)] hover:text-[var(--neon-color)] transition-colors"
            >
              {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : -20,
            display: isOpen ? 'block' : 'none',
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
          className="lg:hidden backdrop-blur-md"
        >
          <motion.div
            className="px-2 pt-2 pb-3 space-y-8 sm:px-3 bg-[#0014284d] flex flex-col justify-center items-center"
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: {
                clipPath: "inset(0% 0% 0% 0% round 10px)",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.7,
                  delayChildren: 0.3,
                  staggerChildren: 0.05
                }
              },
              closed: {
                clipPath: "inset(10% 50% 90% 50% round 10px)",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.3
                }
              }
            }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                variants={{
                  open: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 300, damping: 24 }
                  },
                  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
                }}
              >
                <Link
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={item.offset}
                  duration={500}
                  onSetActive={handleSetActive}
                  className="cursor-pointer block text-[var(--text-color)] hover:text-[var(--neon-color)] transition-all font-medium transform hover:scale-110 px-4 py-2 rounded-md hover:bg-[var(--hover-bg)]"
                  activeClass="!text-[var(--neon-color)] font-black text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
