"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendar, FaTag, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample blog data - in a real app, this would come from an API
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable Web Applications with Next.js",
      excerpt: "Exploring the best practices for building scalable web applications using Next.js and React ecosystem.",
      date: "2024-07-15",
      tags: ["Next.js", "React", "Web Development"],
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Machine Learning in Production: Challenges and Solutions",
      excerpt: "A deep dive into the challenges of deploying machine learning models in production environments.",
      date: "2024-06-28",
      tags: ["Machine Learning", "AI", "Deployment"],
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Optimizing Database Performance for High-Traffic Applications",
      excerpt: "Techniques and strategies for optimizing database performance in high-traffic web applications.",
      date: "2024-06-10",
      tags: ["Database", "Performance", "Backend"],
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "The Future of Web Development: Trends to Watch in 2024",
      excerpt: "Exploring emerging trends and technologies that are shaping the future of web development.",
      date: "2024-05-22",
      tags: ["Web Development", "Trends", "Technology"],
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "Mastering State Management in React Applications",
      excerpt: "A comprehensive guide to different state management solutions in React and when to use them.",
      date: "2024-04-18",
      tags: ["React", "State Management", "Frontend"],
      readTime: "10 min read"
    }
  ];
  
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
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
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.article 
                key={post.id}
                className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-400 mb-2 md:mb-0">
                      <FaCalendar className="mr-2" />
                      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    </div>
                    <span className="text-sm text-gray-400">{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4 text-white hover:text-purple-400 transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-300 mb-6">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 text-xs rounded-full bg-purple-900 bg-opacity-50 text-purple-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link href={`/blog/${post.id}`}>
                    <div className="inline-flex items-center text-purple-400 font-medium hover:text-purple-300 transition-colors">
                      Read full article
                      <FaChevronRight className="ml-2 text-sm" />
                    </div>
                  </Link>
                </div>
              </motion.article>
            ))
          ) : (
            <motion.div 
              className="col-span-2 text-center py-16 bg-gray-800 rounded-2xl border border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FaSearch className="mx-auto text-4xl text-gray-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
              <p className="text-gray-400 max-w-md mx-auto">Try adjusting your search terms or browse all articles.</p>
            </motion.div>
          )}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Stay Updated</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to get notified when new articles are published.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;
