import { Inter } from 'next/font/google';
import "./globals.css";
import ClientLayout from './ClientLayout';
import { metadata as siteMetadata } from './metadata';

const inter = Inter({ subsets: ['latin'] });

export const metadata = siteMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
