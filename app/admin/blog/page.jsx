"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaEye, FaSpinner, FaFileAlt } from 'react-icons/fa';
import Link from 'next/link';

const ActionButton = ({ href, icon: Icon, className, children }) => (
  <Link href={href} className={`p-2 text-gray-400 hover:text-white transition-colors ${className}`}>
    {children}
    <Icon />
  </Link>
);

const PostListItem = ({ post, handleDelete, index }) => {
  console.log(post);
  return (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-[var(--card-bg)]/50 p-4 rounded-lg border border-transparent hover:border-[var(--neon-color)] transition-all"
  >
    <div className="md:col-span-2">
      <p className="font-bold text-white truncate">{post.title} : {post.excerpt}</p>
      <p className="text-sm text-gray-400">{post.content.slice(0, 100)}</p>
      <p className="text-sm text-gray-400">ID: {post.id}</p>
    </div>
    <div className="text-center">
      <span className={`px-3 py-1 text-xs font-bold rounded-full ${post.published ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
        {post.status === "published" ? 'Published' : 'Draft'}
      </span>
    </div>
    <div className="flex items-center justify-end gap-2">
      <ActionButton href={`/blog/${post.id}`} icon={FaEye} className="hover:text-blue-400" />
      <ActionButton href={`/admin/blog/edit/${post.id}`} icon={FaEdit} className="hover:text-purple-400" />
      <button onClick={() => handleDelete(post.id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors">
        <FaTrash />
      </button>
    </div>
  </motion.div>
)};

export default function AdminBlog() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      router.push('/admin/login');
    } else {
      fetchBlogPosts();
    }
  }, [router]);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog');
      const data = await response.json();
      if (response.ok) setPosts(data);
      else console.error('Error fetching blog posts:', data.error);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
        if (response.ok) fetchBlogPosts();
        else console.error('Error deleting post:', (await response.json()).error);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between md:items-center mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">Blog Management</h1>
          <p className="text-lg text-gray-400 mt-2">Create, edit, and manage your posts.</p>
        </div>
        <Link href="/admin/blog/new" className="mt-4 md:mt-0 px-5 py-3 rounded-lg bg-[var(--neon-color)] text-[var(--button-text)] font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
          <FaPlus /> New Post
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 max-w-md">
        <div className="relative">
          <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-[var(--card-bg)] border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <FaSpinner className="animate-spin text-4xl text-[var(--neon-color)]" />
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <PostListItem key={post.id} post={post} handleDelete={handleDelete} index={index} />
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-[var(--card-bg)]/30 rounded-lg">
                <FaFileAlt className="mx-auto text-5xl text-gray-500 mb-4" />
                <h3 className="text-xl font-bold text-white">No Posts Found</h3>
                <p className="text-gray-400">Click "New Post" to get started.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
