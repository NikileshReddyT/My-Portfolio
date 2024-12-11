import { 
  FaReact, FaNodeJs, FaPython, FaJava, FaGitAlt, FaDocker, 
  FaCode, FaServer, FaAws, FaHtml5, FaCss3
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, 
  SiMysql, SiFirebase, SiSpringboot, SiDjango, SiNetlify
} from 'react-icons/si';

export const skillCategories = [
  {
    title: 'Programming Languages',
    icon: FaCode,
    skills: [
      { name: 'JavaScript', icon: FaCode, level: 95 },
      { name: 'Python', icon: FaPython, level: 90 },
      { name: 'Java', icon: FaJava, level: 90 },
      { name: 'C', icon: FaCode, level: 80 },
      { name: 'Dart', icon: FaCode, level: 70 },
    ]
  },
  {
    title: 'Frontend Development',
    icon: FaCode,
    skills: [
      { name: 'React', icon: FaReact, level: 90 },
      { name: 'Next.js', icon: SiNextdotjs, level: 85 },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 95 },
      { name: 'HTML', icon: FaHtml5, level: 95 },
      { name: 'CSS', icon: FaCss3, level: 90 },
      // { name: 'Responsive Design', icon: FaCode, level: 85 },
    ]
  },
  {
    title: 'Backend Development',
    icon: FaServer,
    skills: [
      { name: 'Spring Boot', icon: SiSpringboot, level: 85 },
      { name: 'Node.js', icon: FaNodeJs, level: 85 },
      { name: 'Express', icon: FaServer, level: 80 },
      { name: 'Django', icon: SiDjango, level: 75 },
      { name: 'RESTful API Design', icon: FaServer, level: 90 },
    ]
  },
  {
    title: 'Database Management',
    icon: SiPostgresql,
    skills: [
      { name: 'MongoDB', icon: SiMongodb, level: 80 },
      { name: 'MongoDB Compass', icon: SiMongodb, level: 70 },
      { name: 'PostgreSQL', icon: SiPostgresql, level: 75 },
      { name: 'MySQL', icon: SiMysql, level: 80 },
      { name: 'Firebase', icon: SiFirebase, level: 85 },
    ]
  },
  {
    title: 'Tools & Cloud Deployment',
    icon: FaDocker,
    skills: [
      { name: 'Git/GitHub', icon: FaGitAlt, level: 90 },
      { name: 'VS Code', icon: FaCode, level: 85 },
      { name: 'Docker', icon: FaDocker, level: 80 },
      { name: 'AWS', icon: FaAws, level: 75 },
      { name: 'Netlify', icon: SiNetlify, level: 80 },
    ]
  },
  {
    title: 'Soft Skills',
    icon: FaCode,
    skills: [
      { name: 'Leadership', icon: FaCode, level: 90 },
      { name: 'Problem-Solving', icon: FaCode, level: 95 },
      { name: 'Team Collaboration', icon: FaCode, level: 85 },
      { name: 'Time Management', icon: FaCode, level: 85 },
      { name: 'Critical Thinking', icon: FaCode, level: 90 },
    ]
  }
];
