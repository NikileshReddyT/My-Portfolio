'use client';

import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiChevronRight, HiHome } from 'react-icons/hi';
import { useState } from 'react';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const params = useParams();
  const [dynamicTitle] = useState('');
  const [isLoading] = useState(false);
  
  // Don't show breadcrumbs on homepage or admin pages
  if (pathname === '/' || pathname.startsWith('/admin')) return null;
  
  // Create breadcrumb segments
  const pathSegments = pathname.split('/').filter(segment => segment !== '');
  
  // Map path segments to readable names
  const pathMap = {
    'blog': 'Blog',
    'testimonials': 'Testimonials',
    'projects': 'Projects',
    'about': 'About',
    'admin': 'Admin',
    'login': 'Login',
  };
  
  // We intentionally avoid fetching titles for posts; use 'Post {id}' style instead
  
  // Generate breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    ...pathSegments.map((segment, index) => {
      // For dynamic routes
      if (params.id && segment === params.id) {
        return {
          name: `Post ${params.id}`,
          path: '/' + pathSegments.slice(0, index + 1).join('/'),
          isDynamic: true
        };
      }
      
      return {
        name: pathMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        path: '/' + pathSegments.slice(0, index + 1).join('/')
      };
    })
  ];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="relative flex items-center gap-1.5 text-xs sm:text-sm py-2.5 px-4 sm:px-5 overflow-x-auto scrollbar-hide z-10 mb-3 rounded-lg border border-white/10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* Enhanced background for breadcrumbs */}
          <div className="absolute inset-0 bg-[var(--card-bg)]/50 backdrop-blur-md rounded-lg -z-10" />
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 rounded-lg shadow-[0_0_18px_rgba(var(--neon-rgb),0.12)] -z-10" />
          {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        
        return (
          <motion.div 
            key={item.path} 
            className="flex items-center whitespace-nowrap"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            {index === 0 ? (
              <Link href={item.path} className="flex items-center">
                <motion.div 
                  whileHover={{ 
                    scale: 1.1, 
                    color: 'var(--neon-color-bright)',
                    textShadow: '0 0 8px rgba(var(--neon-rgb), 0.8)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[var(--neon-color)] transition-all duration-200 flex items-center justify-center w-7 h-7 bg-[var(--card-bg)] bg-opacity-40 rounded-md p-1.5"
                >
                  <HiHome className="w-full h-full" />
                </motion.div>
              </Link>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mx-1.5"
                >
                  <HiChevronRight className="text-[var(--neon-color)] opacity-60" />
                </motion.div>
                {isLast ? (
                  <motion.span 
                    className="text-[var(--text-color)] font-medium px-3 py-1.5 rounded-md bg-[var(--card-bg)] bg-opacity-60 shadow-[0_0_12px_rgba(var(--neon-rgb),0.22)]"
                    initial={{ backgroundColor: 'rgba(var(--card-bg-rgb), 0.4)' }}
                    animate={{ 
                      backgroundColor: 'rgba(var(--card-bg-rgb), 0.6)',
                      boxShadow: '0 0 10px rgba(var(--neon-rgb), 0.22)'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.name}
                  </motion.span>
                ) : (
                  <Link href={item.path}>
                    <motion.span 
                      whileHover={{ scale: 1.05, color: 'var(--neon-color)', textShadow: '0 0 8px rgba(var(--neon-rgb), 0.7)', backgroundColor: 'rgba(var(--card-bg-rgb), 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      className="text-[var(--text-muted)] hover:text-[var(--neon-color)] transition-all duration-200 px-2 py-1 rounded-md hover:bg-white/5"
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                )}
              </>
            )}
          </motion.div>
        );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Breadcrumbs;