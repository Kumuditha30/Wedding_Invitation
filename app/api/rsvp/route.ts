import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const invitationCode = String(body.invitationCode ?? "")
      .trim()
      .toUpperCase();

    const status = body.status;
    const attendeeCount = Number(body.attendeeCount ?? 0);
    const message = String(body.message ?? "").slice(0, 500);

    if (!invitationCode) {
      return NextResponse.json({ error: "Invitation code is required." }, { status: 400 });
    }

    if (status !== "attending" && status !== "declined") {
      return NextResponse.json({ error: "Invalid RSVP status." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data: guest, error: lookupError } = await supabase
      .from("guests")
      .select("id, seats")
      .eq("invitation_code", invitationCode)
      .maybeSingle();

    if (lookupError || !guest) {
      return NextResponse.json({ error: "Invitation not found." }, { status: 404 });
    }

    const count = status === "attending"
      ? Math.min(guest.seats, Math.max(1, attendeeCount))
      : 0;

    const { error } = await supabase
      .from("guests")
      .update({
        rsvp_status: status,
        attendee_count: count,
        message,
        rsvp_at: new Date().toISOString()
      })
      .eq("id", guest.id);

    if (error) {
      return NextResponse.json({ error: "Could not save RSVP." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
