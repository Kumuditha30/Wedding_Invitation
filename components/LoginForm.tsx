"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    setLoading(false);

    if (!response.ok) {
      setError("Incorrect admin password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="section-label">Private area</div>
        <h1>Wedding Admin</h1>
        <p>
          Manage Sachintha &amp; Ranumi&apos;s personalized invitations and
          RSVP responses.
        </p>

        <form onSubmit={submit}>
          <input
            className="input"
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="error">{error}</div>}

          <button
            className="admin-button"
            type="submit"
            disabled={loading}
            style={{ width: "100%", marginTop: 14 }}
          >
            {loading ? "Signing in..." : "Enter dashboard"}
          </button>
        </form>
      </div>
    </main>
  );
}
