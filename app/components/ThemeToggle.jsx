'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMoon, FaLaptopCode, FaWater, 
  FaSun, FaChevronDown, FaBolt 
} from 'react-icons/fa';

const themes = [
  { 
    name: 'dark', 
    icon: <FaMoon />, 
    label: 'Dark'
  },
  { 
    name: 'cyberpunk', 
    icon: <FaLaptopCode />, 
    label: 'Cyberpunk'
  },
  { 
    name: 'ocean', 
    icon: <FaWater />, 
    label: 'Ocean'
  },
  { 
    name: 'sunset', 
    icon: <FaSun />, 
    label: 'Sunset'
  },
  { 
    name: 'synthwave', 
    icon: <FaBolt />, 
    label: 'Synthwave'
  }
];

const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Always start with dark theme if no theme is saved
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('theme', themeName);
    document.documentElement.setAttribute('data-theme', themeName);
    setIsOpen(false);
  };

  const currentThemeData = themes.find(theme => theme.name === currentTheme);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--neon-color)] text-[var(--text-color)] hover:bg-[var(--neon-color)] hover:text-[var(--button-text)] transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-xl text-[var(--neon-color)]">{currentThemeData.icon}</span>
        <span className="hidden sm:inline">{currentThemeData.label}</span>
        <FaChevronDown 
          className={`text-[var(--neon-color)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 rounded-lg border border-[var(--neon-color)] bg-[var(--card-bg)] shadow-lg overflow-hidden z-50"
          >
            {themes.map((theme) => (
              <motion.button
                key={theme.name}
                onClick={() => handleThemeChange(theme.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all
                  ${currentTheme === theme.name 
                    ? 'bg-[var(--neon-color)] text-[var(--button-text)]' 
                    : 'text-[var(--text-color)] hover:bg-[var(--neon-color)] hover:text-[var(--button-text)]'
                  }`}
                whileHover={{ x: 5 }}
              >
                <span className={`text-lg ${currentTheme === theme.name ? 'text-[var(--button-text)]' : 'text-[var(--neon-color)]'}`}>
                  {theme.icon}
                </span>
                <span>{theme.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;
