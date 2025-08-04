'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaCalendar, FaTag, FaChevronRight, FaClock } from 'react-icons/fa';
import Link from 'next/link';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) throw new Error('Failed to fetch blog posts');
        const data = await response.json();
        // Filter to show only published posts
        const publishedPosts = data.filter(post => post.status === 'published');
        setBlogPosts(publishedPosts);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Blog Posts</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--card-bg)] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-[var(--neon-color)]">
            Nikilesh Reddy's Tech Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on modern web development and technology
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-[var(--card-bg)] border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] focus:border-transparent transition-all duration-300 shadow-lg"
            />
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <motion.div 
              className="col-span-3 text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--neon-color)]"></div>
              <p className="mt-4 text-gray-400">Loading blog posts...</p>
            </motion.div>
          ) : filteredPosts.length === 0 ? (
            <motion.div 
              className="col-span-3 text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-gray-400">No blog posts found.</p>
              <p className="text-gray-500 mt-2">Try adjusting your search terms.</p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="bg-[var(--card-bg)] rounded-2xl border border-white/10 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[var(--neon-color)]/10 transition-all duration-300 flex flex-col"
                >
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-400">
                        <FaCalendar className="mr-2" />
                        <time dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <FaClock className="mr-2" />
                        <span>{Math.ceil(post.content.length / 1500)} min reading</span>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 line-clamp-2 text-[var(--neon-color)] ">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-300 line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex-grow"></div><div className="flex flex-wrap gap-2 mt-4 mb-6">
                      {post.tags && post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 text-xs rounded-full bg-[var(--neon-color)]/10 text-[var(--neon-color)] border border-[var(--neon-color)]/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link href={`/blog/${post.id}`} className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[var(--neon-color)] text-[var(--button-text)] font-bold hover:bg-opacity-90 transition-all duration-300 group ">
                      Read Article
                      <FaChevronRight className="ml-2 text-sm transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
