'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaTimes, FaPaperPlane, FaCheckCircle, FaPenFancy } from 'react-icons/fa';
import SimpleNavbar from '../../components/SimpleNavbar';

// Main Page Component
const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

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
          Testimonials for Nikilesh Reddy
        </motion.h1>

        {isLoading ? (
          <div className="text-center text-lg">Loading testimonials...</div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{ 
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </motion.div>
        )}
        
        
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 bg-[var(--card-bg)] text-white font-bold rounded-full shadow-2xl shadow-black/50 border border-[var(--neon-color)] border-4 hover:bg-[var(--neon-color)] hover:text-white backdrop-blur-lg"
          animate={{
            scale: isScrolling ? 0.95 : 1,
            padding: isScrolling ? '0.9rem 1.8rem' : '1rem 2rem'
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

// New Testimonial Card Design
const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      variants={{ 
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
      }}
      className="relative group p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--neon-color)] overflow-hidden"
      style={{'--glow-color': 'var(--neon-color-transparent-heavy)'}}
    >
      <motion.div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ 
          background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--glow-color), transparent 40%)'
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="border-b border-white/10 pb-4  mb-auto flex items-center gap-2">
          {/* avatar */}
          <div className="w-8 h-8 rounded-full bg-[var(--neon-color)] text-white flex items-center justify-center mb-2">
            <span className="text-lg font-semibold">
              {testimonial.name[0]}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-white text-xl">{testimonial.name}</p>
            {testimonial.company && <p className="text-base text-gray-400 ">{testimonial.company}</p>}
          </div>
        </div>
        <div className="flex flex-row gap-4 my-2">
          <FaQuoteLeft className="text-5xl text-[var(--neon-color)] opacity-30 my-2" />
          <p className="flex-grow text-lg italic text-gray-300 leading-relaxed my-8">{testimonial.message}</p>
        </div>
      </div>
    </motion.div>
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
                <h2 className="text-3xl font-bold text-white">Share Your Feedback</h2>
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
                    placeholder="e.g., Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">Company / Position (Optional)</label>
                  <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] transition-all"
                    placeholder="e.g., CEO at TechCorp"
                  />
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                  <textarea
                    id="content"
                    rows="5"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] transition-all resize-none"
                    placeholder="What did you think of my work?"
                  ></textarea>
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
                    {isSubmitting ? 'Submitting...' : 'Send Feedback'}
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
