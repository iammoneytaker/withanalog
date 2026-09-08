create table public.keyboard_link_admins (
 user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.keyboard_link_admins enable row level security;
revoke all on public.keyboard_link_admins from anon, authenticated;
grant select on public.keyboard_link_admins to authenticated;
create policy "Own administrator membership" on public.keyboard_link_admins for select to authenticated using (user_id = (select auth.uid()));

create table public.keyboard_affiliate_links (
 model_slug text primary key check (model_slug in ('aula-f65','aula-f75','aula-f75-max','aula-f87-pro','aula-f99','aula-f99-pro')),
 affiliate_url text not null default '' check (affiliate_url = '' or affiliate_url ~ '^https://link[.]coupang[.]com/[^[:space:]]+$'),
 variant text not null default '' check (length(variant) <= 200),
 enabled boolean not null default false,
 checked_on date,
 updated_at timestamptz not null default now(),
 check (not enabled or (affiliate_url <> '' and variant <> '' and checked_on is not null))
);
alter table public.keyboard_affiliate_links enable row level security;
revoke all on public.keyboard_affiliate_links from anon, authenticated;
grant select on public.keyboard_affiliate_links to anon, authenticated;
grant insert, update on public.keyboard_affiliate_links to authenticated;
create policy "Published links" on public.keyboard_affiliate_links for select to anon, authenticated using (enabled);
create policy "Administrators read links" on public.keyboard_affiliate_links for select to authenticated using (exists (select 1 from public.keyboard_link_admins where user_id = (select auth.uid())));
create policy "Administrators insert links" on public.keyboard_affiliate_links for insert to authenticated with check (exists (select 1 from public.keyboard_link_admins where user_id = (select auth.uid())));
create policy "Administrators update links" on public.keyboard_affiliate_links for update to authenticated using (exists (select 1 from public.keyboard_link_admins where user_id = (select auth.uid()))) with check (exists (select 1 from public.keyboard_link_admins where user_id = (select auth.uid())));
