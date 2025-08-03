'use client';
import Image from "next/image";
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import components to reduce initial bundle size
const EducationSection = dynamic(() => import('../components/EducationSection'));
const SkillsSection = dynamic(() => import('../components/SkillsSection'));
const ProjectsSection = dynamic(() => import('../components/ProjectsSection'));
const ContactSection = dynamic(() => import('../components/ContactSection'));
const ThemeToggle = dynamic(() => import('../components/ThemeToggle'));
const ExperienceSection = dynamic(() => import('../components/ExperienceSection'));
const PreviewSections = dynamic(() => import('../components/PreviewSections'));
const ChatBot = dynamic(() => import('../components/ChatBot'), { ssr: false });

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
          <ChatBot/>
          <HeroSection />
          <EducationSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <PreviewSections />
          <ContactSection />
        </main>
        {/* <ThemeToggle /> */}
      </motion.div>
    </AnimatePresence>
  );
}
