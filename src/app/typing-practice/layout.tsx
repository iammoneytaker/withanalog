import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '키보드 타자 연습 | WithAnalog - 실시간 WPM 측정 및 정확도 분석',
  description: '실시간 WPM(분당 단어수) 측정과 정확도 분석으로 체계적인 타자 실력 향상을 도와드립니다. 새로 구매한 키보드 적응과 타이핑 스킬 개발에 최적화된 무료 온라인 타자 연습 도구입니다.',
  keywords: [
    '타자 연습',
    '키보드 타자',
    'WPM 측정',
    '타이핑 연습',
    '타자 속도 측정',
    '키보드 연습',
    '한글 타자',
    '타이핑 테스트',
    '키보드 적응',
    '타자 실력 향상',
    '온라인 타자 연습',
    '무료 타자 연습'
  ],
  authors: [{ name: 'WithAnalog' }],
  creator: 'WithAnalog',
  publisher: 'WithAnalog',
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
  openGraph: {
    title: '키보드 타자 연습 | WithAnalog - 실시간 WPM 측정',
    description: '실시간 WPM 측정과 정확도 분석으로 체계적인 타자 실력 향상. 새 키보드 적응에 최적화된 무료 온라인 타자 연습 도구',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'WithAnalog',
  },
  twitter: {
    card: 'summary_large_image',
    title: '키보드 타자 연습 | WithAnalog',
    description: '실시간 WPM 측정과 정확도 분석으로 체계적인 타자 실력 향상',
  },
  alternates: {
    canonical: 'https://withanalog.com/typing-practice',
  },
  category: 'technology',
};

export default function TypingPracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}