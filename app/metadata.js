export const metadata = {
  applicationName: "Nikilesh Reddy's Portfolio",
  title: "Nikilesh Reddy | Full Stack Developer & AI Enthusiast",
  description: "Portfolio of Nikilesh Reddy, a Full Stack Developer and AI enthusiast with expertise in React, Next.js, Node.js, and machine learning. Explore projects, skills, and professional experience.",
  keywords: [
    "Nikilesh Reddy", "Nikilesh Reddy T", "Nikilesh Reddy Thatiparthi", "Nikilesh Thatiparthi",
    "Full Stack Developer", "AI Enthusiast", "React Developer",
    "Next.js Developer", "Node.js Developer", "Machine Learning", "Portfolio",
    "Web Developer", "JavaScript Developer", "Software Engineer", "KL University",
    "AI/ML Engineer", "Full-Stack Developer"
  ],
  authors: [{ name: "Nikilesh Reddy T", url: "https://nikileshreddyt.tech" }],
  creator: "Nikilesh Reddy T",
  publisher: "Nikilesh Reddy T",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://nikileshreddyt.tech",
  },
  openGraph: {
    title: "Nikilesh Reddy | Full Stack Developer & AI Enthusiast",
    description: "Portfolio of Nikilesh Reddy, a Full Stack Developer and AI enthusiast with expertise in React, Next.js, Node.js, and machine learning.",
    url: "https://nikileshreddyt.tech",
    siteName: "Nikilesh Reddy Portfolio",
    images: [
      {
        url: 'https://nikileshreddyt.tech/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Nikilesh Reddy Portfolio',
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikilesh Reddy | Full Stack Developer & AI Enthusiast",
    description: "Portfolio of Nikilesh Reddy, a Full Stack Developer and AI enthusiast with expertise in React, Next.js, Node.js, and machine learning.",
    creator: "@NikileshReddyT",
    images: ['https://nikileshreddyt.tech/og-image.svg'],
  },
  verification: {
    google: "BXvVuO8UsZkzRZ2OHebvc4ATK-T6Rta_twGqzfZSWI",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
    shortcut: '/android-chrome-192x192.png'
  }
};

// Structured data for improved SEO
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nikilesh Reddy T",
  "url": "https://nikileshreddyt.tech",
  "image": "https://nikileshreddyt.tech/profile.jpg",
  "jobTitle": "Full Stack Developer & AI Enthusiast",
  "description": "Nikilesh Reddy is a Full Stack Developer and AI enthusiast with expertise in React, Next.js, Node.js, and machine learning.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Vijayawada",
    "addressRegion": "Andhra Pradesh",
    "addressCountry": "India"
  },
  "email": "nikileshreddyt@gmail.com",
  "telephone": "+91-8639870053",
  "sameAs": [
    "https://www.linkedin.com/in/nikilesh-reddy-thatiparthi/",
    "https://github.com/NikileshReddyT",
    "https://twitter.com/NikileshReddyT"
  ],
  "knowsAbout": [
    "Web Development",
    "Full Stack Development",
    "React",
    "Next.js",
    "Node.js",
    "JavaScript",
    "Python",
    "Machine Learning",
    "AI",
    "Database Design"
  ],
  "alumniOf": [
    {
      "@type": "EducationalOrganization",
      "name": "KL University"
    },
    {
      "@type": "EducationalOrganization",
      "name": "Sri Durga Devi Polytechnic College"
    }
  ],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Full Stack Developer",
    "occupationLocation": {
      "@type": "Place",
      "name": "Vijayawada, Andhra Pradesh, India"
    }
  }
};
