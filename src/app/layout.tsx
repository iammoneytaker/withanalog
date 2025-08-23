import { Metadata } from 'next';
import './globals.css';
import '../styles/marquee.css';
import Header from '../components/Header';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { GlobalKeyboardSound } from '@/components/GlobalKeyboardSound';
import { KeyboardSoundController } from '@/components/KeyboardSoundController';
import { AffiliateNotice } from '@/components/AffiliateNotice';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';

export const metadata: Metadata = {
  metadataBase: new URL('https://withanalog.com'),
  title: {
    template: '%s | WithAnalog',
    default: 'WithAnalog - 키보드와 타이핑의 새로운 경험',
  },
  description: '키보드 성능 테스트, 타이핑 연습, 반응속도 측정까지. 디지털과 현실을 잇는 키보드 전문 플랫폼',
  keywords: ['키보드 테스트', '키보드 성능', '타이핑 연습', '타자 연습', '한글 타자', '영문 타자', 'WPM 측정', '타자 속도', '키보드 타자 연습', '반응속도', '키보드 분석', 'keyboard test', 'typing test', 'typing practice'],
  openGraph: {
    title: 'WithAnalog - 키보드와 타이핑의 새로운 경험',
    description: '키보드 성능 테스트, 타이핑 연습, 반응속도 측정까지. 디지털과 현실을 잇는 키보드 전문 플랫폼',
    url: 'https://withanalog.com',
    siteName: 'WithAnalog',
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
    title: 'WithAnalog - 키보드와 타이핑의 새로운 경험',
    description: '키보드 성능 테스트, 타이핑 연습, 반응속도 측정까지. 디지털과 현실을 잇는 키보드 전문 플랫폼',
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
        <meta name="naver-site-verification" content="bc09def2369bed5f712be5ba69ad77f163e6ab90" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <GoogleAnalytics />
      </head>
      <body className="bg-gray-900 text-gray-300">
        <ThemeProvider>
          <GlobalKeyboardSound />
          <KeyboardSoundController />
          <ThemeToggle />
          <AffiliateNotice />
          <Header />
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
