'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import { projects } from '../data/projects';
import ProjectDetailModal from './ProjectDetailModal'; // Assuming this component exists

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    <>
      <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--neon-color)]">
              Featured Projects
            </h2>
            <p className="text-lg sm:text-xl text-[var(--text-color)]/80 max-w-3xl mx-auto">
              A collection of my work, showcasing my skills in building modern, functional, and user-friendly applications.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 [&>*:last-child:nth-child(odd)]:md:col-span-2 [&>*:last-child:nth-child(odd)]:md:mx-auto [&>*:last-child:nth-child(odd)]:md:max-w-[calc(50%-1rem)]"
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                className="w-full"
              >
                <motion.div
                  onClick={() => handleOpenModal(project)}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 10px 30px -15px rgba(var(--neon-rgb), 0.4)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative flex flex-col h-full rounded-xl border border-[var(--neon-color)] bg-[var(--card-bg)]/80 backdrop-blur-sm cursor-pointer overflow-hidden group"
                >
                  {/* Image Container */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="transition-transform duration-500 ease-in-out object-cover"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-[var(--neon-color)] mb-2">
                      {project.title}
                    </h3>
                    hello
                    <p className="text-[var(--text-color)]/70 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-5 group-hover:opacity-100 group-hover:pointer-events-auto opacity-80 pointer-events-none transition-opacity duration-300">
                      {project.technologies.map((tech) => (
                        <div key={tech} className="text-xs font-mono px-2 py-1 rounded-full bg-transparent text-white border border-[var(--neon-color)]">
                          {tech}
                        </div>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="mt-auto flex items-center gap-4 text-sm font-medium">
                       <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-[var(--text-color)]/80 hover:text-[var(--neon-color)] transition-colors duration-300"
                      >
                        <FaGithub />
                        <span>Source Code</span>
                      </a>
                       <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-[var(--text-color)]/80 hover:text-[var(--neon-color)] transition-colors duration-300"
                      >
                        <FaExternalLinkAlt />
                        <span>Live Demo</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsSection;