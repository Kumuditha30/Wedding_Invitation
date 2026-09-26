import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { generateInvitationCode } from "@/lib/invitations";

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const seats = Math.max(1, Math.min(50, Number(body.seats) || 1));

    if (!name || name.length > 150) {
      return NextResponse.json({ error: "Invalid guest name." }, { status: 400 });
    }

    const code = await generateInvitationCode();
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("guests")
      .insert({
        invitation_code: code,
        name,
        seats,
        rsvp_status: "pending"
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
