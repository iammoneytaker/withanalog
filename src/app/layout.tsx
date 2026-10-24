import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClickTracker from '@/components/ClickTracker';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | 파크골프채·풀세트 비교 가이드`, template: `%s | 위드아날로그` },
  description: SITE.description,
  alternates: { canonical: '/', types: { 'application/rss+xml': '/rss.xml' } },
  openGraph: { type: 'website', siteName: SITE.name, locale: 'ko_KR', url: SITE.url, images: [{ url: '/images/og-default.jpg', width: 1200, height: 675, alt: '파크골프장 풍경 (AI 생성 이미지)' }] },
  twitter: { card: 'summary_large_image', images: ['/images/og-default.jpg'] },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
  verification: { other: { 'naver-site-verification': 'b336406ddbe3d2c8581a7ce067f34ae81b862c53' } },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1f6f43',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE.name,
            url: SITE.url,
            inLanguage: 'ko-KR',
            publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url, email: SITE.email, logo: `${SITE.url}/favicon.svg` },
          }}
        />
        <Header />
        <main className="wrap main">{children}</main>
        <Footer />
        <ClickTracker />
      </body>
    </html>
  );
}
