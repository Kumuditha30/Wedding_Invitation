"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { wedding } from "@/lib/wedding";

type Guest = {
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

type Stats = {
  invitations: number;
  attending: number;
  declined: number;
  pending: number;
  totalSeats: number;
  totalAttending: number;
};

function invitationUrl(code: string) {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  return `${base}/i/${code}`;
}

export default function AdminDashboard({
  initialGuests,
  stats
}: {
  initialGuests: Guest[];
  stats: Stats;
}) {
  const router = useRouter();
  const [guests, setGuests] = useState(initialGuests);
  const [name, setName] = useState("");
  const [seats, setSeats] = useState("1");
  const [filter, setFilter] = useState("");
  const [busy, setBusy] = useState(false);
  const [importing, setImporting] = useState(false);

  const filtered = useMemo(() => {
    const q = filter.toLowerCase().trim();
    if (!q) return guests;

    return guests.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.invitation_code.toLowerCase().includes(q) ||
        g.rsvp_status.includes(q)
    );
  }, [guests, filter]);

  async function addGuest(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setBusy(true);

    const response = await fetch("/api/admin/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        seats: Math.max(1, Math.min(50, Number(seats) || 1))
      })
    });

    setBusy(false);

    if (!response.ok) {
      alert("Could not create invitation.");
      return;
    }

    const created = await response.json();
    setGuests((current) => [created, ...current]);
    setName("");
    setSeats("1");
  }

  async function deleteGuest(id: string) {
    if (!confirm("Delete this invitation? This cannot be undone.")) return;

    const response = await fetch(`/api/admin/guests/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      alert("Could not delete invitation.");
      return;
    }

    setGuests((current) => current.filter((g) => g.id !== id));
  }

  async function copyLink(code: string) {
    await navigator.clipboard.writeText(invitationUrl(code));
    alert("Invitation link copied.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function statusLabel(status: Guest["rsvp_status"]) {
    if (status === "attending") return "♥ Coming";
    if (status === "declined") return "× Not coming";
    return "⏳ No response";
  }

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <div className="admin-brand">
            <div className="section-label">Homecoming • December 5th, 2026</div>
            <h1>{wedding.groom} &amp; {wedding.bride}</h1>
            <p>Invitation &amp; RSVP dashboard</p>
          </div>

          <button className="small-button" onClick={logout}>
            Log out
          </button>
        </header>

        <section className="stats">
          <div className="stat">
            <span>Invitations</span>
            <strong>{stats.invitations}</strong>
          </div>
          <div className="stat">
            <span>Coming</span>
            <strong>{guests.filter((g) => g.rsvp_status === "attending").length}</strong>
          </div>
          <div className="stat">
            <span>Not coming</span>
            <strong>{guests.filter((g) => g.rsvp_status === "declined").length}</strong>
          </div>
          <div className="stat">
            <span>No response</span>
            <strong>{guests.filter((g) => g.rsvp_status === "pending").length}</strong>
          </div>
        </section>

        <section className="stats">
          <div className="stat">
            <span>Reserved seats</span>
            <strong>{guests.reduce((s, g) => s + g.seats, 0)}</strong>
          </div>
          <div className="stat">
            <span>Confirmed people</span>
            <strong>
              {guests.reduce(
                (s, g) =>
                  s + (g.rsvp_status === "attending" ? (g.attendee_count ?? 0) : 0),
                0
              )}
            </strong>
          </div>
          <div className="stat">
            <span>Venue</span>
            <strong style={{ fontSize: "1.1rem" }}>HikkaTranz</strong>
          </div>
          <div className="stat">
            <span>Date</span>
            <strong style={{ fontSize: "1.1rem" }}>05.12.2026</strong>
          </div>
        </section>

        <section className="admin-card">
          <div className="admin-toolbar">
            <div>
              <h2 style={{ margin: 0 }}>Add invitation</h2>
              <p style={{ color: "#777", margin: "6px 0 0" }}>
                Create a unique link for each guest or family.
              </p>
            </div>
          </div>

          <form className="admin-form" onSubmit={addGuest}>
            <input
              className="input"
              placeholder="Guest / family name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              className="input"
              type="number"
              min="1"
              max="50"
              placeholder="Seats"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              required
            />

            <button className="admin-button" disabled={busy}>
              {busy ? "Creating..." : "Create invitation"}
            </button>
          </form>
        </section>

        <section className="admin-card">
          <div className="admin-toolbar">
            <div>
              <h2 style={{ margin: 0 }}>Import 50+ guests</h2>
              <p style={{ color: "#777", margin: "6px 0 0" }}>
                Upload a CSV with <strong>name,seats</strong> columns. A unique
                invitation link is generated for every row.
              </p>
            </div>
            <a className="small-button" href="/sample-guests.csv" download>
              Download CSV template
            </a>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const input = form.elements.namedItem("file") as HTMLInputElement;
              if (!input.files?.[0]) {
                alert("Choose a CSV file first.");
                return;
              }

              setImporting(true);
              const body = new FormData();
              body.append("file", input.files[0]);

              const response = await fetch("/api/admin/import", {
                method: "POST",
                body
              });

              const result = await response.json();
              setImporting(false);

              if (!response.ok) {
                alert(result.error || "Import failed.");
                return;
              }

              alert(`${result.count} invitations imported.`);
              router.refresh();
            }}
            style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
          >
            <input
              className="input"
              type="file"
              name="file"
              accept=".csv,text/csv"
              style={{ maxWidth: 500 }}
            />
            <button className="admin-button" disabled={importing}>
              {importing ? "Importing..." : "Import CSV"}
            </button>
          </form>
        </section>

        <section className="admin-card">
          <div className="admin-toolbar">
            <div>
              <h2 style={{ margin: 0 }}>Guest invitations</h2>
              <p style={{ color: "#777", margin: "6px 0 0" }}>
                {filtered.length} shown
              </p>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <input
                className="input"
                placeholder="Search guests..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <a
                className="small-button"
                href="/api/admin/export"
                style={{ whiteSpace: "nowrap" }}
              >
                Export CSV
              </a>
            </div>
          </div>

          <div className="table-wrap">
            <table className="guest-table">
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Seats</th>
                  <th>Attending</th>
                  <th>RSVP</th>
                  <th>Invitation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((guest) => (
                  <tr key={guest.id}>
                    <td>
                      <strong>{guest.name}</strong>
                      {guest.message && (
                        <div style={{ color: "#777", marginTop: 4 }}>
                          “{guest.message}”
                        </div>
                      )}
                    </td>
                    <td>{guest.seats}</td>
                    <td>
                      {guest.rsvp_status === "attending"
                        ? guest.attendee_count ?? 0
                        : "—"}
                    </td>
                    <td>
                      <span className={`status ${guest.rsvp_status}`}>
                        {statusLabel(guest.rsvp_status)}
                      </span>
                    </td>
                    <td>
                      <a
                        className="small-button"
                        href={`/i/${guest.invitation_code}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Preview
                      </a>
                    </td>
                    <td>
                      <button
                        className="small-button"
                        onClick={() => copyLink(guest.invitation_code)}
                      >
                        Copy link
                      </button>
                      <button
                        className="small-button"
                        onClick={() => deleteGuest(guest.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {!filtered.length && (
                  <tr>
                    <td colSpan={6} style={{ color: "#777", textAlign: "center" }}>
                      No invitations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
