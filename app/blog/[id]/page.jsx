'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCalendar, FaTag, FaArrowLeft, FaClock, FaUser, FaCopy, FaCheck } from 'react-icons/fa';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MarkdownCodeBlock from '../../../components/MarkdownCodeBlock';



const BlogPostPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articleCopied, setArticleCopied] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { id } = params;
        if (!id) return;
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
  }, [params.id]);

  const handleCopyArticle = () => {
    if (post && post.content) {
      navigator.clipboard.writeText(post.content);
      setArticleCopied(true);
      setTimeout(() => setArticleCopied(false), 2000);
    }
  };

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
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-color)]">
      <main className="w-full max-w-6xl mx-auto md:px-3 ">
        <header className="pt-8 sm:pt-12 pb-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex items-center text-sm">
              <Link 
                href="/blog" 
                className="text-[var(--neon-color)] hover:opacity-80 flex items-center gap-1.5 transition-colors"
              >
                <FaArrowLeft className="text-xs" />
                <span className="hidden sm:block">Back to Blog</span>
              </Link>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-400 truncate">{post.title}</span>
            </div>

            <div className=" hidden sm:flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-400">
              <div className="flex items-center">
                <FaCalendar className="mr-1.5 text-xs" />
                <time dateTime={post.created_at}>
                  {new Date(post.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </time>
              </div>
              <span className="hidden sm:inline text-gray-600">•</span>
              <div className="flex items-center">
                <FaClock className="mr-1.5 text-xs" />
                <span>{Math.ceil(post.content.length / 1500)} min read</span>
              </div>
            </div>
            <div className="sticky bottom-0 left-0 right-0 mt-4 bg-[var(--card-bg)] border-b border-white/10 p-3 flex flex-col items-center justify-between">
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-center text-[var(--neon-color)]'>{post.title}</h1>
              
            </div>
          </motion.div>
        </header>

        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pb-12"
        >
          
          
          <div className="relative flex flex-col bg-[var(--card-bg)] rounded-lg border border-white/10 overflow-hidden h-full">
            <div className="prose prose-sm sm:prose-base max-w-none p-4 sm:p-6 overflow-y-auto flex-1">
              <style jsx global>{`
                .prose {
                  --tw-prose-body: var(--text-color);
                  --tw-prose-headings: var(--text-color);
                  --tw-prose-lead: var(--text-color);
                  --tw-prose-links: var(--neon-color);
                  --tw-prose-bold: var(--text-color);
                  --tw-prose-counters: var(--text-color);
                  --tw-prose-bullets: var(--text-color);
                  --tw-prose-hr: var(--text-color);
                  --tw-prose-quotes: var(--text-color);
                  --tw-prose-quote-borders: var(--neon-color);
                  --tw-prose-captions: var(--text-color);
                  --tw-prose-code: var(--neon-color);
                  --tw-prose-pre-code: var(--text-color);
                  --tw-prose-pre-bg: rgba(0, 0, 0, 0.3);
                  --tw-prose-th-borders: var(--text-color);
                  --tw-prose-td-borders: var(--text-color);
                  color: var(--text-color);
                }
                
                .prose :where(p):not(:where([class~="not-prose"] *)) {
                  color: var(--text-color);
                  margin-top: 1.25em;
                  margin-bottom: 1.25em;
                  line-height: 1.7;
                }
                
                .prose :where(a):not(:where([class~="not-prose"] *)) {
                  color: var(--neon-color);
                  text-decoration: none;
                  border-bottom: 1px solid var(--neon-color);
                  transition: opacity 0.2s;
                }
                
                .prose :where(a:hover):not(:where([class~="not-prose"] *)) {
                  opacity: 0.8;
                }
                
                .prose :where(pre):not(:where([class~="not-prose"] *)) {
                  background: rgba(0, 0, 0, 0.3) !important;
                  border-radius: 0.5rem;
                  padding: 1rem !important;
                  margin: 0;
                  overflow-x: auto;
                  color: var(--text-color);
                }
                
                .prose :where(code):not(:where([class~="not-prose"] *)) {
                  color: var(--neon-color);
                  background: rgba(255, 255, 255, 0.05);
                  padding: 0.2em 0.4em;
                  border-radius: 0.25em;
                  font-size: 0.9em;
                }
                
                .prose :where(pre code):not(:where([class~="not-prose"] *)) {
                  background: transparent;
                  padding: 0;
                  color: var(--text-color);
                  font-size: 0.9em;
                  line-height: 1.5;
                }
                
                .prose :where(ul, ol):not(:where([class~="not-prose"] *)) {
                  padding-left: 1.5em;
                  margin: 1.25em 0;
                }
                
                .prose :where(li):not(:where([class~="not-prose"] *)) {
                  margin: 0.5em 0;
                  color: var(--text-color);
                }
                
                .prose :where(blockquote):not(:where([class~="not-prose"] *)) {
                  border-left: 3px solid var(--neon-color);
                  padding-left: 1em;
                  margin: 1.5em 0;
                  color: var(--text-color);
                  font-style: italic;
                }
                
                /* Make code blocks horizontally scrollable */
                .prose pre {
                  max-width: 100%;
                  overflow-x: auto;
                  -webkit-overflow-scrolling: touch;
                  background: rgba(0, 0, 0, 0.3) !important;
                  padding: 1rem !important;
                  border-radius: 0.5rem;
                }
                
                /* Ensure code blocks have a minimum width for better scrolling */
                .prose pre code {
                  display: inline-block;
                  min-width: 100%;
                  white-space: pre;
                  word-wrap: normal;
                }
                
                /* Ensure content doesn't shrink */
                .prose > * {
                  flex-shrink: 0;
                }
                .scrollbar-hide {
                  overflow-x: auto;
                }
              `}</style>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: MarkdownCodeBlock,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
            
          </div>
          <button 
                onClick={handleCopyArticle}
                className="flex items-center mx-auto px-4 py-4 my-4 text-sm rounded-md bg-black/70 backdrop-blur-sm hover:bg-black/80 text-gray-200 transition-all duration-200 border border-white/10 hover:border-white/20"
                aria-label="Copy blog content"
              >
                {articleCopied ? <FaCheck className="mr-2 text-green-400" /> : <FaCopy className="mr-2" />}
                {articleCopied ? 'Copied to Clipboard' : 'Copy Blog'}
              </button>
          
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 text-xs sm:text-sm rounded-full bg-white/5 text-[var(--neon-color)] border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.article>
      </main>
    </div>
  );
};

export default BlogPostPage;
