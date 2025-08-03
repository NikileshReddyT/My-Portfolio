export const projects = [
  {
    title: 'Exit Requirement Portal',
    description: 'A comprehensive portal designed to streamline the exit requirement process for students and faculty. It provides real-time tracking of course completion status across various categories and generates detailed reports, enhancing academic management efficiency.',
    image: '/projects/exitportal.png',
    images: ['/projects/exitportal.png'],
    technologies: ['React', 'Spring Boot', 'MySQL', 'Vercel', 'Railway', 'AWS'],
    githubLink: 'https://github.com/NikileshReddyT/Exit-Portal-Requirement-KLU',
    demoLink: 'https://exitportal-klu.vercel.app/',
    features: [
      'Real-time tracking of course completion status',
      'Automated report generation for faculty',
      'Student dashboard with progress visualization',
      'Admin panel for managing academic requirements',
      'Secure authentication and role-based access control'
    ],
    challenges: [
      'Implementing complex academic requirement logic',
      'Ensuring data consistency across multiple systems',
      'Optimizing database queries for large datasets',
      'Creating intuitive UI for complex academic workflows'
    ]
  },
  {
    title: 'E-Commerce Platform',
    description: 'An innovative agriculture e-commerce platform connecting farmers directly with consumers. Features include real-time crop tracking, seasonal forecasts, and a user-friendly marketplace for fresh produce.',
    image: '/projects/ecommerce.png',
    images: ['/projects/ecommerce.png'],
    technologies: ['React.js', 'Spring Boot', 'MySQL', 'Netlify'],
    githubLink: 'https://github.com/NikileshReddyT/Farm-Fresh-Ecommerce-Website',
    demoLink: 'https://farm-trade.netlify.app/',
    features: [
      'Direct farmer-to-consumer marketplace with secure payments',
      'Real-time crop tracking and seasonal forecasts for farmers',
      'Inventory management system for produce',
      'User reviews and ratings to build trust'
    ],
    challenges: [
      'Integrating real-time weather and crop data APIs accurately',
      'Building a secure and reliable payment processing system',
      'Optimizing the platform for users with low internet connectivity in rural areas'
    ]
  },
  {
    title: 'Attendance Calculator',
    description: 'An advanced Attendance Calculator for students to manage their attendance records, with LTPS tracking and intelligent suggestions to maintain desired attendance levels.',
    image: '/projects/attendance.png',
    images: ['/projects/attendance.png'],
    technologies: ['React.js', 'Figma', 'Tailwind CSS'],
    githubLink: 'https://github.com/NikileshReddyT/Attendance-Calculator-using-React',
    demoLink: 'https://klattcalculator.netlify.app/',
    features: [
      'LTPS (Lecture, Tutorial, Practical, Skill) attendance tracking',
      'Real-time calculation of attendance percentages',
      'Intelligent suggestions on classes to attend or skip',
      'Visual progress charts and data export'
    ],
    challenges: [
      'Accurately modeling the complex and varied attendance rules of the university',
      'Designing an intuitive and fast user interface for complex data input',
      'Ensuring calculations are instant and accurate as the user inputs data'
    ]
  },
  {
    title: 'Sentiment Analysis',
    description: 'A system that analyzes text to determine its sentiment using the Gemini API, providing real-time insights and visual feedback.',
    image: '/projects/sentiment.png',
    images: ['/projects/sentiment.png'],
    technologies: ['React.js', 'Gemini API', 'Netlify'],
    githubLink: 'https://github.com/NikileshReddyT/Sentiment-Analysis-Gemini-API',
    demoLink: 'https://sentimentanalizer.netlify.app/',
    features: [
      'Real-time sentiment analysis of user-provided text',
      'Visual representation of sentiment scores (positive, negative, neutral)',
      'Handles batch processing for analyzing multiple texts at once',
      'Securely communicates with the Gemini API via a serverless function'
    ],
    challenges: [
      'Integrating with the Gemini API and handling its responses effectively',
      'Optimizing API calls to manage costs and stay within rate limits',
      'Preprocessing and cleaning text to improve analysis accuracy'
    ]
  },
  {
    title: 'AI Image Generator',
    description: 'An AI-powered image generation tool using the Pollination API to create unique visual content from text prompts.',
    image: '/projects/aiimggen.png',
    images: ['/projects/aiimggen.png'],
    technologies: ['React.js', 'Pollination API', 'Netlify'],
    githubLink: 'https://github.com/NikileshReddyT/AI_Image_Generation',
    demoLink: 'https://fabulous-dodol-85d593.netlify.app/',
    features: [
      'Text-to-image generation with customizable parameters (style, size)',
      'A gallery to view and download previously generated images',
      'History of user prompts for easy reuse',
      'Real-time feedback on image generation progress'
    ],
    challenges: [
      'Effectively integrating with the Pollination API for image generation',
      'Managing and displaying large image data efficiently',
      'Creating an intuitive interface for users to write effective prompts'
    ]
  },
  {
    title: 'Event Management System',
    description: 'A full-stack MERN application that simplifies event planning, scheduling, and attendee registration.',
    image: '/projects/event.png',
    images: ['/projects/event.png'],
    technologies: ['React.js', 'Express.js', 'Node.js', 'MongoDB'],
    githubLink: 'https://github.com/NikileshReddyT/Mern-stack-hackathon-project',
    demoLink: 'https://mernfront-dmoz.onrender.com/',
    features: [
      'User-friendly event creation and scheduling interface',
      'Seamless attendee registration and ticketing system',
      'Real-time event updates and notifications for attendees',
      'Dashboard for organizers with event analytics'
    ],
    challenges: [
      'Implementing a real-time notification system for event updates',
      'Ensuring data security for user and payment information',
      'Managing concurrent user access during popular event registrations'
    ]
  },
  {
    title: 'ERP Portal',
    description: 'A comprehensive ERP system for managing inventory, sales, and accounting, built with React and Spring Boot.',
    image: '/projects/erp.png',
    images: ['/projects/erp.png'],
    technologies: ['React.js', 'Spring Boot', 'MySQL', 'Netlify'],
    githubLink: 'https://github.com/NikileshReddyT/ERP-PORTAL',
    demoLink: 'https://klerp.netlify.app/',
    features: [
      'Real-time inventory tracking across multiple locations',
      'Automated sales and revenue reporting with visualizations',
      'Integrated accounting management system',
      'Role-based access control for different user levels'
    ],
    challenges: [
      'Integrating multiple business modules (inventory, sales, accounting) seamlessly',
      'Ensuring data consistency and accuracy across the entire system',
      'Optimizing database performance for a large number of transactions'
    ]
  }
];