'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaTimes, FaPaperPlane, FaCheckCircle, FaPenFancy } from 'react-icons/fa';
import { FaWandMagicSparkles, FaSpinner } from 'react-icons/fa6';
import SimpleNavbar from '../../components/SimpleNavbar';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Main Page Component
const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [showAIOptions, setShowAIOptions] = useState(false);
  const contentTextareaRef = useRef(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials?status=approved');
        if (!res.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestimonials();

    let scrollTimeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  

    return (
    <div className="min-h-screen bg-[var(--background-color)] text-[var(--text-color)] transition-colors duration-500 font-sans">
      <SimpleNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="text-5xl md:text-6xl font-extrabold text-center mb-16 text-[var(--neon-color)] tracking-tighter"
        >
          Testimonials<span className="hidden text-[var(--neon-color)] md:inline"> for Nikilesh Reddy</span>
        </motion.h1>

        {isLoading ? (
          <div className="h-full w-full flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-[var(--neon-color)] border-t-transparent rounded-full animate-spin"></div>
            <div className="text-lg text-gray-400">Loading testimonials...</div>
          </div>
        ) : (
          testimonials.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            initial="hidden"
            animate="visible"
            variants={{ 
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            { testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </motion.div>
          ) : (
            <div className="text-center text-lg md:text-2xl lg:text-3xl w-full h-full flex items-center justify-center">Be the first to share your testimonial!</div>
          )
        )}
        
        
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 px-5 py-3 bg-white/10 text-white font-semibold rounded-full shadow-lg border border-white/15 backdrop-blur-md hover:border-[var(--neon-color)]/50 hover:shadow-[0_8px_30px_rgba(var(--neon-rgb),0.25)] transition-all"
          animate={{
            scale: isScrolling ? 0.95 : 1,
            padding: isScrolling ? '0.85rem 1.6rem' : '0.95rem 1.9rem'
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaPenFancy />
          <motion.span 
            className="overflow-hidden whitespace-nowrap"

            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            Share Tributes
          </motion.span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <AddTestimonialModal 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// New Testimonial Card Design (premium, balanced, glassmorphism)
const TestimonialCard = ({ testimonial }) => {
  const initial = (testimonial?.name || 'N').charAt(0).toUpperCase();
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 26, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="relative group"
    >
      {/* Professional card with subtle border */}
      <div className="rounded-2xl bg-white/5 w-[100%] backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.2)] group-hover:border-[var(--neon-color)]/30 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300 p-6 min-h-[280px] h-full flex flex-col gap-5 relative">

        {/* Professional Header */}
        <header className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-[var(--card-bg)] border border-white/15 text-[var(--neon-color)] flex items-center justify-center font-bold text-lg shadow-sm">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-white font-bold text-lg leading-tight truncate">{testimonial.name}</h3>
            {testimonial.company && (
              <p className="text-sm text-gray-400 truncate mt-0.5">{testimonial.company}</p>
            )}
          </div>
        </header>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* Body with integrated opening/closing quotes */}
          <div className="relative">
            <p
              lang="en"
              className="text-[14px] italic text-gray-200 leading-[34px] font-medium before:content-['“'] before:text-[var(--neon-color)] before:opacity-90 before:mr-2 before:text-2xl before:font-serif before:align-top after:content-['”'] after:text-[var(--neon-color)] after:opacity-60 after:ml-2 after:text-2xl after:font-serif after:align-bottom"
              style={{ hyphens: 'auto', WebkitHyphens: 'auto', msHyphens: 'auto', textWrap: 'pretty', textAlignLast: 'left' }}
            >
              {testimonial.message}
            </p>
          </div>

          {/* Bottom accent */}
          <div className="mt-2 h-8 rounded-xl bg-gradient-to-r from-[var(--neon-color)]/0 via-[var(--neon-color)]/10 to-[var(--neon-color)]/0 blur-xl opacity-70 group-hover:opacity-90 transition-opacity" />
      </div>
    </motion.article>
  );
};

// Modal for Adding Testimonial
const AddTestimonialModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAIOptions, setShowAIOptions] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [tone, setTone] = useState('professional');
  const contentTextareaRef = useRef(null);

  const generateTestimonial = async (selectedTone = 'professional') => {
    if (!name.trim()) {
      setError('Please enter your name first');
      return;
    }

    setIsGenerating(true);
    setError('');
    setTone(selectedTone);
    
    try {
      const response = await fetch('/api/generate-testimonial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          company: company || '',
          tone: selectedTone
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('API Error:', data);
        const errorMessage = data.error || 
                           (data.details ? `Server error: ${data.details}` : 'Failed to generate testimonial');
        throw new Error(errorMessage);
      }
      
      if (!data.text) {
        throw new Error('No text was generated. Please try again.');
      }
      
      setGeneratedText(data.text);
      setContent(data.text);
      
      // Focus the textarea after generation
      setTimeout(() => {
        contentTextareaRef.current?.focus();
      }, 100);
      
    } catch (err) {
      console.error('Error generating testimonial:', err);
      setError(err.message || 'Failed to generate testimonial. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with:', { name, company, content });
    if (!name.trim() || !content.trim()) {
      setError('Name and Your Message are required fields.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, message: content }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Something went wrong');
      }
      
      await res.json();
      // Don't add to the list, just show success.
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 4000); // Close modal after 2.5 seconds

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 50, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        className="bg-[var(--card-bg)] rounded-2xl shadow-2xl w-full max-w-lg border border-white/10 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <SuccessMessage key="success" />
          ) : (
            <motion.div key="form" exit={{ opacity: 0, x: -50 }} className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Share Your Tributes</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors rounded-full p-2 -mr-2 -mt-2">
                  <FaTimes size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] transition-all"
                    placeholder="e.g., Sundar Pichai"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">Relation / Company / Position (Optional)</label>
                  <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] transition-all"
                    placeholder="e.g., CEO of Google"
                  />
                </div>
                <div>
                  <div className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="content" className="block text-sm font-medium text-gray-300">Your Message</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowAIOptions(!showAIOptions)}
                          disabled={isGenerating}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border border-[var(--neon-color)] text-[var(--neon-color)] hover:bg-[var(--neon-color)] hover:bg-opacity-10 transition-all disabled:opacity-50"
                        >
                          {isGenerating ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <FaWandMagicSparkles className="text-sm text-[var(--text-color)]" />
                          )}
                          <span>Generate with AI</span>
                        </button>
                        
                        <AnimatePresence>
                          {showAIOptions && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-xl border border-white/10 overflow-hidden z-10"
                            >
                              <p className="px-4 py-2 text-xs text-gray-400 border-b border-white/10">Generate {tone} testimonial</p>
                              <button
                                type="button"
                                onClick={() => {
                                  setTone('professional');
                                  generateTestimonial('professional');
                                  setShowAIOptions(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                                disabled={isGenerating}
                              >
                                Professional
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setTone('friendly');
                                  generateTestimonial('friendly');
                                  setShowAIOptions(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                                disabled={isGenerating}
                              >
                                Friendly
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setTone('enthusiastic');
                                  generateTestimonial('enthusiastic');
                                  setShowAIOptions(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                                disabled={isGenerating}
                              >
                                Enthusiastic
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <textarea
                        id="content"
                        ref={contentTextareaRef}
                        rows="5"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] transition-all resize-none pr-10"
                        placeholder="What did you think of my work?"
                      />
                      {isGenerating && (
                        <div className="absolute right-3 bottom-3 text-[var(--neon-color)]">
                          <FaSpinner className="animate-spin" />
                        </div>
                      )}
                    </div>
                    {generatedText && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-xs text-gray-400 flex items-center gap-2"
                      >
                        <FaWandMagicSparkles className="text-[var(--neon-color)]" />
                        <span>AI-generated text. Feel free to edit as needed!</span>
                      </motion.div>
                    )}
                  </div>
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <div className="text-right">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--neon-color)] text-[var(--button-text)] font-bold rounded-lg shadow-lg shadow-[var(--neon-color-transparent)] hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Send Tributes'}
                    {!isSubmitting && <FaPaperPlane />}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const SuccessMessage = () => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
    className="flex flex-col items-center justify-center p-16 text-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotate: 360 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
    >
      <FaCheckCircle className="text-7xl text-green-400 mb-6" />
    </motion.div>
    <h3 className="text-3xl font-bold text-white mb-2">Thank You!</h3>
    <p className="text-gray-300">Your feedback has been submitted for approval.</p>
  </motion.div>
);

export default TestimonialsPage;
