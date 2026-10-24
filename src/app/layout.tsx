import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClickTracker from '@/components/ClickTracker';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | 파크골프채·풀세트 비교 가이드`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  alternates: { canonical: '/', types: { 'application/rss+xml': '/rss.xml' } },
  openGraph: { type: 'website', siteName: SITE.name, locale: 'ko_KR', url: SITE.url },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
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
            publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url, email: SITE.email },
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
