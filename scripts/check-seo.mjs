import assert from "node:assert/strict";
const origin = process.argv[2] || "http://127.0.0.1:3010";
const site = "https://www.withanalog.com";
const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
assert(!sitemap.includes("/contact"));
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
	(match) => match[1],
);
assert(urls.length >= 25);
const titles = new Set();
const results = [];
for (const url of urls) {
	assert(url.startsWith(site));
	const path = new URL(url).pathname;
	const response = await fetch(`${origin}${path}`, { redirect: "manual" });
	assert.equal(response.status, 200, path);
	const html = await response.text();
	assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `${path}: h1`);
	assert(!/<meta name="robots" content="[^"]*noindex/.test(html), path);
	if (path !== "/tools/keyboard-performance-test") {
		const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
		assert.equal(
			canonical?.[1],
			`${site}${path === "/" ? "" : path}`,
			`${path}: canonical`,
		);
		const title = html.match(/<title>(.*?)<\/title>/)?.[1];
		assert(title && !titles.has(title), `${path}: unique title`);
		titles.add(title);
	}
	const schemas = [
		...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g),
	].map((match) => JSON.parse(match[1]));
	if (path.startsWith("/keyboards/")) {
		if (path.startsWith("/keyboards/aula-")) assert(html.includes("AULA Gear"));
		assert(schemas.some((value) => value["@type"] === "Product"));
	}
	results.push({ path, status: response.status, schemaCount: schemas.length });
}
for (const path of [
	"/keyboards/does-not-exist",
	"/guides/does-not-exist",
	"/compare/does-not-exist",
])
	assert.equal((await fetch(`${origin}${path}`)).status, 404, path);
for (const path of ["/recommendations", "/reviews"]) {
	const response = await fetch(`${origin}${path}`, { redirect: "manual" });
	assert.equal(response.status, 308);
	assert.equal(response.headers.get("location"), "/keyboards");
}
const temporary = await (
	await fetch(`${origin}/compare?models=bad,bad`)
).text();
assert(temporary.includes("noindex"));
assert(temporary.includes("F75"));
const robots = await (await fetch(`${origin}/robots.txt`)).text();
assert(robots.includes(`${site}/sitemap.xml`));
assert(robots.includes("/adminsangwon/"));
console.log(
	JSON.stringify(
		{
			passed: results.length,
			results,
			invalidRoutes: "404",
			redirects: "308",
			temporaryComparison: "noindex",
			robots: "passed",
		},
		null,
		2,
	),
);
