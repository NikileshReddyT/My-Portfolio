"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaSave, FaTimesCircle, FaMagic, FaSpinner } from 'react-icons/fa';

// Reusable components from the 'new' page can be extracted and imported
const InputField = ({ id, label, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    <input
      type="text"
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/20 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-[var(--neon-color)] focus:outline-none transition-all"
    />
  </div>
);

const TextareaField = ({ id, label, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={12}
      className="w-full bg-white/5 border border-white/20 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-[var(--neon-color)] focus:outline-none transition-all"
    />
  </div>
);

const PublishSwitch = ({ published, setPublished }) => (
    <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg">
        <span className="font-medium text-white">Publish Status</span>
        <button onClick={() => setPublished(!published)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none ${published ? 'bg-[var(--neon-color)]' : 'bg-gray-600'}`}>
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${published ? 'translate-x-6' : 'translate-x-1'}`}/>
        </button>
    </div>
);

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceError, setEnhanceError] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`/api/blog/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch post data');
          return res.json();
        })
        .then(data => {
          setTitle(data.title);
          setExcerpt(data.excerpt || '');
          setContent(data.content);
          setPublished(data.status === 'published');
          setTags(Array.isArray(data.tags) ? data.tags.join(', ') : data.tags || '');
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError(err.message);
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleEnhance = async () => {
    setIsEnhancing(true);
    setEnhanceError('');
    try {
      const response = await fetch('/api/enhance-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          excerpt,
          content,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to enhance content.');
      }

      const data = await response.json();
      setTitle(data.title);
      setExcerpt(data.excerpt);
      setContent(data.markdownContent);
      setTags(data.tags);
    } catch (err) {
      setEnhanceError(err.message);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const postData = {
      title,
      excerpt,
      content,
      status: published ? 'published' : 'draft',
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update post');
      }

      router.push('/admin/blog');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !error) {
    return <div className="flex justify-center items-center h-full text-white">Loading post...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-full text-red-500">Error: {error}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 text-white">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <div className="flex items-center space-x-4">
          <button type="button" onClick={() => router.push('/admin/blog')} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors">
            <FaTimesCircle />
            <span>Cancel</span>
          </button>
          <button type="submit" disabled={isLoading} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[var(--neon-color)] text-black font-bold hover:bg-opacity-80 transition-colors disabled:opacity-50">
            <FaSave />
            <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </motion.div>

      {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-6">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-2 space-y-6">
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
          <InputField id="title" label="Post Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a catchy title"/>
          <TextareaField id="excerpt" label="Excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Brief summary of the post"/>
          <TextareaField id="content" label="Post Content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your amazing blog post here..."/>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <PublishSwitch published={published} setPublished={setPublished} />
          <InputField id="tags" label="Tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Next.js, Tailwind, etc."/>
        </motion.div>
      </div>
    </form>
  );
}
