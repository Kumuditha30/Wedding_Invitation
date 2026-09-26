import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const supabase = getSupabaseAdmin();

  const { data: guests, error } = await supabase
    .from("guests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const rows = guests ?? [];

  const stats = {
    invitations: rows.length,
    attending: rows.filter((g) => g.rsvp_status === "attending").length,
    declined: rows.filter((g) => g.rsvp_status === "declined").length,
    pending: rows.filter((g) => g.rsvp_status === "pending").length,
    totalSeats: rows.reduce((sum, g) => sum + Number(g.seats), 0),
    totalAttending: rows.reduce(
      (sum, g) => sum + (g.rsvp_status === "attending" ? Number(g.attendee_count ?? 0) : 0),
      0
    )
  };

  return <AdminDashboard initialGuests={rows} stats={stats} />;
}
