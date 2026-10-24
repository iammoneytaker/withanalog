#!/usr/bin/env node
/**
 * IndexNow 색인 요청 스크립트 (빙·네이버 등 IndexNow 참여 검색엔진 대상, 구글 미지원)
 * 키는 발급받는 값이 아니라 public/{KEY}.txt 로 호스팅된 임의 문자열입니다.
 *
 * 사용법:
 *   node scripts/submit-indexnow.mjs                # 사이트맵 전체 URL 제출
 *   node scripts/submit-indexnow.mjs /keyboards/xxx # 특정 경로만 제출
 */

const HOST = "www.withanalog.com";
const KEY = "a59741a29948d6a9c3ec392fdcd68242";
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function getSitemapUrls() {
	const res = await fetch(SITEMAP_URL);
	if (!res.ok) throw new Error(`사이트맵 로드 실패: ${res.status}`);
	const xml = await res.text();
	return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

const args = process.argv.slice(2);
const urlList =
	args.length > 0
		? args.map((path) => (path.startsWith("http") ? path : `https://${HOST}${path}`))
		: await getSitemapUrls();

console.log(`제출할 URL: ${urlList.length}개`);
const res = await fetch("https://api.indexnow.org/indexnow", {
	method: "POST",
	headers: { "Content-Type": "application/json; charset=utf-8" },
	body: JSON.stringify({
		host: HOST,
		key: KEY,
		keyLocation: `https://${HOST}/${KEY}.txt`,
		urlList,
	}),
});
console.log(`IndexNow 응답: ${res.status} ${res.statusText}`);
if (res.status !== 200 && res.status !== 202) {
	console.error(await res.text());
	process.exit(1);
}
console.log("제출 완료. 크롤링·색인을 보장하지는 않습니다.");
