'use client';

import Script from 'next/script';

export default function GoogleAdsense() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment) {
    return null;
  }

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5720611278808953"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
