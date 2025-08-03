'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLaptopCode, FaWater, 
  FaSun, FaChevronDown, FaLeaf,
  FaFire
} from 'react-icons/fa';

const themes = [
  { 
    name: 'sunset', 
    icon: <FaSun />, 
    label: 'Sunset'
  },
  { 
    name: 'dark', 
    icon: <FaFire />, 
    label: 'Crimson'
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
    name: 'synthwave', 
    icon: <FaLeaf />, 
    label: 'Amber'
  }
];

const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState('sunset');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Always start with sunset theme if no theme is saved
    const savedTheme = localStorage.getItem('theme') || 'sunset';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('theme', themeName);
    document.documentElement.setAttribute('data-theme', themeName);
    setIsOpen(false);
  };

  // Added fallback to prevent undefined error
  const currentThemeData = themes.find(theme => theme.name === currentTheme) || themes[0];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-black/80 backdrop-blur-sm border border-[var(--neon-color)] text-[var(--text-color)] hover:bg-[var(--neon-color)] hover:text-[var(--button-text)]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-xl text-[var(--neon-color)] group-hover:text-[var(--button-text)]">{currentThemeData.icon}</span>
        <span className="hidden sm:inline">{currentThemeData.label}</span>
        <FaChevronDown 
          className={`text-[var(--neon-color)] group-hover:text-[var(--button-text)] ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 rounded-lg border border-[var(--neon-color)] bg-black/80 backdrop-blur-sm shadow-lg overflow-hidden z-50"
          >
            {themes.map((theme) => (
              <motion.button
                key={theme.name}
                onClick={() => handleThemeChange(theme.name)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  
                  // Update for the entire dropdown
                  const dropdown = e.currentTarget.parentElement;
                  if (dropdown) {
                    const dropdownRect = dropdown.getBoundingClientRect();
                    const dropdownX = e.clientX - dropdownRect.left;
                    const dropdownY = e.clientY - dropdownRect.top;
                    dropdown.style.setProperty("--dropdown-x", `${dropdownX}px`);
                    dropdown.style.setProperty("--dropdown-y", `${dropdownY}px`);
                  }
                  
                  e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                  e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
                }}
                className={`group relative w-full flex items-center gap-3 px-4 py-3 
                  ${currentTheme === theme.name 
                    ? 'text-[var(--button-text)]' 
                    : 'text-[var(--text-color)]'
                  }`}
                whileHover={{ 
                  scale: 1.05,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
              >
                {currentTheme === theme.name && (
                  <motion.div
                    className="absolute inset-0 bg-[var(--neon-color)] opacity-80"
                    layoutId="activeTab"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25
                    }}
                  />
                )}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(
                      circle 12rem at var(--mouse-x) var(--mouse-y),
                      var(--neon-color) 0%,
                      transparent 80%
                    )`
                  }}
                />
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(
                      circle 16rem at var(--dropdown-x) var(--dropdown-y),
                      var(--neon-color) 0%,
                      transparent 90%
                    )`
                  }}
                />
                <motion.span
                  className={`text-lg relative z-10 ${
                    currentTheme === theme.name 
                      ? 'text-[var(--button-text)]' 
                      : 'text-[var(--text-color)]'
                  }`}
                  whileHover={{
                    y: [0, -5, 0],
                    transition: {
                      duration: 0.3,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {theme.icon}
                </motion.span>
                <span className={`relative z-10 
                  ${currentTheme === theme.name 
                    ? 'text-[var(--button-text)]' 
                    : 'text-[var(--text-color)]'
                  }`}>
                  {theme.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;