alter table public.keyboard_affiliate_links drop constraint keyboard_affiliate_links_model_slug_check;
alter table public.keyboard_affiliate_links add constraint keyboard_affiliate_links_model_slug_check
 check (model_slug in ('aula-f65','aula-f75','aula-f75-max','aula-f87-pro','aula-f99','aula-f99-pro','gclicker-xrt68','gclicker-grt68','gclicker-wk50-78','gclicker-wk50-87'));
