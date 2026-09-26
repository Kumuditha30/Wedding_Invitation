# Sachintha & Ranumi — Homecoming Wedding Invitation

A single wedding invitation website for the December 5, 2026 homecoming wedding of:

- Groom: Sachintha
- Bride: Ranumi
- Venue: HikkaTranz, Hikkaduwa
- Theme: Dark / Black / Red

## What is included

- One wedding website with 50+ personalized invitation links.
- Guest-specific invitation URL: `/i/YOUR_INVITATION_CODE`
- RSVP: Coming / Not coming.
- Optional attendee count and message.
- Admin dashboard with counts and guest table.
- Add, edit and delete invitations.
- Copy invitation links.
- CSV export.
- Secure server-side Supabase access using the service-role key.
- Password-protected admin area.
- Responsive mobile-first red/black design.
- Google Maps directions link for HikkaTranz, Hikkaduwa.
- Countdown to December 5, 2026.

## 1. Requirements

Install Node.js 18+ (Node.js 20+ is recommended).

## 2. Install

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 3. Create Supabase database

Create a Supabase project and open SQL Editor.

Run the complete SQL in:

`supabase/schema.sql`

Then copy your Supabase Project URL and Service Role Key into `.env.local`.

IMPORTANT: never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser and never prefix it with `NEXT_PUBLIC_`.

## 4. Configure environment

Copy `.env.example` to `.env.local` and set:

```env
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_PASSWORD=...
ADMIN_SESSION_SECRET=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Use a long random value for `ADMIN_SESSION_SECRET`.

## 5. Add invitations

Open:

http://localhost:3000/admin/login

Sign in with `ADMIN_PASSWORD`.

The dashboard lets you create invitations such as:

- Mr. & Mrs. Perera — 2 seats
- Silva Family — 4 seats
- Nadeesha — 1 seat

Each guest receives a unique link.

Example:

`https://your-domain.com/i/8QK7M2P4`

## 6. Import 50+ invitations at once

The admin dashboard includes CSV import.

Use this format:

```csv
name,seats
Mr. & Mrs. Perera,2
Silva Family,4
Nadeesha,1
```

A unique invitation code is generated automatically for every row.

A ready-to-edit example is included as:

`sample-guests.csv`

## 7. RSVP flow

Guest opens their personal link → sees their name → selects:

- ❤️ Yes, I'm coming
- 🖤 Sorry, I can't come

The dashboard immediately shows the response.

## 8. Deploy to Vercel

Push this project to GitHub and import it into Vercel.

Add the same environment variables in Vercel:

- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- ADMIN_PASSWORD
- ADMIN_SESSION_SECRET
- NEXT_PUBLIC_SITE_URL

Set `NEXT_PUBLIC_SITE_URL` to your Vercel/custom-domain URL.

## 9. Important security note

The public invitation page does not expose the service-role key. Database access is performed on the server.

RLS is enabled in the SQL schema and no public table policies are created. The server-side service-role key bypasses RLS.

## Wedding customization

The main wedding content is in:

`lib/wedding.ts`

Change colors, wording, couple names, date, venue and map URL there if needed.

