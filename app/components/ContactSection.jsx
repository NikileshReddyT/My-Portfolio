'use client';
import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    // For now, we'll just show a success toast
    toast.success('Message sent successfully!', {
      style: {
        border: '1px solid var(--neon-color)',
        padding: '16px',
        background: 'var(--card-bg)',
        color: 'var(--text-color)',
      },
      iconTheme: {
        primary: 'var(--neon-color)',
        secondary: 'var(--button-text)',
      },
    });

    // Clear form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
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
      <Toaster position="bottom-right" />
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
          {/* Contact Form */}
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
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                data-form-type="other"
                className="w-full px-4 py-3 rounded-lg bg-[var(--input-bg)] border border-[var(--neon-color)] border-opacity-30 text-[var(--text-color)] placeholder:text-[var(--text-color)] placeholder:opacity-50 focus:outline-none focus:border-[var(--neon-color)] focus:border-opacity-100"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                data-form-type="other"
                className="w-full px-4 py-3 rounded-lg bg-[var(--input-bg)] border border-[var(--neon-color)] border-opacity-30 text-[var(--text-color)] placeholder:text-[var(--text-color)] placeholder:opacity-50 focus:outline-none focus:border-[var(--neon-color)] focus:border-opacity-100"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows="5"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                data-form-type="other"
                className="w-full px-4 py-3 rounded-lg bg-[var(--input-bg)] border border-[var(--neon-color)] border-opacity-30 text-[var(--text-color)] placeholder:text-[var(--text-color)] placeholder:opacity-50 focus:outline-none focus:border-[var(--neon-color)] focus:border-opacity-100 resize-none"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-[var(--neon-color)] text-[var(--button-text)] rounded-lg font-bold text-lg hover:opacity-90 transition-all"
              >
                Send Message
              </motion.button>
            </motion.div>
          </motion.form>

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
