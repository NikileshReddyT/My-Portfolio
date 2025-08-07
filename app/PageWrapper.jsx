'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import PreLoader from '../components/PreLoader';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';

// Dynamically import MeshGradientBackground to avoid SSR issues
const MeshGradientBackground = dynamic(() => import('../components/ui/SimpleMeshGradient'), {
  ssr: false,
  loading: () => (
    <div 
      className="fixed inset-0 -z-10"
      style={{ 
        background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.98) 0%, rgba(12, 6, 6, 0.96) 50%, rgba(0, 0, 0, 0.98) 100%)'
      }}
    />
  ),
});

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

    // Dynamically load AOS after a short delay to improve FCP
    const aosTimer = setTimeout(async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
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
    return (
      <div 
        className="fixed inset-0 min-h-screen" 
        style={{ 
          background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.98) 0%, rgba(12, 6, 6, 0.96) 50%, rgba(0, 0, 0, 0.98) 100%)'
        }}
      />
    );
  }

  return (
    <>
      {/* Always present background to prevent white flash */}
      <MeshGradientBackground />
      
      <AnimatePresence>
        {showPreloader && isLoading && (
          <PreLoader key="preloader" onLoadingComplete={handleLoadingComplete} theme={currentTheme} />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {(!showPreloader || !isLoading) && (
          <motion.main 
            key="main" 
            className="min-h-screen relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {children}
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}