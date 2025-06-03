import type { Metadata } from 'next';
import { Fira_Code, Space_Grotesk } from 'next/font/google';
import { Providers } from '@/components/providers';
import './globals.css';

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Neel Chandwani | Developer',
  description: 'Personal portfolio of Neel Chandwani - A passionate developer building digital experiences',
  keywords: [
    'Neel Chandwani',
    'Developer',
    'Portfolio',
    'Web Developer',
    'Software Engineer',
    'React',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: 'Neel Chandwani' }],
  themeColor: '#0a0e17',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://neelchandwani.com',
    title: 'Neel Chandwani | Developer',
    description: 'Personal portfolio of Neel Chandwani - A passionate developer building digital experiences',
    siteName: 'Neel Chandwani',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neel Chandwani | Developer',
    description: 'Personal portfolio of Neel Chandwani - A passionate developer building digital experiences',
    creator: '@neelchandwani',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${firaCode.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
