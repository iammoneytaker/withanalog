import type { ReactNode } from 'react';
import { pageMetadata } from '@/lib/seo';
import { ToolExplainer } from '@/components/catalog/ToolExplainer';
export const metadata = pageMetadata('/tools/keyboard-performance-test', '키보드 성능 테스트 · APM·CPS·키별 응답', '텐키리스·풀사이즈 가상 키보드에서 APM, CPS, 키별 눌림 시간을 측정합니다. 브라우저가 받은 키 이벤트 기준이며 하드웨어 지연 측정이 아닙니다.');
export default function Layout({ children }: { readonly children: ReactNode }) {
	return (
		<>
			{children}
			<ToolExplainer path="/tools/keyboard-performance-test" variant="surface" />
		</>
	);
}
