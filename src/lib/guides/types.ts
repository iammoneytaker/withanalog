export type GuideSection = {
	readonly title: string;
	/** 문단 단위 본문. 각 문단은 2~5문장. */
	readonly paragraphs: readonly string[];
	/** 선택: 문단 뒤에 붙는 목록 항목 */
	readonly bullets?: readonly string[];
};

export type GuideFaq = {
	readonly question: string;
	readonly answer: string;
};

export type Guide = {
	readonly slug: string;
	readonly title: string;
	/** 검색 결과·카드에 쓰이는 2~3문장 요약(=answer-first 리드) */
	readonly answer: string;
	/** meta description (120~160자) */
	readonly description: string;
	readonly published: string;
	readonly updated: string;
	readonly sections: readonly GuideSection[];
	readonly faq: readonly GuideFaq[];
	readonly tool: string;
	readonly toolLabel: string;
	/** 본문에서 언급한 도감 모델 slug (관련 제품 링크용) */
	readonly relatedKeyboards: readonly string[];
	readonly sources: readonly { readonly title: string; readonly url: string }[];
};
