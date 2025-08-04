"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaTimes, FaSpinner, FaMagic } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const InputField = ({ id, label, value, onChange, required = false, placeholder = '' }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold text-gray-300 mb-2">{label}</label>
    <input
      type="text"
      id={id}
      className="w-full px-4 py-3 rounded-lg bg-[var(--card-bg)] border-2 border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] focus:border-[var(--neon-color)] transition-all"
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    />
  </div>
);

const TextareaField = ({ id, label, value, onChange, required = false, rows = 3 }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold text-gray-300 mb-2">{label}</label>
    <textarea
      id={id}
      rows={rows}
      className="w-full px-4 py-3 rounded-lg bg-[var(--card-bg)] border-2 border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] focus:border-[var(--neon-color)] transition-all font-mono text-sm"
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

const PublishSwitch = ({ published, setPublished }) => (
    <div className="flex items-center justify-between bg-[var(--card-bg)] p-4 rounded-lg border-2 border-white/20">
        <div>
            <p className="font-bold text-white">Publish</p>
            <p className="text-sm text-gray-400">Make this post visible to everyone.</p>
        </div>
        <button
            type="button"
            onClick={() => setPublished(!published)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${published ? 'bg-[var(--neon-color)]' : 'bg-gray-600'}`}>
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${published ? 'translate-x-6' : 'translate-x-1'}`}/>
        </button>
    </div>
);

export default function NewBlogPost() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState(null);
  const [enhanceError, setEnhanceError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) router.push('/admin/login');
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
          status: published ? 'published' : 'draft',
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to create post');
      }

      router.push('/admin/blog');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnhance = async () => {
    if (!content) {
      setEnhanceError('Please provide some content to enhance.');
      return;
    }
    setIsEnhancing(true);
    setEnhanceError(null);
    try {
      const response = await fetch('/api/enhance-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, excerpt, content }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to enhance content.');
      }
      const { title: enhancedTitle, excerpt: enhancedExcerpt, markdownContent, tags: enhancedTags } = await response.json();
      setTitle(enhancedTitle);
      setExcerpt(enhancedExcerpt);
      setContent(markdownContent);
      setTags(enhancedTags);
    } catch (err) {
      setEnhanceError(err.message);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between md:items-center mb-8"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">New Post</h1>
          <p className="text-lg text-gray-400 mt-2">Let's create something great.</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <button type="button" onClick={() => router.push('/admin/blog')} className="px-5 py-3 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="px-5 py-3 rounded-lg bg-[var(--neon-color)] text-[var(--button-text)] font-bold hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50">
            {isSubmitting ? <FaSpinner className="animate-spin" /> : <FaSave />} {isSubmitting ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </motion.div>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
          <p>Error: {error}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-6">
          <InputField id="title" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="My Awesome Blog Post" />
          <TextareaField id="excerpt" label="Excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required rows={4} />
          <TextareaField id="content" label="Content (Markdown Supported)" value={content} onChange={(e) => setContent(e.target.value)} required rows={15} />
            <div className="mt-4">
              <button 
                type="button" 
                onClick={handleEnhance}
                disabled={isEnhancing || !content}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-purple-600/20 text-purple-300 font-bold hover:bg-purple-600/30 border-2 border-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEnhancing ? <FaSpinner className="animate-spin" /> : <FaMagic />}
                {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
              </button>
              {enhanceError && <p className="text-red-400 text-sm mt-2">{enhanceError}</p>}
            </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
          <PublishSwitch published={published} setPublished={setPublished} />
          <InputField id="tags" label="Tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Next.js, Tailwind, etc."/>
        </motion.div>
      </div>
    </form>
  );
}
