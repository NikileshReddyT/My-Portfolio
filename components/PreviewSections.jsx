'use client';

import { motion } from 'framer-motion';
import { FaBlog, FaComments } from 'react-icons/fa';
import Link from 'next/link';

const PreviewSections = () => {
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

  const previewData = [
    {
      id: 1,
      title: "Latest Blog Posts",
      description: "Explore my thoughts on technology, development, and industry trends.",
      icon: <FaBlog className="w-8 h-8" />,
      link: "/blog",
      cta: "Read Blog"
    },
    {
      id: 2,
      title: "Testimonials",
      description: "See what colleagues and mentors have to say about my work.",
      icon: <FaComments className="w-8 h-8" />,
      link: "/testimonials",
      cta: "View Testimonials"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--section-bg)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--neon-color)]">
            Explore More
          </h2>
          <p className="text-lg sm:text-xl text-[var(--text-color)] max-w-2xl mx-auto">
            Discover additional content about my work and experiences
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {previewData.map((item) => (
            <motion.div
              key={item.id}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-[var(--card-bg)] rounded-xl p-8 border border-[var(--neon-color)] border-opacity-20 hover:border-opacity-100 transition-all duration-300 group"
            >
              <div className="text-[var(--neon-color)] mb-6">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--text-color)]">
                {item.title}
              </h3>
              <p className="text-[var(--text-color)] opacity-80 mb-6">
                {item.description}
              </p>
              <Link 
                href={item.link}
                className="inline-flex items-center gap-2 text-[var(--neon-color)] font-medium hover:opacity-80 transition-opacity"
              >
                {item.cta}
                <svg 
                  className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PreviewSections;
