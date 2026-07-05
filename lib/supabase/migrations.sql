-- ============================================================
-- Run this in your Supabase SQL editor (SQL Editor → New query)
-- ============================================================

-- ── Core tables ──────────────────────────────────────────────

create table if not exists leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  name        text not null,
  phone       text,       -- primary contact (we qualify details on the call)
  email       text,       -- optional (legacy)
  company     text,       -- brand name
  role        text,       -- legacy: Instagram handle
  message     text,       -- monthly DM volume selected
  source      text default 'book-demo',
  status      text default 'pending',   -- 'pending' | 'invited'
  invited_at  timestamptz
);

-- Migration for existing installs (book-demo now collects name/phone/brand/volume):
alter table leads add column if not exists phone text;
alter table leads alter column email drop not null;

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

-- ── Row Level Security ────────────────────────────────────────

alter table leads               enable row level security;
alter table newsletter_signups  enable row level security;
alter table contacts            enable row level security;
alter table analytics_events    enable row level security;

-- Public: anonymous form submissions
create policy "anon insert leads"
  on leads for insert to anon with check (true);

create policy "anon insert newsletter_signups"
  on newsletter_signups for insert to anon with check (true);

create policy "anon insert contacts"
  on contacts for insert to anon with check (true);

create policy "anon insert analytics_events"
  on analytics_events for insert to anon with check (true);

-- Dashboard: authenticated users can read and update leads
create policy "auth read leads"
  on leads for select to authenticated using (true);

create policy "auth update leads"
  on leads for update to authenticated using (true);

create policy "auth read analytics_events"
  on analytics_events for select to authenticated using (true);

-- ── Add columns to existing leads table (run if table already exists) ──
-- alter table leads add column if not exists status text default 'pending';
-- alter table leads add column if not exists invited_at timestamptz;

-- ── Make yourself admin ───────────────────────────────────────
-- After signing up, run this with YOUR email to get admin access:
--
-- UPDATE auth.users
-- SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'
-- WHERE email = 'your@email.com';
--
-- Then sign out and sign back in for the change to take effect.
