'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactSection = () => {
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

  const socialLinks = [
    {
      icon: <FaGithub className="w-8 h-8" />,
      href: 'https://github.com/NikileshReddyT',
      label: 'GitHub'
    },
    {
      icon: <FaLinkedin className="w-8 h-8" />,
      href: 'https://linkedin.com/in/nikilesh-reddy-thatiparthi',
      label: 'LinkedIn'
    },
    {
      icon: <FaTwitter className="w-8 h-8" />,
      href: 'https://twitter.com',
      label: 'Twitter'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
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
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={item} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-[var(--input-bg)] border border-[var(--neon-color)] border-opacity-20 text-[var(--text-color)] placeholder-[var(--text-color)] placeholder-opacity-50 focus:outline-none focus:border-opacity-100 transition-all"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-[var(--input-bg)] border border-[var(--neon-color)] border-opacity-20 text-[var(--text-color)] placeholder-[var(--text-color)] placeholder-opacity-50 focus:outline-none focus:border-opacity-100 transition-all"
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full px-4 py-3 rounded-lg bg-[var(--input-bg)] border border-[var(--neon-color)] border-opacity-20 text-[var(--text-color)] placeholder-[var(--text-color)] placeholder-opacity-50 focus:outline-none focus:border-opacity-100 transition-all resize-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-[var(--neon-color)] text-[var(--button-text)] rounded-lg font-bold text-lg hover:opacity-90 transition-all shadow-[0_0_15px_rgba(var(--neon-rgb),0.3)] hover:shadow-[0_0_20px_rgba(var(--neon-rgb),0.4)]"
              >
                Send Message
              </motion.button>
            </motion.div>
          </motion.div>

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

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold text-[var(--neon-color)] mb-4">
                Connect With Me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={item}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-lg bg-[var(--card-bg)] border border-[var(--neon-color)] border-opacity-20 hover:border-opacity-100 text-[var(--neon-color)] transition-all"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
