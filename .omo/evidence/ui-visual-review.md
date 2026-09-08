# Visual QA: REVISE

Confidence: HIGH for visible product findings; MEDIUM for incomplete animation captures.

Independent read-only visual/CJK review of all 58 PNG captures in `final-ui/manifest.json` (29 routes × desktop/mobile). All were opened through 15 contact sheets, with the sound mobile screenshot opened at full resolution. No exact reference target was supplied; comparison is to the requested cohesive dark neutral/orange design, single responsive header and preserved tester interfaces. No source edits made. This is the focused visual pass, not a functional test certification.

## Blocking findings

1. **[product] CJK wrapping:** `mobile-tools-keyboard-sound-test.png`, first bottom feature card at approximately y1456–1558: `있습니 / 다` leaves a lone final syllable. Source: `src/app/tools/keyboard-sound-test/page.tsx:51`. Keep Korean words intact or adjust card typography/padding so the ending remains together.
2. **[product] CJK wrapping:** `mobile-typing-practice.png`, sample text region around y420–600: `중요합 / 니다` splits a word mid-ending. Source: `src/app/typing-practice/page.tsx:158` and per-character rendering above it. Preserve word grouping while retaining character highlighting/input behavior.
3. **[product] Inconsistent tool palette:** `desktop-tools-keyboard-sound-test.png` player is navy with blue slider/button/selected borders; both sound captures have separate navy, green and purple feature cards. Source: `src/components/KeyboardSoundPlayer.tsx:153`, `:220`, `:240`, and `src/app/tools/keyboard-sound-test/page.tsx:49–57`. These are materially different from neutral panels and orange primary actions used by the rest of the redesigned tools. Apply the shared visual tokens while preserving sound behavior and semantic state colors where needed.
4. **[evidence] Incomplete animated content:** desktop and mobile captures of keyboard-performance-test, english-typing-test, ac54699f-e7e5-4075-8230-7ae6c604104a, 2f4712ba-2e77-4e5c-a418-c4f6d3a03787, and typing-practice omit most titles/panels. Mobile sound capture omits the entire player. Source uses `motion` nodes initially at opacity 0. The screenshots do not establish whether this is a timing/pipeline issue or persistent product failure. Re-capture settled content and inspect it before approval; do not infer a product defect merely from these frames.
5. **[evidence] Lazy catalog images:** desktop keyboards second row, mobile keyboards lower products, mobile home third card have blank white media boxes. Product detail captures prove corresponding assets exist. This matches full-page capture without loading offscreen images, not established broken assets. Scroll/load and re-shoot those captures.

## Good, keep it

Single compact header throughout, collapsed mobile menu trigger without duplicate navigation, clear orange primary actions on research/new input tools, consistent neutral borders and spacing, legible catalog and guide headings, and orderly single-column mobile cards. Comparison tables intentionally scroll horizontally and label that behavior; cropped right columns are not page overflow defects. Six product detail pages retain consistent structures and readable specification tables. No visible tofu, clipped baselines or accidental horizontal layout spill in the settled research surfaces.

## Coverage

The following statuses are visual-only. “Clear” means no blocking visible defect identified in that route’s captures; evidence limitations above still prevent a complete approving gate.

| Route | Desktop/mobile visual status |
|---|---|
| `/` | Lazy image evidence gap |
| `/keyboards` | Lazy image evidence gap |
| `/compare` | Clear |
| `/compare/aula-f75-vs-aula-f99` | Clear |
| `/guides` | Clear |
| `/methodology` | Clear |
| `/contribute` | Clear |
| `/tools` | Clear |
| `/tools/keyboard-input-test` | Clear |
| `/tools/kps-test` | Clear |
| `/tools/rapid-trigger-test` | Clear |
| `/tools/keyboard-performance-test` | Animated content evidence gap |
| `/tools/keyboard-sound-test` | CJK/palette blockers + mobile animation evidence gap |
| `/tools/english-typing-test` | Animated content evidence gap |
| `/tools/ac54699f-e7e5-4075-8230-7ae6c604104a` | Animated content evidence gap |
| `/tools/2f4712ba-2e77-4e5c-a418-c4f6d3a03787` | Animated content evidence gap |
| `/typing-practice` | CJK blocker + animated content evidence gap |
| `/keyboards/aula-f65` | Clear |
| `/keyboards/aula-f75` | Clear |
| `/keyboards/aula-f75-max` | Clear |
| `/keyboards/aula-f87-pro` | Clear |
| `/keyboards/aula-f99` | Clear |
| `/keyboards/aula-f99-pro` | Clear |
| `/guides/aula-series` | Clear |
| `/guides/keyboard-latency` | Clear |
| `/guides/kps-cps` | Clear |
| `/guides/rapid-trigger` | Clear |
| `/guides/polling-rate` | Clear |
| `/guides/keyboard-input` | Clear |

## Completion gate

Not satisfied. Resolve product findings and obtain complete settled captures. A fresh independent review must approve the resulting current build. Menu-open and active tester interaction states are not included in this manifest and need the separate functional/state QA evidence; this report does not certify them.
