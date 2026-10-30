import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase";
import { wedding } from "@/lib/wedding";
import InvitationClient from "@/components/InvitationClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ invitationCode: string }>;
}): Promise<Metadata> {
  const { invitationCode } = await params;
  const title = `${wedding.groom} & ${wedding.bride} Wedding Invitation`;
  const description = `You are invited to celebrate ${wedding.groom} & ${wedding.bride}. Open your personal wedding invitation.`;
  const canonical = `/i/${encodeURIComponent(invitationCode.toUpperCase())}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: `${wedding.groom} & ${wedding.bride}`,
      title,
      description,
      url: canonical
    }
  };
}

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
