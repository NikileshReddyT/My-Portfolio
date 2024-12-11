'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import PreLoader from './components/PreLoader';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'sunset';
    }
    return 'sunset';
  });
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'sunset';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    setIsThemeLoaded(true);

    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      offset: 50,
      delay: 0,
      throttleDelay: 50,
      mirror: true,
      anchorPlacement: 'top-bottom'
    });

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme');
          setCurrentTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  if (!isThemeLoaded) {
    return null; 
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <PreLoader key="preloader" onLoadingComplete={() => setIsLoading(false)} theme={currentTheme} />
      ) : (
        <main key="main" className="min-h-screen bg-black">
          {children}
          <Footer />
        </main>
      )}
    </AnimatePresence>
  );
}
