-- ============================================================
-- Sachintha & Ranumi — Homecoming Wedding Invitation
-- Supabase database schema
-- ============================================================

create extension if not exists pgcrypto;

create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  invitation_code text not null unique,
  name text not null,
  seats integer not null default 1 check (seats > 0 and seats <= 50),
  attendee_count integer null check (attendee_count is null or (attendee_count >= 0 and attendee_count <= 50)),
  rsvp_status text not null default 'pending'
    check (rsvp_status in ('pending', 'attending', 'declined')),
  message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  rsvp_at timestamptz
);

create index if not exists guests_invitation_code_idx
  on public.guests(invitation_code);

create index if not exists guests_rsvp_status_idx
  on public.guests(rsvp_status);

alter table public.guests enable row level security;

-- There are intentionally no public policies.
-- The Next.js server uses the Supabase service-role key.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists guests_set_updated_at on public.guests;

create trigger guests_set_updated_at
before update on public.guests
for each row
execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Optional starter invitations.
-- Delete these if you want an empty database.
-- ------------------------------------------------------------

insert into public.guests (invitation_code, name, seats)
values
  ('DEMO-SACHINTHA', 'Mr. & Mrs. Perera', 2),
  ('DEMO-RANUMI', 'Silva Family', 4),
  ('DEMO-HOME', 'Nadeesha', 1)
on conflict (invitation_code) do nothing;
