import type { Guide } from "./types";
import { aulaSeries } from "./aula-series";
import { keyboardLatency } from "./keyboard-latency";
import { kpsCps } from "./kps-cps";
import { rapidTrigger } from "./rapid-trigger";
import { pollingRate } from "./polling-rate";
import { keyboardInput } from "./keyboard-input";

export type { Guide, GuideSection, GuideFaq } from "./types";

export const guides: readonly Guide[] = [
	aulaSeries,
	keyboardLatency,
	kpsCps,
	rapidTrigger,
	pollingRate,
	keyboardInput,
];

export function findGuide(slug: string) {
	return guides.find((guide) => guide.slug === slug);
}
