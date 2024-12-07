'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import PreLoader from './components/PreLoader';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Initialize AOS
    AOS.init({
      duration: 800,
      // once: true,
      easing: 'ease-out',
      offset: 50,          // smaller offset to trigger earlier
      delay: 0,           // no initial delay
      throttleDelay: 50,  // reduce throttle delay
      mirror: true,       // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom'  // default anchor placement
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
