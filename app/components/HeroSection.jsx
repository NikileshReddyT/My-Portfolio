'use client';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--card-bg)] via-transparent to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-8" data-aos="fade-down" data-aos-delay="200">
          {/* Profile Image */}
          <div
            className="mx-auto w-40 h-40 rounded-full p-2 mb-8 relative"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            <div className="absolute inset-0 rounded-full bg-[var(--neon-color)] opacity-20" />
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-2 border-[var(--neon-color)]"
            />
          </div>

          {/* Name */}
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <span className="text-[var(--neon-color)] font-extrabold">Nikilesh</span>{' '}
            <span className="text-[var(--text-color)] font-bold">Reddy</span>
          </h1>

          {/* Role */}
          <div
            className="text-2xl sm:text-3xl font-medium"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <span className="text-[var(--text-color)]">I'm a </span>
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                1000,
                'UI/UX Designer',
                1000,
                'Problem Solver',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-[var(--neon-color)] font-bold"
            />
          </div>

          {/* Description */}
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto text-[var(--text-color)] leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            Passionate about creating beautiful, functional, and user-friendly applications
            that solve real-world problems.
          </p>

          {/* Social Links */}
          <div
            className="flex justify-center gap-6 mb-8"
            data-aos="fade-up"
            data-aos-delay="1000"
          >
            {[
              { icon: <FaGithub className="w-7 h-7" />, href: "https://github.com/NikileshReddyT" },
              { icon: <FaLinkedin className="w-7 h-7" />, href: "https://linkedin.com/in/nikilesh-reddy-thatiparthi" },
              { icon: <FaTwitter className="w-7 h-7" />, href: "https://twitter.com" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-color)] hover:text-[var(--neon-color)] transition-colors hover:scale-110"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
            data-aos="fade-up"
            data-aos-delay="1200"
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
    </section>
  );
};

export default HeroSection;
