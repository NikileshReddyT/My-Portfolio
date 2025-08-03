'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaLightbulb, FaTrophy } from 'react-icons/fa';
import Image from 'next/image';

export default function ProjectDetailModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            className="relative w-full max-w-4xl max-h-[90vh] rounded-xl border border-[var(--neon-color)]/30 bg-[var(--card-bg)]/90 backdrop-blur-lg overflow-y-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 p-2 rounded-full text-[var(--text-color)]/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <FaTimes size={20} />
            </button>

            {/* Image Header */}
            <div className="relative h-64 w-full rounded-t-xl overflow-hidden">
              <Image
                src={project.image}
                alt={`${project.title} main image`}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>

            <div className="p-6 sm:p-8 ">
              {/* Header */}
              <div className="mb-6 ">
                <h2 className="text-3xl font-bold text-[var(--neon-color)] mb-3">{project.title}</h2>
                <p className="text-[var(--text-color)]/80 text-lg">{project.description}</p>
              </div>

              <div className="space-y-8">
                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-semibold text-[var(--neon-color)] mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <div key={tech} className="text-xs font-mono px-2.5 py-1 rounded-full bg-transparent text-white border border-[var(--neon-color)]">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Features */}
                  <div>
                    <h3 className="flex items-center text-xl font-semibold text-[var(--neon-color)] mb-4">
                      <FaLightbulb className="mr-2" /> Key Features
                    </h3>
                    <ul className="space-y-3 text-[var(--text-color)]/80">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <span className="hover:text-[var(--neon-color)] mr-2">▸</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges */}
                  <div>
                    <h3 className="flex items-center text-xl font-semibold text-[var(--neon-color)] mb-4">
                      <FaTrophy className="mr-2" /> Challenges & Solutions
                    </h3>
                    <ul className="space-y-3 text-[var(--text-color)]/80">
                      {project.challenges.map((challenge) => (
                        <li key={challenge} className="flex items-start">
                          <span className="text-[var(--neon-color)] mr-2">▸</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Project Links */}
                <div className="pt-4">
                  <h3 className="text-xl font-semibold text-[var(--neon-color)] mb-4">Project Links</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-bold rounded-lg bg-[var(--neon-color)] text-black hover:opacity-90 transition-opacity"
                    >
                      <FaGithub />
                      <span>View Code</span>
                    </motion.a>
                    <motion.a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-bold rounded-lg border-2 border-[var(--neon-color)] text-[var(--neon-color)] hover:bg-[var(--neon-color)] hover:text-black transition-colors duration-300"
                    >
                      <FaExternalLinkAlt />
                      <span>Live Demo</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}