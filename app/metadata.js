export const metadata = {
  title: 'Nikilesh Reddy | Full Stack Developer',
  description: 'Full Stack Developer specializing in Next.js, React, and modern web technologies. View my portfolio showcasing web development projects, skills, and experience.',
  keywords: [
    'Nikilesh Reddy',
    'Full Stack Developer',
    'Web Developer',
    'React Developer',
    'Next.js Developer',
    'Portfolio',
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'JavaScript Developer',
  ],
  authors: [{ name: 'Nikilesh Reddy', url: 'https://github.com/NikileshReddyT' }],
  creator: 'Nikilesh Reddy',
  publisher: 'Nikilesh Reddy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Nikilesh Reddy | Full Stack Developer',
    description: 'Full Stack Developer specializing in Next.js, React, and modern web technologies. View my portfolio showcasing web development projects, skills, and experience.',
    url: 'https://nikileshreddy.netlify.app/',
    siteName: 'Nikilesh Reddy Portfolio',
    images: [
      {
        url: '/og-image.svg', // You'll need to add this image to your public folder
        width: 1200,
        height: 630,
        alt: 'Nikilesh Reddy - Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nikilesh Reddy | Full Stack Developer',
    description: 'Full Stack Developer specializing in Next.js, React, and modern web technologies. Check out my portfolio!',
    images: ['/og-image.svg'], // Same image as OpenGraph
    creator: '@NikileshReddyT', // Replace with your Twitter handle
  },
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
  verification: {
    google: 'qnvlog4h5tTYeyXdIStmcUH8pgCay1ltCM1tiMAexNA', // Add your Google Search Console verification code
  },
  alternates: {
    canonical: 'https://nikileshreddy.netlify.app/',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/android-chrome-192x192.png',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: '/site.webmanifest',
};
