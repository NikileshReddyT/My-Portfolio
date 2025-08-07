'use client';
import { useState, useEffect } from 'react';

// Theme-based gradient backgrounds with smoother transitions
const themeColors = {
  dark: {
    gradient: `
      radial-gradient(ellipse 180% 120% at 30% 0%, 
        rgba(255, 0, 51, 0.12) 0%, 
        rgba(255, 0, 51, 0.08) 20%,
        rgba(255, 51, 102, 0.05) 40%,
        rgba(204, 0, 51, 0.02) 60%,
        transparent 100%
      ),
      radial-gradient(ellipse 160% 100% at 70% 100%, 
        rgba(255, 51, 102, 0.10) 0%,
        rgba(255, 51, 102, 0.06) 25%,
        rgba(204, 0, 51, 0.03) 50%,
        transparent 100%
      ),
      linear-gradient(180deg, 
        rgba(0, 0, 0, 1) 0%, 
        rgba(5, 5, 8, 0.98) 10%,
        rgba(8, 3, 8, 0.96) 20%,
        rgba(10, 5, 10, 0.95) 30%,
        rgba(8, 3, 8, 0.96) 40%,
        rgba(5, 5, 8, 0.97) 50%,
        rgba(3, 3, 5, 0.98) 60%,
        rgba(5, 5, 8, 0.97) 70%,
        rgba(8, 3, 8, 0.96) 80%,
        rgba(5, 5, 8, 0.98) 90%,
        rgba(0, 0, 0, 1) 100%
      )
    `,
  },
  cyberpunk: {
    gradient: `
      radial-gradient(ellipse 180% 120% at 30% 0%, 
        rgba(0, 255, 157, 0.12) 0%, 
        rgba(0, 255, 157, 0.08) 20%,
        rgba(51, 255, 170, 0.05) 40%,
        rgba(0, 204, 122, 0.02) 60%,
        transparent 100%
      ),
      radial-gradient(ellipse 160% 100% at 70% 100%, 
        rgba(51, 255, 170, 0.10) 0%,
        rgba(51, 255, 170, 0.06) 25%,
        rgba(0, 204, 122, 0.03) 50%,
        transparent 100%
      ),
      linear-gradient(180deg, 
        rgba(0, 0, 0, 1) 0%, 
        rgba(2, 8, 5, 0.98) 10%,
        rgba(1, 10, 6, 0.96) 20%,
        rgba(2, 12, 8, 0.95) 30%,
        rgba(1, 10, 6, 0.96) 40%,
        rgba(2, 8, 5, 0.97) 50%,
        rgba(2, 6, 4, 0.98) 60%,
        rgba(2, 8, 5, 0.97) 70%,
        rgba(1, 10, 6, 0.96) 80%,
        rgba(2, 8, 5, 0.98) 90%,
        rgba(0, 0, 0, 1) 100%
      )
    `,
  },
  sunset: {
    gradient: `
      radial-gradient(ellipse 180% 120% at 30% 0%, 
        rgba(255, 107, 107, 0.12) 0%, 
        rgba(255, 107, 107, 0.08) 20%,
        rgba(255, 142, 142, 0.05) 40%,
        rgba(255, 71, 87, 0.02) 60%,
        transparent 100%
      ),
      radial-gradient(ellipse 160% 100% at 70% 100%, 
        rgba(255, 142, 142, 0.10) 0%,
        rgba(255, 142, 142, 0.06) 25%,
        rgba(255, 71, 87, 0.03) 50%,
        transparent 100%
      ),
      linear-gradient(180deg, 
        rgba(0, 0, 0, 1) 0%, 
        rgba(8, 3, 3, 0.98) 10%,
        rgba(10, 4, 4, 0.96) 20%,
        rgba(12, 6, 6, 0.95) 30%,
        rgba(10, 4, 4, 0.96) 40%,
        rgba(8, 3, 3, 0.97) 50%,
        rgba(6, 2, 2, 0.98) 60%,
        rgba(8, 3, 3, 0.97) 70%,
        rgba(10, 4, 4, 0.96) 80%,
        rgba(8, 3, 3, 0.98) 90%,
        rgba(0, 0, 0, 1) 100%
      )
    `,
  },
  ocean: {
    gradient: `
      radial-gradient(ellipse 180% 120% at 30% 0%, 
        rgba(0, 208, 255, 0.12) 0%, 
        rgba(0, 208, 255, 0.08) 20%,
        rgba(51, 217, 255, 0.05) 40%,
        rgba(0, 168, 204, 0.02) 60%,
        transparent 100%
      ),
      radial-gradient(ellipse 160% 100% at 70% 100%, 
        rgba(51, 217, 255, 0.10) 0%,
        rgba(51, 217, 255, 0.06) 25%,
        rgba(0, 168, 204, 0.03) 50%,
        transparent 100%
      ),
      linear-gradient(180deg, 
        rgba(0, 0, 0, 1) 0%, 
        rgba(2, 5, 8, 0.98) 10%,
        rgba(3, 6, 10, 0.96) 20%,
        rgba(4, 8, 12, 0.95) 30%,
        rgba(3, 6, 10, 0.96) 40%,
        rgba(2, 5, 8, 0.97) 50%,
        rgba(1, 4, 7, 0.98) 60%,
        rgba(2, 5, 8, 0.97) 70%,
        rgba(3, 6, 10, 0.96) 80%,
        rgba(2, 5, 8, 0.98) 90%,
        rgba(0, 0, 0, 1) 100%
      )
    `,
  },
  synthwave: {
    gradient: `
      radial-gradient(ellipse 180% 120% at 30% 0%, 
        rgba(205, 122, 39, 0.12) 0%, 
        rgba(205, 122, 39, 0.08) 20%,
        rgba(230, 149, 74, 0.05) 40%,
        rgba(181, 105, 31, 0.02) 60%,
        transparent 100%
      ),
      radial-gradient(ellipse 160% 100% at 70% 100%, 
        rgba(230, 149, 74, 0.10) 0%,
        rgba(230, 149, 74, 0.06) 25%,
        rgba(181, 105, 31, 0.03) 50%,
        transparent 100%
      ),
      linear-gradient(180deg, 
        rgba(0, 0, 0, 1) 0%, 
        rgba(8, 5, 2, 0.98) 10%,
        rgba(10, 7, 3, 0.96) 20%,
        rgba(12, 8, 4, 0.95) 30%,
        rgba(10, 7, 3, 0.96) 40%,
        rgba(8, 5, 2, 0.97) 50%,
        rgba(6, 4, 1, 0.98) 60%,
        rgba(8, 5, 2, 0.97) 70%,
        rgba(10, 7, 3, 0.96) 80%,
        rgba(8, 5, 2, 0.98) 90%,
        rgba(0, 0, 0, 1) 100%
      )
    `,
  },
};

// Theme-based mesh blob colors - very subtle
const meshColors = {
  dark: ['rgba(255, 0, 51, 0.15)', 'rgba(255, 51, 102, 0.12)', 'rgba(204, 0, 51, 0.10)'],
  cyberpunk: ['rgba(0, 255, 157, 0.15)', 'rgba(51, 255, 170, 0.12)', 'rgba(0, 204, 122, 0.10)'],
  sunset: ['rgba(255, 107, 107, 0.15)', 'rgba(255, 142, 142, 0.12)', 'rgba(255, 71, 87, 0.10)'],
  ocean: ['rgba(0, 208, 255, 0.15)', 'rgba(51, 217, 255, 0.12)', 'rgba(0, 168, 204, 0.10)'],
  synthwave: ['rgba(205, 122, 39, 0.15)', 'rgba(230, 149, 74, 0.12)', 'rgba(181, 105, 31, 0.10)'],
};

export default function SimpleMeshGradient() {
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    // Get current theme from document
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    setCurrentTheme(theme);

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') || 'dark';
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

  const colors = themeColors[currentTheme] || themeColors.dark;
  const blobColors = meshColors[currentTheme] || meshColors.dark;

  return (
    <div className="fixed inset-0" style={{ zIndex: -1 }}>
      {/* Base theme gradient layer */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{ 
          background: colors.gradient,
          pointerEvents: 'none',
        }}
      />

      {/* Animated mesh gradient blobs */}
      <div className="absolute inset-0" style={{ overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Blob 1 - Top left, slow movement */}
        <div
          className="absolute rounded-full"
          style={{
            width: '60vw',
            height: '60vw',
            left: '-10%',
            top: '-20%',
            background: `radial-gradient(circle at center, ${blobColors[0]} 0%, transparent 70%)`,
            filter: 'blur(40px)',
            animation: 'meshFloat1 25s ease-in-out infinite',
          }}
        />
        
        {/* Blob 2 - Bottom right, medium movement */}
        <div
          className="absolute rounded-full"
          style={{
            width: '70vw',
            height: '70vw',
            right: '-15%',
            bottom: '-25%',
            background: `radial-gradient(circle at center, ${blobColors[1]} 0%, transparent 70%)`,
            filter: 'blur(50px)',
            animation: 'meshFloat2 30s ease-in-out infinite',
          }}
        />
        
        {/* Blob 3 - Center, gentle movement */}
        <div
          className="absolute rounded-full"
          style={{
            width: '50vw',
            height: '50vw',
            left: '25%',
            top: '15%',
            background: `radial-gradient(circle at center, ${blobColors[2]} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            animation: 'meshFloat3 35s ease-in-out infinite',
          }}
        />
      </div>

      {/* Subtle vignette to darken edges and focus center */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 120% 80% at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.25) 100%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Black blur veil: darken and blur what's behind for clarity */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundColor: 'rgba(0,0,0,0.42)',
          backdropFilter: 'blur(60px) saturate(140%)',
          WebkitBackdropFilter: 'blur(60px) saturate(140%)',
          pointerEvents: 'none',
          transition: 'background-color 600ms ease, backdrop-filter 600ms ease',
        }}
      />

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes meshFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        
        @keyframes meshFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, -20px) scale(0.95); }
          66% { transform: translate(20px, 30px) scale(1.05); }
        }
        
        @keyframes meshFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 20px) scale(1.08); }
          66% { transform: translate(30px, -30px) scale(0.92); }
        }

        @media (prefers-reduced-motion: reduce) {
          div[style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
