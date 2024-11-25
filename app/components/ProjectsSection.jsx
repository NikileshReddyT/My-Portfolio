'use client';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../data/projects';

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--card-bg)] via-transparent to-[var(--card-bg)] opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div
          className="text-center mb-16"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--neon-color)]">
            Featured Projects
          </h2>
          <p className="text-lg sm:text-xl text-[var(--text-color)] max-w-2xl mx-auto">
            A collection of my recent work and personal projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-[var(--neon-color)] bg-[var(--card-bg)] shadow-[0_0_15px_rgba(var(--neon-rgb),0.15)] transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(var(--neon-rgb),0.25)]"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={index * 200}
            >
              {/* Project Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent opacity-90" />
                
                {/* Floating Tech Stack */}
                <div className="absolute top-4 right-4 flex flex-wrap justify-end gap-2 max-w-[70%]">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs font-medium rounded-md bg-[var(--neon-color)]/90 text-white backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-[var(--neon-color)] group-hover:text-[var(--neon-color)] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-[var(--text-color)] text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Links */}
                <div className="flex items-center gap-4 pt-2">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--neon-color)]/10 text-[var(--neon-color)] hover:bg-[var(--neon-color)]/20 transition-all duration-300 group/link"
                  >
                    <FaGithub className="text-lg group-hover/link:rotate-12 transition-transform duration-300" />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-[var(--neon-color)]/20 text-[var(--neon-color)] hover:bg-[var(--neon-color)]/10 transition-all duration-300 group/link"
                  >
                    <FaExternalLinkAlt className="text-sm group-hover/link:-rotate-12 transition-transform duration-300" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
