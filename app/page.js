'use client';
import Image from "next/image";
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import ThemeToggle from './components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen"
      >
        <Navbar />
        <main className="flex flex-col">
          <HeroSection />
          <EducationSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        {/* <ThemeToggle /> */}
      </motion.div>
    </AnimatePresence>
  );
}
