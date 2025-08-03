"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSignOutAlt, FaQuoteLeft, FaPenSquare, FaArrowLeft, FaHome } from 'react-icons/fa';

const NavLink = ({ item }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <a
        href={item.href}
        className={`flex items-center px-4 py-3 rounded-lg transition-colors text-lg ${isActive ? 'bg-[var(--neon-color)] text-black font-bold hover:text-white/90' : 'text-gray-300 hover:bg-white/10'}`}>
        <item.icon className={`mr-4 ${isActive ? 'text-black ' : 'text-[var(--neon-color)]'}`} />
        {item.name}
      </a>
    </motion.li>
  );
};

const Sidebar = ({ navItems, handleLogout }) => (
  <div className="p-6 flex flex-col h-full">
    <div className="mb-10 flex items-center">
      {/* home button */}
      <button onClick={() => window.location.href = '/'} >
        <FaArrowLeft className="mr-4" />
      </button>
      <div className=" text-center w-full">
        <h1 className="text-3xl font-extrabold text-white tracking-tighter">Admin</h1>
        <p className="text-gray-400">Content Management</p>
      </div>
    </div>
    <nav className="flex-grow">
      <ul className="space-y-3">
        {/* dashboard */}
        <NavLink key="dashboard" item={{ name: 'Dashboard', href: '/admin', icon: FaHome }} />
        {navItems.map((item) => (
          <NavLink key={item.name} item={item} />
        ))}
      </ul>
    </nav>
    <div className="mt-auto">
      <button
        onClick={handleLogout}
        className="flex items-center w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 transition-colors text-lg">
        <FaSignOutAlt className="mr-4 text-[var(--neon-color)]" />
        Logout
      </button>
    </div>
  </div>
);

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Testimonials', href: '/admin/testimonials', icon: FaQuoteLeft },
    { name: 'Blog', href: '/admin/blog', icon: FaPenSquare },
  ];

  if (!isClient) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><p className="text-white">Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex font-sans">
      {/* Static sidebar for desktop */}
      <aside className="hidden md:block md:w-72 bg-gray-900/80 border-r border-white/10 shadow-lg">
        <Sidebar navItems={navItems} handleLogout={handleLogout} />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed md:hidden top-0 left-0 w-72 h-full bg-gray-900 z-50 shadow-2xl border-r border-white/10">
            <Sidebar navItems={navItems} handleLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden sticky top-0 flex items-center justify-between p-4 bg-gray-900/80 backdrop-blur-sm z-40 border-b border-white/10">
          <h1 className="text-xl font-bold">Admin</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 z-50">
            {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-black/90 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
