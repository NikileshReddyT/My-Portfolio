'use client';
import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

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
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus('success');
        // Clear form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      label: 'Email',
      value: 'nikileshreddyt@gmail.com',
      href: 'mailto:nikileshreddyt@gmail.com'
    },
    {
      icon: <FaPhone className="w-6 h-6" />,
      label: 'Phone',
      value: '+91 8639870053',
      href: 'tel:+918639870053'
    },
    {
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      label: 'Location',
      value: 'Vijayawada, Andhra Pradesh, India',
      href: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      {/* Removed Toaster component */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--neon-color)]">
            Get in Touch
          </h2>
          <p className="text-lg sm:text-xl text-[var(--text-color)] max-w-2xl mx-auto">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form or Submission Status */}
          {submitStatus ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 flex flex-col items-center justify-center h-full py-12 border border-[var(--neon-color)] rounded-2xl"
            >
              {submitStatus === 'success' ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <FaCheck className="text-green-500 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--neon-color)]">Message Sent Successfully!</h3>
                  <p className="text-center text-[var(--text-color)] max-w-md">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSubmitStatus(null)}
                    className="mt-6 px-6 py-3 bg-[var(--neon-color)] text-[var(--button-text)] rounded-lg font-bold hover:opacity-90 transition-all"
                  >
                    Send Another Message
                  </motion.button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                    <FaExclamationTriangle className="text-red-500 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-500">Submission Failed</h3>
                  <p className="text-center text-[var(--text-color)] max-w-md">
                    Sorry, there was an issue sending your message. Please try again.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSubmitStatus(null)}
                    className="mt-6 px-6 py-3 bg-[var(--neon-color)] text-[var(--button-text)] rounded-lg font-bold hover:opacity-90 transition-all"
                  >
                    Try Again
                  </motion.button>
                </>
              )}
            </motion.div>
          ) : (
            <motion.form
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <motion.div variants={item} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  disabled={isSubmitting}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  data-form-type="other"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--input-bg)] border border-[var(--neon-color)] border-opacity-30 text-[var(--text-color)] placeholder:text-[var(--text-color)] placeholder:opacity-50 focus:outline-none focus:border-[var(--neon-color)] focus:border-opacity-100 disabled:opacity-50"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  disabled={isSubmitting}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  data-form-type="other"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--input-bg)] border border-[var(--neon-color)] border-opacity-30 text-[var(--text-color)] placeholder:text-[var(--text-color)] placeholder:opacity-50 focus:outline-none focus:border-[var(--neon-color)] focus:border-opacity-100 disabled:opacity-50"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows="5"
                  disabled={isSubmitting}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  data-form-type="other"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--input-bg)] border border-[var(--neon-color)] border-opacity-30 text-[var(--text-color)] placeholder:text-[var(--text-color)] placeholder:opacity-50 focus:outline-none focus:border-[var(--neon-color)] focus:border-opacity-100 resize-none disabled:opacity-50"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-[var(--neon-color)] text-[var(--button-text)] rounded-lg font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </motion.div>
            </motion.form>
          )}

          {/* Contact Info */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  variants={item}
                  className="flex items-center gap-4 p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--neon-color)] border-opacity-20 hover:border-opacity-100 transition-all group"
                >
                  <span className="text-[var(--neon-color)] group-hover:scale-110 transition-transform">
                    {info.icon}
                  </span>
                  <div>
                    <p className="text-sm text-[var(--text-color)] opacity-60">
                      {info.label}
                    </p>
                    <p className="text-[var(--text-color)] font-medium">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
