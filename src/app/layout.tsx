import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';

export const metadata: Metadata = {
  title: '광고 없는 앱 100개 만들기 | 위드아날로그',
  description: '더 나은 디지털 경험을 위한 광고 없는 앱 100개 만들기 프로젝트',
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
      </body>
    </html>
  );
}
