'use client';
import { educationData } from '../data/education';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaAward, FaStar, FaCode, FaCertificate } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import { BsArrowRight } from 'react-icons/bs';

const EducationSection = () => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--card-bg)] via-transparent to-[var(--card-bg)] opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div
          className="text-center mb-20"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="ease-out"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--neon-color)]">
            Education
          </h2>
          <p className="text-lg sm:text-xl text-[var(--text-color)] max-w-2xl mx-auto">
            My academic journey and qualifications
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[var(--neon-color)] to-transparent opacity-50" />

          {/* Education Cards */}
          <div className="relative">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className={`relative flex items-start mb-16 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                data-aos="fade-up"
                data-aos-duration="900"
                data-aos-easing="ease-out"
                data-aos-delay={index * 150}
              >
                {/* Timeline Node */}
                <div className="hidden md:block absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--card-bg)] border-2 border-[var(--neon-color)] z-10 mt-8">
                  <div className="absolute inset-0 rounded-full bg-[var(--neon-color)] animate-ping opacity-20" />
                </div>

                {/* Card Container */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}>
                  {/* Card */}
                  <div className="group relative overflow-hidden rounded-2xl border border-[var(--neon-color)] bg-[var(--card-bg)] p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--neon-rgb),0.15)]">
                    {/* Card Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-color)] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-300" />

                    {/* Status Badge */}
                    <div
                      className={`absolute -top-3 right-3 transform translate-x-1/2 -translate-y-1/2 ${edu.status === 'Current' ? 'bg-[var(--neon-color)] text-[var(--text-color)]' : 'bg-[var(--card-bg)] text-[var(--neon-color)]'} px-3 py-1 rounded-full border border-[var(--neon-color)] shadow-md`}
                      data-aos="zoom-in"
                      data-aos-delay={index * 200}
                    >
                      <span className={`inline-flex items-center text-xs font-semibold mt-2 ${edu.status === 'Current'
                        ? ' rounded-full text-[var(--text-color)]'
                        : 'text-[var(--neon-color)]'
                        }`}>
                        {edu.status}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4" data-aos="fade-right" data-aos-delay={index * 5}>
                        <div className="flex-shrink-0 p-2.5 rounded-lg bg-[var(--neon-color)] bg-opacity-10">
                          <edu.icon className="w-6 h-6 text-[var(--text-color)]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[var(--neon-color)]">
                            {edu.degree}
                          </h3>
                          <p className="text-sm font-medium text-[var(--text-color)] mt-1">
                            {edu.specialization}
                          </p>
                        </div>
                      </div>

                      {/* Institution Info */}
                      <div className="flex items-center gap-2 mb-4" data-aos="fade-left" data-aos-delay={index * 5}>
                        <span className="font-medium text-[var(--text-color)]">
                          {edu.institution}
                        </span>
                        <BsArrowRight className="text-[var(--text-color)] opacity-40" />
                        <span className="text-sm text-[var(--text-color)] opacity-75">
                          {edu.location}
                        </span>
                      </div>

                      {/* Duration & GPA */}
                      <div className="flex items-center gap-4 text-sm text-[var(--text-color)] mb-4" data-aos="fade-up" data-aos-delay={index * 5}>
                        <span>{edu.duration}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-color)] opacity-40" />
                        <span className="font-medium">GPA: {edu.gpa}</span>
                      </div>

                      {/* Coursework */}
                      <div className="mb-6" data-aos="zoom-out-up" data-aos-delay={index * 5}>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course, i) => (
                            <span
                              key={i}
                              className="text-xs px-3 py-1.5 rounded-full border border-[var(--neon-color)] border-opacity-20 text-[var(--text-color)] bg-[var(--neon-color)] bg-opacity-5 font-bold"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
