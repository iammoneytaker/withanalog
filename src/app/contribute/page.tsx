import { Shell, styles, Breadcrumbs } from "@/components/catalog/Shell";
import { Contribution } from "@/components/catalog/Contribution";
import { keyboards } from "@/lib/keyboards";
import { pageMetadata } from "@/lib/seo";
export const metadata = {
	...pageMetadata(
		"/contribute",
		"키보드 데이터 정정 자료 작성",
		"제품 스펙의 출처와 수정 사항을 정리해 파일로 보관하세요.",
	),
	robots: { index: false, follow: true },
};
export default function ContributePage({
	searchParams,
}: {
	searchParams: { model?: string };
}) {
	const initialModel =
		keyboards.find((product) => product.slug === searchParams.model)?.slug ??
		keyboards[0].slug;
	return (
		<Shell>
			<Breadcrumbs items={[{ name: "데이터 정정", path: "/contribute" }]} />
			<p className={styles.eyebrow}>KEEP THE RECORD ACCURATE</p>
			<h1 className={styles.title}>더 정확한 자료가 있나요?</h1>
			<p className={styles.lead}>
				출처와 변경 내용을 정리해 파일로 저장할 수 있습니다. 온라인 접수·운영자
				승인 기능은 아직 연결되지 않았습니다. 이 페이지에서 저장해도 사이트에
				제출되지는 않습니다.
			</p>
			<Contribution initialModel={initialModel} />
		</Shell>
	);
}
