import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { generateInvitationCode } from "@/lib/invitations";

function parseCsv(text: string) {
  const lines = text
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const nameIndex = headers.indexOf("name");
  const seatsIndex = headers.indexOf("seats");

  if (nameIndex === -1) {
    throw new Error("CSV must contain a 'name' column.");
  }

  return lines.slice(1).map((line) => {
    // This importer intentionally supports the simple template supplied
    // with this project: name,seats
    const parts = line.split(",");
    const name = parts[nameIndex]?.trim().replace(/^"|"$/g, "") ?? "";
    const seatsRaw = seatsIndex >= 0 ? parts[seatsIndex]?.trim() : "1";
    const seats = Math.max(1, Math.min(50, Number(seatsRaw) || 1));
    return { name, seats };
  }).filter((row) => row.name);
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "CSV file is required." }, { status: 400 });
    }

    const text = await file.text();
    const rows = parseCsv(text);

    if (!rows.length) {
      return NextResponse.json({ error: "No guest rows found." }, { status: 400 });
    }

    if (rows.length > 500) {
      return NextResponse.json({ error: "Maximum 500 rows per import." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const inserts = [];

    for (const row of rows) {
      inserts.push({
        invitation_code: await generateInvitationCode(),
        name: row.name.slice(0, 150),
        seats: row.seats,
        rsvp_status: "pending"
      });
    }

    const { data, error } = await supabase
      .from("guests")
      .insert(inserts)
      .select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ count: data?.length ?? 0 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Import failed." },
      { status: 400 }
    );
  }
}
