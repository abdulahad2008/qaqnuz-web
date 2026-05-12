-- Run this in your Supabase SQL editor to create the required tables

create table if not exists leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  name        text not null,
  email       text not null,
  company     text,
  role        text,
  message     text,
  source      text default 'book-demo'
);

create table if not exists newsletter_signups (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  email       text not null unique
);

create table if not exists contacts (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  name        text not null,
  email       text not null,
  message     text not null
);

create table if not exists analytics_events (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  event       text not null,
  properties  jsonb default '{}'
);

-- Enable RLS on all tables
alter table leads               enable row level security;
alter table newsletter_signups  enable row level security;
alter table contacts            enable row level security;
alter table analytics_events    enable row level security;

-- Allow anonymous inserts (form submissions from the public website)
create policy "anon insert leads"              on leads               for insert to anon with check (true);
create policy "anon insert newsletter_signups" on newsletter_signups  for insert to anon with check (true);
create policy "anon insert contacts"           on contacts            for insert to anon with check (true);
create policy "anon insert analytics_events"   on analytics_events    for insert to anon with check (true);
