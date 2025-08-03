'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import PreLoader from './components/PreLoader';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PageWrapper({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('sunset');
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'sunset';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    setIsThemeLoaded(true);

    // Initialize AOS after a short delay to improve FCP
    const aosTimer = setTimeout(() => {
      AOS.init({
        duration: 800,
        easing: 'ease-out',
        offset: 50,
        delay: 0,
        throttleDelay: 99, // Increased throttle delay
        mirror: true,
        anchorPlacement: 'top-bottom',
        once: true // Animation should happen only once while scrolling down
      });
    }, 100);

    const handleStorageChange = (event) => {
      if (event.key === 'theme') {
        const newTheme = event.newValue || 'sunset';
        setCurrentTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearTimeout(aosTimer);
    };
  }, []);

  // Determine if we should show preloader
  useEffect(() => {
    // Check if this is a direct visit or page reload
    if (typeof window !== 'undefined') {
      // Check navigation type (0 = normal, 1 = page reload, 2 = back/forward)
      const navigationType = performance.navigation.type;
      
      // Show preloader if:
      // 1. It's a page reload (type 1)
      // 2. It's a direct visit to the home page (no referrer)
      // 3. It's the first visit to the site
      const shouldShowPreloader = 
        navigationType === 1 || // Page reload
        (pathname === '/' && !document.referrer) || // Direct visit to home
        !sessionStorage.getItem('hasVisited'); // First visit
      
      if (shouldShowPreloader) {
        setShowPreloader(true);
        sessionStorage.setItem('hasVisited', 'true');
      } else {
        // For client-side navigation, don't show preloader
        setShowPreloader(false);
        setIsLoading(false);
      }
    }
  }, [pathname]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (!isThemeLoaded) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {showPreloader && isLoading ? (
        <PreLoader key="preloader" onLoadingComplete={handleLoadingComplete} theme={currentTheme} />
      ) : (
        <motion.main 
          key="main" 
          className="min-h-screen bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
          <Footer />
        </motion.main>
      )}
    </AnimatePresence>
  );
}