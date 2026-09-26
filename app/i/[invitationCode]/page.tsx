import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase";
import InvitationClient from "@/components/InvitationClient";

export const dynamic = "force-dynamic";

export default async function InvitationPage({
  params
}: {
  params: Promise<{ invitationCode: string }>;
}) {
  const { invitationCode } = await params;

  const supabase = getSupabaseAdmin();
  const { data: guest, error } = await supabase
    .from("guests")
    .select("id, invitation_code, name, seats, attendee_count, rsvp_status, message")
    .eq("invitation_code", invitationCode.toUpperCase())
    .maybeSingle();

  if (error || !guest) notFound();

  return <InvitationClient guest={guest} />;
}
