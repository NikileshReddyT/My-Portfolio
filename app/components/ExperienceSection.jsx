import React from 'react';
import { experienceData } from '../data/experience';
import { FaBriefcase, FaLaptopCode, FaCode, FaProjectDiagram } from 'react-icons/fa';

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[var(--neon-color)] mb-12">Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 [&>*:last-child:nth-child(odd)]:md:col-span-2 [&>*:last-child:nth-child(odd)]:md:mx-auto [&>*:last-child:nth-child(odd)]:md:max-w-[calc(50%-1rem)]">
          {experienceData.map((exp, index) => (
            <div
              key={index}
              className="neon-card group relative overflow-hidden rounded-2xl border border-[var(--neon-color)] bg-[var(--card-bg)] p-6 transition-all duration-300 "
              data-aos="fade-up"
              data-aos-duration="900"
              data-aos-easing="ease-out"
              data-aos-delay={index * 100}
            >
              <div className="absolute -top-3 right-3 transform translate-x-1/2 -translate-y-1/2 bg-[var(--card-bg)] px-3 py-1 rounded-full border border-[var(--neon-color)] shadow-md">
                <span className="inline-flex items-center text-xs font-semibold text-[var(--text-color)]">
                  {exp.duration}
                </span>
              </div>
              <div className="relative">
                <div className="flex items-start gap-4 mb-4" data-aos="fade-right" data-aos-delay={index * 150}>
                  <div className="flex-shrink-0 p-2.5 rounded-lg bg-[var(--neon-color)] bg-opacity-10">
                    <exp.icon className="w-6 h-6 text-[var(--text-color)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-color)]">{exp.position}</h3>
                    <p className="text-sm text-[var(--text-color)]">{exp.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4" data-aos="fade-left" data-aos-delay={index * 200}>
                  <span className="font-medium text-[var(--text-color)]">
                    {exp.location}
                  </span>
                </div>
                <div className="flex flex-col gap-2 text-sm text-[var(--text-color)] mb-4" data-aos="fade-up" data-aos-delay={index * 250}>
                  {exp.responsibilities.map((task, i) => (
                    <span key={i} className="flex items-start gap-2" data-aos="fade-left" data-aos-delay={index * 100}>
                      <FaBriefcase className="w-4 h-4 text-[var(--neon-color)]" />
                      {task}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-[var(--text-color)] mb-4" data-aos="fade-up" data-aos-delay={index * 300}>
                  <h4 className="w-full font-semibold text-[var(--neon-color)]">Learned:</h4>
                  {exp.learned.map((skill, i) => (
                    <span key={i} className="flex items-center gap-2 px-3 py-1 bg-[var(--neon-color)] font-medium bg-opacity-20 rounded-full">
                      <FaLaptopCode className="w-4 h-4 text-[var(--text-color)]" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
