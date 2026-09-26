import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Keep the database shape explicit so Supabase's TypeScript client does not
// infer table rows/inserts as `never` during the Vercel build.
export type GuestRow = {
  id: string;
  invitation_code: string;
  name: string;
  seats: number;
  attendee_count: number | null;
  rsvp_status: "pending" | "attending" | "declined";
  message: string | null;
  created_at: string;
  updated_at: string;
  rsvp_at: string | null;
};

export type GuestInsert = {
  id?: string;
  invitation_code: string;
  name: string;
  seats?: number;
  attendee_count?: number | null;
  rsvp_status?: "pending" | "attending" | "declined";
  message?: string | null;
  created_at?: string;
  updated_at?: string;
  rsvp_at?: string | null;
};

export type Database = {
  public: {
    Tables: {
      guests: {
        Row: GuestRow;
        Insert: GuestInsert;
        Update: Partial<GuestInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let cachedClient: SupabaseClient<Database> | null = null;

export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (cachedClient) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  cachedClient = createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  return cachedClient;
}
