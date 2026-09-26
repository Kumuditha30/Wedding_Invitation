import { randomBytes } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function generateInvitationCode() {
  const supabase = getSupabaseAdmin();

  for (let attempt = 0; attempt < 10; attempt++) {
    const code = randomBytes(5)
      .toString("base64url")
      .replace(/[-_]/g, "")
      .slice(0, 8)
      .toUpperCase();

    const { data } = await supabase
      .from("guests")
      .select("id")
      .eq("invitation_code", code)
      .maybeSingle();

    if (!data) return code;
  }

  throw new Error("Could not generate a unique invitation code.");
}
