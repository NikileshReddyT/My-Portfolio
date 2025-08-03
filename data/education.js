import { FaGraduationCap, FaUniversity, FaSchool } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';

export const educationData = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    specialization: "Application Development",
    institution: "KL University",
    location: "Vijayawada",
    duration: "2023 - 2026",
    status: "Current",
    gpa: "9.55/10",
    coursework: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Full-Stack Development",
    ],
    icon: FaUniversity,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    degree: "BBA (Online)",
    specialization: "Business Analytics",
    institution: "KL University",
    location: "Vijayawada",
    duration: "2023 - 2026",
    status: "Current",
    gpa: "8.5/10",
    coursework: [
      "Business Analytics",
      "Financial Management",
      "Marketing Strategy"
    ],
    icon: HiAcademicCap,
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    degree: "Diploma",
    specialization: "Electricals and Electronics Engineering",
    institution: "Sri durga devi polytechnic college",
    location: "Kavaraipettai",
    duration: "2020 - 2023",
    status: "Completed",
    gpa: "96%",
    coursework: [
      "Control of Electrical Machines",
      "Power Electronics",
      "Analog & Digital Electronics",
    ],
    icon: FaGraduationCap,
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    degree: "Secondary School",
    specialization: "General Sciences",
    institution: "Padmavathi Vidyalaya",
    location: "Sullurpeta",
    duration: "2018 - 2020",
    status: "Completed",
    gpa: "8/10",
    coursework: [
      "Mathematics",
      "Science",
      "Social Studies",
      "English",
    ],
    icon: FaSchool,
    color: "from-amber-500/20 to-orange-500/20"
  }
];
