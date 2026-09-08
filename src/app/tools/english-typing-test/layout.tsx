import type { ReactNode } from 'react';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('/tools/english-typing-test', '영문 타이핑 테스트 · 속도와 정확도', '영문 문장을 입력하며 타이핑 속도와 정확도를 연습하세요.');
export default function Layout({ children }: { readonly children: ReactNode }) { return children; }
