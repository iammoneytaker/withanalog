import type { ReactNode } from 'react';
import { pageMetadata } from '@/lib/seo';
import { ToolExplainer } from '@/components/catalog/ToolExplainer';
export const metadata = pageMetadata('/typing-practice', '한글 타자 연습 · 실시간 WPM과 정확도', '한글 문장을 입력하며 WPM과 정확도를 실시간으로 확인하는 타자 연습 도구입니다. 입력 내용은 서버로 전송되지 않습니다.');
export default function TypingPracticeLayout({ children }: { readonly children: ReactNode }) {
	return (
		<>
			{children}
			<ToolExplainer path="/typing-practice" variant="surface" />
		</>
	);
}
