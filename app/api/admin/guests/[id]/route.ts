import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const seats = Number(body.seats);

    if (!name || name.length > 150) {
      return NextResponse.json({ error: "Enter a name up to 150 characters." }, { status: 400 });
    }

    if (!Number.isInteger(seats) || seats < 1 || seats > 50) {
      return NextResponse.json({ error: "Seats must be a whole number from 1 to 50." }, { status: 400 });
    }

    const { id } = await params;
    const supabase = getSupabaseAdmin();
    const { data: existing, error: lookupError } = await supabase
      .from("guests")
      .select("id, attendee_count, rsvp_status")
      .eq("id", id)
      .maybeSingle();

    if (lookupError) {
      return NextResponse.json({ error: lookupError.message }, { status: 500 });
    }

    if (!existing) {
      return NextResponse.json({ error: "Invitation not found." }, { status: 404 });
    }

    if (existing.rsvp_status === "attending" && (existing.attendee_count ?? 0) > seats) {
      return NextResponse.json(
        { error: `Seats cannot be lower than the ${existing.attendee_count} confirmed attendee(s).` },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("guests")
      .update({ name, seats })
      .eq("id", id)
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
