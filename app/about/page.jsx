"use client";

import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCode, FaAward, FaDownload, FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

const AboutPage = () => {
  const skills = [
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 75 },
    { name: "Machine Learning", level: 70 },
    { name: "Database Design", level: 85 },
  ];

  const education = [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "KL University, Vijayawada",
      year: "2022 - 2025",
      description: "Specialized in Artificial Intelligence and Machine Learning"
    },
    {
      degree: "Diploma in Computer Engineering",
      institution: "Sri Durga Devi Polytechnic College, Vijayawada",
      year: "2019 - 2022",
      description: "Focused on software development and database systems"
    }
  ];

  const experience = [
    {
      role: "Full Stack Developer Intern",
      company: "Tech Innovations Pvt. Ltd.",
      period: "Jan 2024 - Present",
      description: "Developing scalable web applications using React, Next.js, and Node.js. Implemented AI features using Python and TensorFlow."
    },
    {
      role: "Frontend Developer Intern",
      company: "Digital Solutions Co.",
      period: "Jun 2023 - Dec 2023",
      description: "Built responsive user interfaces with React and Tailwind CSS. Collaborated with design team to implement UI/UX improvements."
    }
  ];

  const achievements = [
    "Google DSC Solution Challenge Finalist 2024",
    "Best Project Award - KL University Hackathon 2023",
    "Top 10 in State Level Coding Competition 2022",
    "Published Research Paper on AI Optimization Techniques"
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-color)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--heading-color)] mb-6">About Nikilesh Reddy</h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            I'm a passionate Full Stack Developer and AI enthusiast with expertise in creating innovative web solutions and implementing machine learning models.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div 
            className="lg:col-span-2 neon-card rounded-xl p-6 border border-[var(--card-border)] bg-[var(--card-bg)]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-[var(--heading-color)] mb-4">My Journey</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              Hello! I'm Nikilesh Reddy T, a dedicated Full Stack Developer and AI enthusiast based in Vijayawada, India. My journey in technology began during my diploma studies, and I've been passionate about creating innovative solutions ever since.
            </p>
            <p className="text-[var(--text-secondary)] mb-4">
              I specialize in building scalable web applications using modern technologies like React, Next.js, and Node.js. My interest in artificial intelligence led me to explore machine learning frameworks, where I've successfully implemented various models for real-world applications.
            </p>
            <p className="text-[var(--text-secondary)]">
              When I'm not coding, you can find me contributing to open-source projects, writing technical articles, or exploring the latest advancements in AI and web development.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <a 
                href="/resume.pdf" 
                className="flex items-center px-4 py-2 bg-[var(--neon-color)] text-[var(--button-text)] rounded-lg font-medium hover:opacity-90 transition-all duration-300"
              >
                <FaDownload className="mr-2" />
                Download Resume
              </a>
              <a 
                href="mailto:nikileshreddyt@gmail.com" 
                className="flex items-center px-4 py-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg font-medium text-[var(--text-color)] hover:bg-[var(--card-hover)] transition-all duration-300"
              >
                <FaEnvelope className="mr-2" />
                Contact Me
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="neon-card rounded-xl p-6 border border-[var(--card-border)] bg-[var(--card-bg)]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-[var(--heading-color)] mb-4">Connect</h2>
            <div className="space-y-4">
              <a 
                href="https://www.linkedin.com/in/nikilesh-reddy-thatiparthi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-[var(--card-hover)] rounded-lg hover:bg-[var(--neon-color)] hover:bg-opacity-20 transition-all duration-300"
              >
                <FaLinkedin className="text-[var(--neon-color)] text-xl mr-3" />
                <span className="text-[var(--text-color)]">LinkedIn</span>
              </a>
              <a 
                href="https://github.com/NikileshReddyT" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-[var(--card-hover)] rounded-lg hover:bg-[var(--neon-color)] hover:bg-opacity-20 transition-all duration-300"
              >
                <FaGithub className="text-[var(--neon-color)] text-xl mr-3" />
                <span className="text-[var(--text-color)]">GitHub</span>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mb-16 neon-card rounded-xl p-6 border border-[var(--card-border)] bg-[var(--card-bg)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-[var(--heading-color)] mb-6 flex items-center">
            <FaCode className="mr-3 text-[var(--neon-color)]" />
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-[var(--text-color)]">{skill.name}</span>
                  <span className="text-[var(--text-secondary)]">{skill.level}%</span>
                </div>
                <div className="h-2 bg-[var(--card-hover)] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[var(--neon-color)] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div 
            className="neon-card rounded-xl p-6 border border-[var(--card-border)] bg-[var(--card-bg)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-[var(--heading-color)] mb-6 flex items-center">
              <FaGraduationCap className="mr-3 text-[var(--neon-color)]" />
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-[var(--neon-color)] pl-4 py-1">
                  <h3 className="text-xl font-bold text-[var(--heading-color)]">{edu.degree}</h3>
                  <p className="text-[var(--neon-color)] font-medium">{edu.institution}</p>
                  <p className="text-[var(--text-secondary)] text-sm mb-2">{edu.year}</p>
                  <p className="text-[var(--text-secondary)]">{edu.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="neon-card rounded-xl p-6 border border-[var(--card-border)] bg-[var(--card-bg)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-[var(--heading-color)] mb-6 flex items-center">
              <FaBriefcase className="mr-3 text-[var(--neon-color)]" />
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-[var(--neon-color)] pl-4 py-1">
                  <h3 className="text-xl font-bold text-[var(--heading-color)]">{exp.role}</h3>
                  <p className="text-[var(--neon-color)] font-medium">{exp.company}</p>
                  <p className="text-[var(--text-secondary)] text-sm mb-2">{exp.period}</p>
                  <p className="text-[var(--text-secondary)]">{exp.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="neon-card rounded-xl p-6 border border-[var(--card-border)] bg-[var(--card-bg)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-[var(--heading-color)] mb-6 flex items-center">
            <FaAward className="mr-3 text-[var(--neon-color)]" />
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-[var(--neon-color)] rounded-full mt-2 mr-3 flex-shrink-0" />
                <p className="text-[var(--text-color)]">{achievement}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
