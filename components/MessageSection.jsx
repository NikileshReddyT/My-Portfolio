'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const MessageSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="message" className="py-16 bg-[var(--bg-color)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[var(--text-color)] mb-4">Send Me a Message</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-[var(--card-bg)] p-6 rounded-lg shadow-lg backdrop-blur-md"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--text-color)]">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 bg-[var(--input-bg)] text-[var(--text-color)] shadow-sm focus:border-[var(--neon-color)] focus:ring-[var(--neon-color)] p-2"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--text-color)]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 bg-[var(--input-bg)] text-[var(--text-color)] shadow-sm focus:border-[var(--neon-color)] focus:ring-[var(--neon-color)] p-2"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[var(--text-color)]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 bg-[var(--input-bg)] text-[var(--text-color)] shadow-sm focus:border-[var(--neon-color)] focus:ring-[var(--neon-color)] p-2"
            />
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-[var(--neon-color)] text-white rounded-md font-medium shadow-lg 
                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[var(--neon-color-dark)]'} 
                transition-all duration-200`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </div>

          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center p-3 rounded-md ${
                submitStatus === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {submitStatus === 'success'
                ? 'Message sent successfully!'
                : 'Failed to send message. Please try again.'}
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default MessageSection;
