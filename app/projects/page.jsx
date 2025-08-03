"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle, FaSearch, FaFilter } from 'react-icons/fa';
import Image from 'next/image';
import { projects } from '../data/projects';
import ProjectDetailModal from '../components/ProjectDetailModal';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const openProjectDetail = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectDetail = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Get all unique technologies for filter options
  const allTechnologies = [...new Set(projects.flatMap(project => project.technologies))];

  // Filter projects based on search term and technology filter
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || project.technologies.includes(filter);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--neon-color)]">Projects by Nikilesh Reddy</h1>
          <p className="text-lg sm:text-xl text-[var(--text-color)] max-w-2xl mx-auto">
            A collection of my recent work and personal projects
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div 
          className="mb-12 flex flex-col md:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-[var(--text-secondary)]" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] focus:border-[var(--neon-color)] focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] transition-colors text-[var(--text-color)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-[var(--text-secondary)]" />
            </div>
            <select
              className="pl-10 pr-8 py-3 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] focus:border-[var(--neon-color)] focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] transition-colors text-[var(--text-color)] appearance-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Technologies</option>
              {allTechnologies.map((tech, index) => (
                <option key={index} value={tech}>{tech}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                className="group relative rounded-xl border border-[var(--neon-color)] bg-[var(--card-bg)] shadow-[0_0_15px_rgba(var(--neon-rgb),0.15)] transform transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`Image of ${project.title} project`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 opacity-70 group-hover:opacity-60 transition-opacity duration-300" />
                  
                  {/* Project Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs font-medium rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-sm whitespace-nowrap"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-sm whitespace-nowrap">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-5">
                  <p className="text-[var(--text-color)] text-sm leading-relaxed mb-5 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openProjectDetail(project)}
                      className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-[var(--card-hover)] text-[var(--text-color)] hover:bg-[var(--neon-color)]/20 border border-[var(--card-border)] transition-all duration-300 flex-1"
                    >
                      <FaInfoCircle className="text-sm" />
                      <span>Details</span>
                    </button>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-[var(--neon-color)] text-white hover:bg-[var(--neon-color)]/90 transition-all duration-300 flex-1 group/link"
                    >
                      <FaGithub className="text-sm group-hover/link:rotate-12 transition-transform duration-300" />
                      <span className="text-xs">Code</span>
                    </a>
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border-2 border-[var(--neon-color)] text-[var(--neon-color)] hover:bg-[var(--neon-color)]/10 transition-all duration-300 flex-1 group/link"
                    >
                      <FaExternalLinkAlt className="text-xs group-hover/link:-rotate-12 transition-transform duration-300" />
                      <span className="text-xs">Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-[var(--text-color)] text-lg">No projects found matching your criteria.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeProjectDetail} 
      />
    </div>
  );
}
