# Navigation and affiliate administration — 2026-09-08

User authorized one shared navigation, consistent tool styling, existing measurement logic preserved, administrator-managed affiliate links, continued use of vendor photos (permission handled by user), and creation of the specified administrator account in jszchnsbkfvpczxypimw.

Implemented: one Header; removed Shell secondary nav; scoped ToolSurface styling for legacy tools and typing practice; Supabase keyboard_link_admins and keyboard_affiliate_links tables with RLS; authenticated server action rechecks administrator membership; private links hidden from anonymous reads; public purchase CTA includes disclosure and sponsored/nofollow; admin root and login route to affiliate-link editor.

Database migration applied through authenticated Supabase dashboard SQL editor because connector account lacked project access. Existing project tables were not modified. Administrator account created via dashboard Auth UI; password not stored in files. Admin membership count verified as 1.

Local .env.local created with exclusive-create after checking absent; contains only project URL and public anon key, Git-ignored. No service-role key retrieved.

Manual evidence: admin login reached six-model editor; empty/disabled F65 row saved successfully and persisted after reload; anonymous API sees zero unpublished rows and cannot read membership table; five malformed/untrusted URL shapes rejected by local validator without writes; tool hub has one navigation; preserved tester accepted A/S and displayed total input 2.

Automatic approval review rejected an invalid-URL write test against live DB. No invalid URL saved. Confirmed empty URL and disabled status before legitimate draft save. No active affiliate URLs have been fabricated or published.

Outstanding: actual matching Coupang URLs, public purchase CTA activation with those URLs, deployment and search submissions. Visual QA and fresh build completion tracked separately.

Final verification: npm run build exit 0; npx tsc --noEmit exit 0; npm run lint -- --quiet exit 0. Development server restarted on 127.0.0.1:3010. Full visual captures for 29 public routes at desktop/mobile are in final-ui/manifest.json; independent reviews are in progress. Admin editor screenshot final-ui/admin-editor.png. Password is not recorded in this ledger.
