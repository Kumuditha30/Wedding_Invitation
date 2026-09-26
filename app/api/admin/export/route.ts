import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

function csvCell(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("guests")
    .select("name,seats,attendee_count,rsvp_status,message,invitation_code,rsvp_at")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const header = [
    "name",
    "seats",
    "attendee_count",
    "rsvp_status",
    "message",
    "invitation_code",
    "invitation_url",
    "rsvp_at"
  ];

  const rows = (data ?? []).map((guest) => [
    guest.name,
    guest.seats,
    guest.attendee_count ?? "",
    guest.rsvp_status,
    guest.message ?? "",
    guest.invitation_code,
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/i/${guest.invitation_code}`,
    guest.rsvp_at ?? ""
  ]);

  const csv = [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="sachintha-ranumi-guests.csv"'
    }
  });
}
