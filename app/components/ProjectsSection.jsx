'use client';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 [&>*:last-child:nth-child(odd)]:md:col-span-2 [&>*:last-child:nth-child(odd)]:md:mx-auto [&>*:last-child:nth-child(odd)]:md:max-w-[calc(50%-1rem)]">
          {projects.map((project, index) => (
            <div
              key={index}
              className="neon-card group relative rounded-xl border border-[var(--neon-color)] bg-[var(--card-bg)] shadow-[0_0_15px_rgba(var(--neon-rgb),0.15)] transform transition-all duration-300 hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={index * 200}
            >
              {/* Project Image Container */}
              <div className="relative aspect-video rounded-t-xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={`Image of ${project.title} project`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 opacity-70 group-hover:opacity-60 transition-opacity duration-300" />

                {/* Project Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
                    {project.title}
                  </h3>
                  {/* Tech Stack Pills */}
                  <div className="relative">
                    {/* Expanded view (all technologies) */}
                    <div className="absolute inset-0 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs font-medium rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-sm whitespace-nowrap"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {/* Default view (first 3 + count) */}
                    <div className="flex flex-wrap gap-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
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
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Project Description */}
                <p className="text-[var(--text-color)] text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Action Links */}
                <div className="flex items-center gap-4">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-[var(--neon-color)] text-white hover:bg-[var(--neon-color)]/90 transition-all duration-300 group/link"
                  >
                    <FaGithub className="text-lg group-hover/link:rotate-12 transition-transform duration-300" />
                    <span className='text-[13px] sm:text-sm'>View Code</span>
                  </a>
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border-2 border-[var(--neon-color)] text-[var(--neon-color)] hover:bg-[var(--neon-color)]/10 transition-all duration-300 group/link"
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
