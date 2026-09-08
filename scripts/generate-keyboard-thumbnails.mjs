import { writeFileSync } from "node:fs";
const models = [
	{
		slug: "aula-f65",
		name: "F65",
		rows: [15, 15, 14, 14, 9],
		color: "#9ec4ba",
		label: "65% · 67 KEYS",
	},
	{
		slug: "aula-f75",
		name: "F75",
		rows: [13, 15, 15, 14, 14, 9],
		color: "#b8c8df",
		label: "75% · 80 KEYS",
		knob: true,
	},
	{
		slug: "aula-f75-max",
		name: "F75 MAX",
		rows: [13, 15, 15, 14, 14, 9],
		color: "#b9afd1",
		label: "75% · 80 KEYS",
		knob: true,
		screen: true,
	},
	{
		slug: "aula-f87-pro",
		name: "F87 Pro",
		rows: [16, 17, 17, 16, 12, 9],
		color: "#bec8a4",
		label: "TKL · 87 KEYS",
	},
	{
		slug: "aula-f99",
		name: "F99",
		rows: [16, 19, 19, 18, 16, 11],
		color: "#d0bca2",
		label: "NUMPAD · 99 KEYS",
	},
	{
		slug: "aula-f99-pro",
		name: "F99 PRO",
		rows: [17, 19, 19, 18, 16, 11],
		color: "#aebbc2",
		label: "NUMPAD · 100 KEYS",
	},
];
for (const model of models) {
	const keys = [];
	const unit = 22;
	const gap = 4;
	const rowWidth = Math.max(...model.rows) * 26;
	const left = (640 - rowWidth) / 2;
	const top = 90 + (6 - model.rows.length) * 13;
	for (let row = 0; row < model.rows.length; row++) {
		const count = model.rows[row];
		let x = left;
		const extra = rowWidth - count * 26;
		for (let col = 0; col < count; col++) {
			const space = row === model.rows.length - 1 && col === 3;
			const width = unit + (space ? extra : 0);
			const accent = col === 0 || (row === 0 && col === count - 1);
			keys.push(
				`<rect x="${x}" y="${top + row * 29}" width="${width}" height="25" rx="4" fill="#111318"/><rect x="${x}" y="${top + row * 29}" width="${width}" height="22" rx="4" fill="${accent ? model.color : "#e1e0dc"}"/><path d="M${x + 5} ${top + row * 29 + 5}h${width - 10}" stroke="#ffffff" stroke-opacity=".32" stroke-width="1"/>`,
			);
			x += width + gap;
		}
	}
	const controlX = left + rowWidth - 10;
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="640" height="360"><title>AULA ${model.name} layout illustration</title><desc>Original WithAnalog schematic. Not a product photograph; colors and dimensions are illustrative.</desc><defs><radialGradient id="bg"><stop stop-color="#30363c"/><stop offset="1" stop-color="#17191d"/></radialGradient><linearGradient id="case" x2="0" y2="1"><stop stop-color="#555a62"/><stop offset="1" stop-color="#2b2f35"/></linearGradient></defs><rect width="640" height="360" rx="16" fill="url(#bg)"/><ellipse cx="320" cy="281" rx="${rowWidth / 2 + 12}" ry="24" fill="#090a0c" opacity=".6"/><g transform="translate(0 -3)"><rect x="${left - 16}" y="${top - 18}" width="${rowWidth + 28}" height="${model.rows.length * 29 + 29}" rx="14" fill="#0c0e10"/><rect x="${left - 16}" y="${top - 24}" width="${rowWidth + 28}" height="${model.rows.length * 29 + 29}" rx="14" fill="url(#case)" stroke="#686d74"/>${keys.join("")}${model.knob ? `<circle cx="${controlX}" cy="${top + 10}" r="10" fill="#3c4149" stroke="${model.color}" stroke-width="3"/>` : ""}${model.screen ? `<rect x="${controlX - 53}" y="${top + 2}" width="30" height="17" rx="3" fill="#10171e" stroke="#7e899e"/><path d="M${controlX - 49} ${top + 13}h22" stroke="${model.color}"/>` : ""}</g><text x="30" y="34" fill="${model.color}" font-family="Arial,sans-serif" font-size="12" letter-spacing="2">${model.label}</text><text x="30" y="330" fill="#f2f0ed" font-family="Arial,sans-serif" font-size="22">${model.name}</text><text x="610" y="329" text-anchor="end" fill="#999fa9" font-family="Arial,sans-serif" font-size="10" letter-spacing="1">WITHANALOG / LAYOUT STUDY</text></svg>`;
	writeFileSync(`public/images/keyboards/${model.slug}.svg`, svg);
}
