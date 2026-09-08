import type { ReactNode } from 'react';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('/tools/keyboard-sound-test', '키보드 소리 사이트 · 스위치 타건음 듣기', '키보드 스위치의 타건음 샘플을 들어보세요. 실제 내 키보드의 소음을 측정하는 도구는 아닙니다.');
export default function Layout({ children }: { readonly children: ReactNode }) { return children; }
