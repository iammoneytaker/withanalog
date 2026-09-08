import type { ReactNode } from 'react';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('/story', 'WithAnalog 소개', '키보드와 디지털 도구를 탐구하는 WithAnalog 이야기.');
export default function Layout({ children }: { readonly children: ReactNode }) { return children; }
