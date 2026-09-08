import Link from "next/link";
import { Shell, styles, KeyboardArt, JsonLd } from "@/components/catalog/Shell";
import { ProductCard } from "@/components/catalog/ProductCard";
import { keyboards } from "@/lib/keyboards";
import { pageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = pageMetadata(
	"/",
	"키보드 테스트와 독거미·지클릭커 비교",
	"키보드 입력·KPS 테스트와 독거미 AULA·지클릭커 비교. 제품별 공개 스펙, 가격대, 측정 조건과 출처를 확인하세요.",
);

export default function Home() {
	return (
		<Shell>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "WebSite",
					name: "WithAnalog",
					alternateName: "위드아날로그",
					url: SITE_URL,
					inLanguage: "ko-KR",
				}}
			/>
			<section className={styles.hero}>
				<div>
					<p className={styles.eyebrow}>KEYBOARD RESEARCH / 01</p>
					<h1 className={styles.title}>
						손끝의 차이,
						<br />
						근거로 비교하다.
					</h1>
					<p className={styles.lead}>
						내 키보드는 직접 테스트하고,
						<br />
						다음 키보드는 출처가 있는 데이터로 고르세요.
					</p>
					<div className={styles.actions}>
						<Link
							className={styles.button}
							href="/tools/keyboard-performance-test"
						>
							내 키보드 테스트 ↗
						</Link>
						<Link className={styles.secondary} href="/compare">
							키보드 비교하기
						</Link>
					</div>
					<p className={styles.meta}>
						독거미 AULA와 지클릭커를 다룹니다. 공개 스펙과 실측은 구분합니다.
					</p>
				</div>
				<KeyboardArt />
			</section>
			<div className={styles.stats}>
				<div>
					<strong>10</strong>
					<span>출처를 정리한 키보드 모델</span>
				</div>
				<div>
					<strong>03</strong>
					<span>연결 모드를 구분해 비교</span>
				</div>
				<div>
					<strong>출처 공개</strong>
					<span>숫자마다 확인할 수 있는 근거</span>
				</div>
			</div>
			<section className={styles.section}>
				<div className={styles.sectionHead}>
					<h2>어떤 키보드가 맞을까요?</h2>
					<Link href="/keyboards">도감 전체 보기 ↗</Link>
				</div>
				<div className={styles.grid}>
					{keyboards.slice(0, 3).map((product) => (
						<ProductCard key={product.slug} product={product} />
					))}
				</div>
			</section>
			<section className={styles.section}>
				<h2>지금 확인하고 싶은 것은?</h2>
				<div className={styles.grid}>
					{[
						[
							"/tools/keyboard-input-test",
							"키가 제대로 눌리나요?",
							"키 인식과 동시입력을 직접 확인하세요.",
						],
						[
							"/tools/kps-test",
							"초당 몇 번 누르나요?",
							"10초 동안의 KPS·CPS를 측정하세요.",
						],
						[
							"/guides/keyboard-latency",
							"반응속도 숫자가 궁금한가요?",
							"입력 지연과 사람의 반응시간을 구분하세요.",
						],
					].map(([href, title, description]) => (
						<Link href={href} className={styles.card} key={href}>
							<h3>{title}</h3>
							<p>{description}</p>
							<span className={styles.textLink}>확인하기 ↗</span>
						</Link>
					))}
				</div>
			</section>
			<section className={styles.section}>
				<p className={styles.eyebrow}>EVIDENCE, BEFORE RANKINGS</p>
				<h2>모르는 숫자를 채우지 않습니다.</h2>
				<p className={styles.lead}>
					스펙, 판매처의 성능 주장, 독립적인 실측은 서로 다릅니다. 측정 조건이
					확인되지 않은 값으로 가장 빠른 키보드를 정하지 않습니다.
				</p>
				<Link className={styles.textLink} href="/methodology">
					측정과 편집 기준 읽기 ↗
				</Link>
			</section>
		</Shell>
	);
}
