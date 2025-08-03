'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCalendar, FaTag, FaArrowLeft, FaClock, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MarkdownCodeBlock from '../../../components/MarkdownCodeBlock';

const BlogPostPage = ({ params }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { id } = await params; // Await params as per Next.js 15 requirement
        const response = await fetch(`/api/blog/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Blog post not found');
          }
          throw new Error('Failed to fetch blog post');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--neon-color)]"></div>
          <p className="mt-4 text-gray-400">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-white">
        <div className="text-center max-w-2xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">Error Loading Blog Post</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => router.push('/blog')}
            className="px-6 py-3 rounded-lg bg-[var(--neon-color)] text-[var(--button-text)] font-bold hover:opacity-90 transition-opacity"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-white">
        <div className="text-center max-w-2xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => router.push('/blog')}
            className="px-6 py-3 rounded-lg bg-[var(--neon-color)] text-[var(--button-text)] font-bold hover:opacity-90 transition-opacity"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--card-bg)] text-white">
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <header className="pt-12 sm:pt-16 pb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=''
          >
            <div className="mb-6 flex items-center ">
              <Link href="/blog" className="text-sm text-[var(--neon-color)] hover:underline flex gap-2 justify-center items-center">
                <FaArrowLeft/> Blog
              </Link>
              <span className="text-gray-400 mx-2">/</span>
              <span className="text-gray-400 text-sm truncate">{post.title}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm text-gray-400 mt-4">
              <div className="flex items-center">
                <FaCalendar className="mr-2" />
                <time dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2" />
                <span>{Math.ceil(post.content.length / 1500)} min reading time</span>
              </div>
            </div>
          </motion.div>
        </header>

        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pb-16"
        >
          <h1 className='text-3xl md:text-5xl font-black mb-8'>{post.title}</h1>
          <div className="prose prose-lg max-w-none prose-invert prose-headings:text-[var(--text-color)] prose-p:text-gray-300 prose-a:text-[var(--neon-color)] prose-a:hover:text-opacity-80 prose-blockquote:border-[var(--neon-color)] prose-blockquote:text-gray-300 prose-strong:text-white prose-code:text-[var(--neon-color)] prose-pre:bg-gray-900/50 prose-pre:rounded-lg">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: MarkdownCodeBlock,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              {post.tags && post.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 text-sm rounded-full bg-white/5 text-[var(--neon-color)] border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      </main>
    </div>
  );
};

export default BlogPostPage;
