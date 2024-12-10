'use client';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HeroSection = () => {
  return (
    <header id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--card-bg)] via-transparent to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-8" data-aos="fade-down" data-aos-delay="200">
          {/* Profile Image - Variation 1: Clean fade-in with subtle zoom */}
          <div
            className="mx-auto w-40 h-40 rounded-full relative group mb-8"
            data-aos="fade-in"
            data-aos-duration="1000"
            data-aos-delay="200"
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
              <img
                src="/profile.jpg"
                alt="Profile picture of Nikilesh"
                className="w-full h-full rounded-full object-cover shadow-[0_0_15px_rgba(var(--neon-rgb),0.5)]"
              />
            </div>
          </div>

          {/* Name - Variation 1: Clean fade-up with stagger */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight flex justify-center items-baseline gap-2">
            <span
              className="text-[var(--neon-color)] font-extrabold inline-block"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="400"
              data-aos-easing="ease-out-cubic"
            >
              Nikilesh
            </span>
            <span
              className="text-[var(--text-color)] font-bold inline-block"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="500"
              data-aos-easing="ease-out-cubic"
            >
              Reddy
            </span>
          </h1>

          {/* Alternative Professional Variations - Uncomment to try */}

          {/* Variation 2: Subtle slide-in from bottom */}
          {/*
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight overflow-hidden">
            <div className="flex justify-center items-baseline space-x-4">
              <span 
                className="text-[var(--neon-color)] font-extrabold"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="400"
                data-aos-easing="ease-out-quart"
              >
                Nikilesh
              </span>
              <span 
                className="text-[var(--text-color)] font-bold"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="600"
                data-aos-easing="ease-out-quart"
              >
                Reddy
              </span>
            </div>
          </h1>
          */}

          {/* Variation 3: Fade in place */}
          {/*
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
            <span 
              className="text-[var(--neon-color)] font-extrabold inline-block"
              data-aos="fade"
              data-aos-duration="1200"
              data-aos-delay="400"
              data-aos-easing="ease-in-out"
            >
              Nikilesh
            </span>
            <span 
              className="text-[var(--text-color)] font-bold inline-block"
              data-aos="fade"
              data-aos-duration="1200"
              data-aos-delay="600"
              data-aos-easing="ease-in-out"
            >
              {" "}Reddy
            </span>
          </h1>
          */}

          {/* Variation 4: Subtle scale */}
          {/*
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
            <span 
              className="text-[var(--neon-color)] font-extrabold inline-block opacity-0"
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="400"
              data-aos-easing="ease-out"
            >
              Nikilesh
            </span>
            <span 
              className="text-[var(--text-color)] font-bold inline-block opacity-0"
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="500"
              data-aos-easing="ease-out"
            >
              {" "}Reddy
            </span>
          </h1>
          */}

          {/* Profile Variations */}

          {/* Variation 2: Fade down */}
          {/*
          <div
            className="mx-auto w-40 h-40 rounded-full relative group mb-8"
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-delay="200"
            data-aos-easing="ease-out-cubic"
          >
          */}

          {/* Variation 3: Scale with fade */}
          {/*
          <div
            className="mx-auto w-40 h-40 rounded-full relative group mb-8"
            data-aos="zoom-in"
            data-aos-duration="1200"
            data-aos-delay="200"
            data-aos-easing="ease-out-quad"
          >
          */}

          {/* Variation 4: Subtle slide up */}
          {/*
          <div
            className="mx-auto w-40 h-40 rounded-full relative group mb-8"
            data-aos="slide-up"
            data-aos-duration="800"
            data-aos-delay="200"
            data-aos-easing="ease-out"
          >
          */}

          {/* Role */}
          <div
            className="text-2xl sm:text-3xl font-medium"
            data-aos="fade"
            data-aos-duration="1000"
            data-aos-delay="800"
          >
            <span className="text-[var(--text-color)]">I'm a </span>
            <TypeAnimation
              sequence={[
                'Computer Science Student',
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
              data-aos-duration="800"
              data-aos-delay="1000"
            >
              Passionate Full Stack Developer specializing in building modern web applications with React, Next.js, and cutting-edge technologies.
              Creating seamless user experiences and robust backend solutions.
            </p>
            <p
              className="text-lg text-[var(--text-color)] mb-6 sm:hidden"
              data-aos="fade"
              data-aos-duration="800"
              data-aos-delay="1000"
            >
              Full Stack Developer with expertise in React, Next.js, and backend systems, delivering modern, efficient, and user-focused applications.
            </p>

          </div>

          {/* Social Links */}
          <div
            className="flex justify-center gap-4 mt-8"
            data-aos="fade"
            data-aos-duration="800"
            data-aos-delay="1200"
          >
            <a
              href="https://wa.me/918639870053" target="_blank" rel="noopener noreferrer" className="text-[var(--text-color)] hover:text-[var(--neon-color)] transition-colors">
              <FaWhatsapp className="w-8 h-8" />
            </a>
            <a
              href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-color)] hover:text-[var(--neon-color)] transition-colors">
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
            data-aos-delay="1400"
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
