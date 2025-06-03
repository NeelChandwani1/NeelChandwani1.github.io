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

// Generate metadata for better SEO and social sharing
export async function generateMetadata(): Promise<Metadata> {
  const title = 'Neel Chandwani | Developer';
  const description = 'Personal portfolio of Neel Chandwani - A passionate developer building digital experiences';
  const url = 'https://neelchandwani1.github.io';

  return {
    title,
    description,
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
    creator: 'Neel Chandwani',
    publisher: 'Neel Chandwani',
    themeColor: '#0a0e17',
    metadataBase: new URL(url),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title,
      description,
      siteName: 'Neel Chandwani',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@neelchandwani',
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
  };
}

// This is required for static export
export const dynamic = 'force-static';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#0a0e17',
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
