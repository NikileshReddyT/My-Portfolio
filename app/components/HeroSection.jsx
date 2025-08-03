'use client';
import dynamic from 'next/dynamic';
const SplitText = dynamic(() => import('./ui/SplitText'));
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const HeroSection = () => {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // shorter delay so animations start almost immediately
    const timer = setTimeout(() => setIntroComplete(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header id="home" className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--card-bg)] via-transparent to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-6 mt-12">
          <motion.div
            layoutId="profile-picture"
            className={`mx-auto w-40 h-40 rounded-full relative group ${introComplete ? '' : 'mt-48 mb-24'}`}
            initial={{ scale: 1.3 }}
            animate={{ scale: introComplete ? 1 : 1.3, transition: { duration: 0.4 ,ease:'backInOut',stiffness:100,damping:10}}}
          > 
            {/* Outer glow effect */}
            <div
              className="absolute -inset-0.5 bg-[var(--neon-color)] rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity z-[1] animate-pulse"
            />
            {/* Inner glow */}
            <div
              className="absolute inset-0 rounded-full bg-[var(--neon-color)] opacity-20 z-[2]"
            />
            {/* Profile image */}
            <div className="relative rounded-full p-[1px] bg-[var(--neon-color)] z-[3]">
              <Image
                src="/profile.jpg"
                alt="Profile picture of Nikilesh Reddy T, Full Stack Developer and AI Enthusiast"
                width={160}
                height={160}
                sizes="(max-width: 640px) 160px, 200px"
                fetchPriority="high"
                className="w-full h-full rounded-full object-cover shadow-[0_0_15px_rgba(var(--neon-rgb),0.5)]"
                priority
              />
            </div>
          </motion.div>

          <motion.h1 layoutId="name" className="text-[45px] sm:text-7xl lg:text-8xl font-bold tracking-tight flex flex-wrap justify-center items-baseline mt-48 mb-24"
            initial={{ scale: 1.2 }}
            animate={{ scale: introComplete ? 1 : 1.1, transition: { duration: 0.8 ,ease:'backInOut', delay:0.4} }}>
            <SplitText 
              text="Nikilesh"
              className="text-[var(--neon-color)] font-extrabold"
              delay={0.05}
            />
            <SplitText 
              text=" Reddy"
              className="text-[var(--text-color)] font-bold"
              delay={0.05}
              animationDelay={0.4} // adjusted for 0.05s per letter
            />
          </motion.h1>
          {/* Hidden duplicate heading for early LCP */}
          <h1 className="absolute top-0 left-1/2 -translate-x-1/2 text-5xl sm:text-7xl lg:text-8xl font-bold opacity-0 pointer-events-none select-none">Nikilesh&nbsp;Reddy</h1>

          {/* Role */}
          <div
            className="text-2xl sm:text-3xl font-medium"
            data-aos="fade"
            data-aos-duration="1000"
            data-aos-delay="2000"
            style={{ visibility: introComplete ? 'visible' : 'hidden' }}
          >
            <span className="text-[var(--text-color)]">I'm a </span>
            <TypeAnimation
              sequence={[
                'CS Student',
                1000,
                'Full Stack Developer',
                1000,
                'UI/UX Designer',
                1000,
                'Application Developer',
                1000,
                'Problem Solver',
                1000,
                'Tech Enthusiast',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-[var(--neon-color)] font-bold"
            />
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto">
            <p
              className="text-lg text-[var(--text-color)] mb-6 sm:block hidden"
              data-aos="fade"
              data-aos-duration="1000"
              data-aos-delay="2300"
              style={{ visibility: introComplete ? 'visible' : 'hidden' }}
            >
              Passionate Full Stack Developer specializing in building modern web applications with React, Next.js, and cutting-edge technologies.
              Creating seamless user experiences and robust backend solutions.
            </p>
            <p
              className="text-lg text-[var(--text-color)] mb-6 sm:hidden"
              data-aos="fade"
              data-aos-duration="800"
              data-aos-delay="2300"
              style={{ visibility: introComplete ? 'visible' : 'hidden' }}
            >
              Full Stack Developer with expertise in React, Next.js, and backend systems, delivering modern, efficient, and user-focused applications.
            </p>

          </div>

          {/* Social Links */}
          <div
            className="flex justify-center gap-4 mt-8"
            data-aos="fade"
            data-aos-duration="800"
            data-aos-delay="2500"
            style={{ visibility: introComplete ? 'visible' : 'hidden' }}
          >
            <a
              href="https://wa.me/918639870053" target="_blank" rel="noopener noreferrer" className="text-[var(--text-color)] hover:text-[var(--neon-color)] transition-colors">
              <FaWhatsapp className="w-8 h-8" />
            </a>
            <a
              href="https://instagram.com/nikilesh_reddy_t/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-color)] hover:text-[var(--neon-color)] transition-colors">
              <FaInstagram className="w-8 h-8" />
            </a>
            <a
              href="https://twitter.com/NikileshReddyT" target="_blank" rel="noopener noreferrer" className="text-[var(--text-color)] hover:text-[var(--neon-color)] transition-colors">
              <FaTwitter className="w-8 h-8" />
            </a>
            <a
              href="https://linkedin.com/in/nikilesh-reddy-thatiparthi" target="_blank" rel="noopener noreferrer" className="text-[var(--text-color)] hover:text-[var(--neon-color)] transition-colors">
              <FaLinkedin className="w-8 h-8" />
            </a>
            <a
              href="https://github.com/NikileshReddyT" target="_blank" rel="noopener noreferrer" className="text-[var(--text-color)] hover:text-[var(--neon-color)] transition-colors">
              <FaGithub className="w-8 h-8" />
            </a>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
            data-aos="fade"
            data-aos-duration="800"
            data-aos-delay="2500"
            style={{ visibility: introComplete ? 'visible' : 'hidden' }}
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-[var(--neon-color)] text-[var(--button-text)] rounded-lg font-bold text-lg hover:opacity-90 transition-all shadow-[0_0_15px_rgba(var(--neon-rgb),0.3)] hover:shadow-[0_0_20px_rgba(var(--neon-rgb),0.4)] hover:scale-105"
            >
              View Projects
            </a>
            <a
              href="/Nikilesh_Resume2.pdf"
              download
              className="px-8 py-4 border-2 border-[var(--neon-color)] text-[var(--neon-color)] rounded-lg font-bold text-lg hover:bg-[var(--neon-color)] hover:text-[var(--button-text)] transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaDownload className="w-5 h-5" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
