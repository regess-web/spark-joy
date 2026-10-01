create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null default '',
  url text not null unique,
  image_url text,
  source_name text not null,
  published_at timestamptz not null,
  category text not null default 'all',
  created_at timestamptz not null default now()
);

create index if not exists news_published_at_idx on public.news (published_at desc);
create index if not exists news_category_idx on public.news (category);

alter table public.news enable row level security;

create policy "public can read news"
on public.news for select
to anon, authenticated
using (true);
