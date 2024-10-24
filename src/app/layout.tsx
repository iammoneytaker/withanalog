import { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  metadataBase: new URL('https://withanalog.com'),
  title: {
    template: '%s | 위드아날로그',
    default: '위드아날로그 - 광고 없는 앱 100개 만들기',
  },
  description: '광고 없는 앱 100개 만들기 프로젝트',
  openGraph: {
    title: '위드아날로그',
    description: '광고 없는 앱 100개 만들기 프로젝트',
    url: 'https://withanalog.com',
    siteName: '위드아날로그',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '위드아날로그',
    description: '광고 없는 앱 100개 만들기 프로젝트',
    images: ['/images/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="bg-gray-900 text-gray-300">
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
