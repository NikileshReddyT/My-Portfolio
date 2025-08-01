import { Inter } from 'next/font/google';
import "./globals.css";
import ClientLayout from './ClientLayout';
import { metadata as siteMetadata } from './metadata';
import GoogleAnalytics from './components/GoogleAnalytics';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StagewiseClientToolbar from './components/StagewiseClientToolbar';





const inter = Inter({ subsets: ['latin'] });

export const metadata = siteMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-R9YJDLEBQB" />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          {children}
          <Analytics />
          <SpeedInsights />
        </ClientLayout>
        <StagewiseClientToolbar />
      </body>
    </html>
  );
}
