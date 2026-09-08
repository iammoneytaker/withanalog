# Design-system and functional integrity review

VERDICT: REVISE
CONFIDENCE: HIGH for navigation and missing visual evidence; MEDIUM for remaining legacy tool styling.

Reviewed all 58 files in final-ui/manifest.json (29 routes at desktop/mobile) using eight contact sheets, then opened mobile English typing and typing-practice captures at readable resolution. Read Header, Shell, ToolSurface, catalog styles, tool layouts and animation declarations, affiliate LinkEditor and save action, and admin-navigation.md. No application source edited.

## Blocking findings

- [evidence] High — Both viewport captures of keyboard-performance-test, english-typing-test, ac54699f-e7e5-4075-8230-7ae6c604104a, and 2f4712ba-2e77-4e5c-a418-c4f6d3a03787 have absent headings and major tester panels. Typing-practice also lacks its heading/statistics; mobile keyboard-sound-test lacks the sound player despite desktop showing it. Source wraps those regions in Framer Motion `initial={{ opacity: 0 }}`. These frames cannot prove a settled functional tool surface. Determine whether the capture leaves animation frames pending, capture after real visibility/settlement, and if live browser remains blank treat it as a product defect. Do not claim these screenshots pass because motion explains them.
- [product] Medium — mobile-typing-practice.png breaks `중요합니다` between `중요합` and `니다`. ToolSurface.module.css lacks the catalog's word-break policy and character-by-character rendered typing spans retain a default break. Apply an appropriate word grouping or keep-all policy to the typing text without changing key handling/scoring, then recapture.

## Good, preserve

- Header is a real shared React navigation mounted once by RootLayout; Shell renders only content and footer. Desktop links and collapsed mobile menu share the same items, active-route semantics, close-on-navigation behavior, visible focus, aria-controls and aria-expanded.
- Catalog pages use shared Shell, CSS variables, reusable typography, buttons, cards, tables and forms. No screenshot substitute exists; keyboard art is a labelled illustration and real vendor product images are distinct content.
- ToolSurface scopes compatibility styling to legacy routes and does not replace their measurement components. Catalog testers use their existing Shell without double top padding.
- Affiliate editor uses labelled controls, disabled save state and role=status feedback; server action checks authenticated admin membership and validates fields before upsert. Main-agent login/save/reload evidence is documented in admin-navigation.md; this reviewer did not independently repeat live writes.
- Catalog desktop and mobile frames show coherent shared navigation and layouts. Blank below-fold product tiles match the stated lazy-image capture limitation and are not evidence of a product image defect.

## Limits

No exact visual reference packet was provided. This is consistency/functional integrity QA. Static frames alone do not establish mobile menu interaction or every preserved tester's running state. Settled captures of legacy tools remain necessary before a final approval.
