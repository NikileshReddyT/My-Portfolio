import { Inter } from 'next/font/google';
import "../styles/globals.css";
import ClientLayout from './ClientLayout';
import { metadata as siteMetadata, structuredData } from './metadata';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StagewiseClientToolbar from '../components/StagewiseClientToolbar';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

export const metadata = siteMetadata;

export default function RootLayout({ children }) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-R9YJDLEBQB" />
        <ClientLayout>
          {children}
          {isDevelopment && <StagewiseClientToolbar />}
          <Analytics />
          <SpeedInsights />
        </ClientLayout>
      </body>
    </html>
  );
}
