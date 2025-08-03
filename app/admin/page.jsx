"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaPenSquare, FaSpinner } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const StatCard = ({ title, description, count, icon: Icon, href, color, statLabel, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-[var(--card-bg)]/50 border border-white/10 rounded-2xl shadow-lg hover:shadow-2xl hover:border-[var(--neon-color)] transition-all duration-300 group"
  >
    <Link href={href} className="block p-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--neon-color)] transition-colors">{title}</h2>
          <p className="text-gray-400 max-w-xs">{description}</p>
        </div>
        <div className={`p-4 rounded-lg bg-${color}-500/10`}>
          <Icon className={`text-3xl text-${color}-400`} />
        </div>
      </div>
      <div className="mt-6">
        <p className="text-4xl font-extrabold text-white">
          {count === null ? <FaSpinner className="animate-spin text-2xl" /> : count}
        </p>
        <p className="text-sm text-gray-500">{statLabel}</p>
      </div>
    </Link>
  </motion.div>
);

export default function AdminDashboard() {
  const [pendingCount, setPendingCount] = useState(null);
  const [blogCount, setBlogCount] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      router.push('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [testimonialsRes, blogRes] = await Promise.all([
          fetch('/api/testimonials?status=pending'),
          fetch('/api/blog')
        ]);

        if (testimonialsRes.ok) {
          const pendingData = await testimonialsRes.json();
          setPendingCount(pendingData.length);
        } else {
          setPendingCount(0);
        }

        if (blogRes.ok) {
          const blogData = await blogRes.json();
          setBlogCount(blogData.length);
        } else {
          setBlogCount(0);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setPendingCount(0);
        setBlogCount(0);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">Dashboard</h1>
        <p className="text-lg text-gray-400 mt-2">Welcome back. Here's a summary of your content.</p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StatCard
          title="Manage Testimonials"
          description="Review, approve, and manage user-submitted testimonials."
          count={pendingCount}
          statLabel="Pending Approval"
          icon={FaQuoteLeft}
          href="/admin/testimonials"
          color="purple"
          delay={0.1}
        />
        <StatCard
          title="Manage Blog Posts"
          description="Create, edit, and publish new articles for your blog."
          count={blogCount}
          statLabel="Total Posts"
          icon={FaPenSquare}
          href="/admin/blog"
          color="blue"
          delay={0.2}
        />
      </div>
    </div>
  );
}
