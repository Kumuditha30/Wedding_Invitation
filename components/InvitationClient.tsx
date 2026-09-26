"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/lib/wedding";

type Guest = {
  id: string;
  invitation_code: string;
  name: string;
  seats: number;
  attendee_count: number | null;
  rsvp_status: "pending" | "attending" | "declined";
  message: string | null;
};

function CoupleAnimation() {
  return (
    <div className="couple-art" aria-hidden="true">
      <svg viewBox="0 0 420 330" role="img">
        <defs>
          <linearGradient id="dress" x1="0" x2="1">
            <stop offset="0" stopColor="#f4eee9" />
            <stop offset="1" stopColor="#c9c0bb" />
          </linearGradient>
          <linearGradient id="suit" x1="0" x2="1">
            <stop offset="0" stopColor="#161619" />
            <stop offset="1" stopColor="#34343a" />
          </linearGradient>
        </defs>
        <g className="heart-float"><path d="M210 62 C196 47 171 68 210 96 C249 68 224 47 210 62Z" fill="#ef234c" /></g>
        <g className="couple-float">
          <circle cx="160" cy="103" r="32" fill="#c48c70" />
          <path d="M126 102 C127 67 185 61 193 101 C174 82 146 82 126 102Z" fill="#161619" />
          <path d="M117 302 C121 236 127 176 160 169 C193 176 199 236 203 302Z" fill="url(#dress)" />
          <path d="M144 174 L160 215 L176 174" fill="#b3132b" opacity=".75" />
          <circle cx="260" cy="108" r="31" fill="#a96f58" />
          <path d="M228 106 C228 70 286 69 291 105 C273 87 246 86 228 106Z" fill="#252126" />
          <path d="M219 302 C223 233 230 181 260 174 C290 181 297 233 301 302Z" fill="url(#suit)" />
          <path d="M260 178 L248 214 L260 236 L272 214Z" fill="#ef234c" />
          <path d="M195 218 C220 226 225 240 234 252" stroke="#c48c70" strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M225 245 C203 232 193 227 180 218" stroke="#a96f58" strokeWidth="9" fill="none" strokeLinecap="round" />
          <circle cx="204" cy="229" r="7" fill="#ef234c" />
        </g>
        <path d="M55 296 C105 270 145 316 190 290 C235 264 275 314 365 284" fill="none" stroke="#b3132b" strokeOpacity=".45" strokeWidth="2" />
      </svg>
    </div>
  );
}

function Countdown() {
  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date(wedding.dateISO).getTime();

    const update = () => {
      const diff = Math.max(0, target - Date.now());
      setRemaining({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown" aria-label="Countdown to the wedding">
      {Object.entries(remaining).map(([label, value]) => (
        <div className="time-box" key={label}>
          <span className="time-number">{String(value).padStart(2, "0")}</span>
          <span className="time-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function InvitationClient({ guest }: { guest: Guest }) {
  const [status, setStatus] = useState(guest.rsvp_status);
  const [attendeeCount, setAttendeeCount] = useState(
    guest.attendee_count ?? guest.seats
  );
  const [message, setMessage] = useState(guest.message ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.38;
  }, []);

  async function openInvitation() {
    setOpened(true);
    const audio = audioRef.current;
    if (audio) {
      try {
        await audio.play();
        setMusicOn(true);
      } catch {
        setMusicOn(false);
      }
    }
  }

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try { await audio.play(); setMusicOn(true); } catch { setMusicOn(false); }
    } else {
      audio.pause();
      setMusicOn(false);
    }
  }

  async function submitRsvp() {
    if (status === "pending") return;

    setSaving(true);
    setSaved(false);

    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invitationCode: guest.invitation_code,
        status,
        attendeeCount: status === "attending" ? attendeeCount : 0,
        message
      })
    });

    setSaving(false);

    if (response.ok) {
      setSaved(true);
    } else {
      alert("We couldn't save your response. Please try again.");
    }
  }

  return (
    <main className="invitation-page">
      <audio ref={audioRef} src="/music/homecoming-theme.wav" preload="auto" aria-hidden="true" />

      {!opened && (
        <div className="opening-screen">
          <div className="opening-card">
            <div className="opening-kicker">You are invited</div>
            <CoupleAnimation />
            <div className="opening-title">Sachintha <span>&amp;</span> Ranumi</div>
            <div className="opening-subtitle">The Homecoming • December 5th, 2026</div>
            <button className="open-invitation" type="button" onClick={openInvitation}>
              Open Invitation <span>♥</span>
            </button>
            <p className="opening-note">Tap to open with music</p>
          </div>
        </div>
      )}

      {opened && (
        <button className="music-control" type="button" onClick={toggleMusic} aria-label={musicOn ? "Pause music" : "Play music"}>
          <span className={musicOn ? "music-bars playing" : "music-bars"}><i /><i /><i /></span>
          {musicOn ? "Music on" : "Music off"}
        </button>
      )}

      <div className="grain" />

      <section className="hero">
        <div className="hero-inner">
          <div className="kicker">{wedding.theme} • {wedding.subtitle}</div>

          <h1 className="hero-title">
            Sachintha
            <span className="amp">&amp;</span>
            <span>Ranumi</span>
          </h1>

          <div className="hero-rule" />
          <div className="hero-date">{wedding.dateLabel}</div>

          <p className="guest-line">
            This invitation is lovingly reserved for{" "}
            <strong className="guest-name">{guest.name}</strong>.
          </p>
        </div>

        <div className="scroll-note">Scroll to celebrate ↓</div>
      </section>

      <section className="section center">
        <div className="section-label">A second chapter</div>
        <h2 className="section-title">The Homecoming</h2>
        <div className="ornament">✦</div>
        <p className="intro">
          After the first celebration, we would love to gather once more with
          the people who make our story special. Join Sachintha &amp; Ranumi
          for an intimate second-day homecoming celebration filled with love,
          laughter, music and memories.
        </p>
        <Countdown />
      </section>

      <section className="section">
        <div className="section-label">When &amp; where</div>
        <h2 className="section-title">Join us.</h2>

        <div className="info-grid">
          <div className="info-card">
            <div className="icon">◷</div>
            <h3>Date</h3>
            <p>{wedding.dateLabel}</p>
          </div>

          <div className="info-card">
            <div className="icon">♡</div>
            <h3>Celebration</h3>
            <p>{wedding.theme} — our second-day wedding celebration.</p>
          </div>

          <div className="info-card">
            <div className="icon">⌖</div>
            <h3>Venue</h3>
            <p>{wedding.venueShort}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="venue-box">
          <div className="section-label">Our destination</div>
          <div className="venue-name">{wedding.venue}</div>
          <p className="intro">
            Hikkaduwa, Sri Lanka
          </p>
          <div className="map-frame-wrap">
            <iframe
              title="HikkaTranz Hikkaduwa map"
              src="https://www.google.com/maps?q=HikkaTranz%20Hikkaduwa%20Sri%20Lanka&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <a
            className="map-button"
            href={wedding.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps ↗
          </a>
        </div>
      </section>

      <section className="section" id="rsvp">
        <div className="rsvp-wrap">
          <div className="rsvp-card">
            <div className="section-label">Kindly reply</div>
            <h2 className="section-title">Will you join us?</h2>
            <p className="intro">
              We have reserved <strong>{guest.seats}</strong>{" "}
              {guest.seats === 1 ? "place" : "places"} for you.
            </p>

            <div className="rsvp-options">
              <button
                className={`rsvp-option ${status === "attending" ? "selected" : ""}`}
                onClick={() => setStatus("attending")}
                type="button"
              >
                <span className="big">♥</span>
                <strong>Yes, I&apos;m coming</strong>
                <br></br>
                <small>We&apos;ll see you there.</small>
              </button>

              <button
                className={`rsvp-option ${status === "declined" ? "selected" : ""}`}
                onClick={() => setStatus("declined")}
                type="button"
              >
                <span className="big">×</span>
                <strong>Sorry, I can&apos;t come</strong>
                <br></br>
                <small>Thank you for letting us know.</small>
              </button>
            </div>

            {status === "attending" && (
              <>
                <label
                  htmlFor="attendeeCount"
                  style={{
                    display: "block",
                    textAlign: "left",
                    marginTop: 18,
                    color: "#aaa"
                  }}
                >
                  How many will attend? (max {guest.seats})
                </label>
                <select
                  id="attendeeCount"
                  className="input"
                  value={attendeeCount}
                  onChange={(e) =>
                    setAttendeeCount(
                      Math.min(guest.seats, Math.max(1, Number(e.target.value)))
                    )
                  }
                  style={{ marginTop: 8 }}
                >
                  {Array.from({ length: guest.seats }, (_, i) => i + 1).map(
                    (n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    )
                  )}
                </select>
              </>
            )}

            <textarea
              className="message-box"
              placeholder="Optional message for Sachintha & Ranumi..."
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 500))}
              maxLength={500}
            />

            <button
              className="rsvp-button rsvp-submit"
              type="button"
              onClick={submitRsvp}
              disabled={saving || status === "pending"}
            >
              {saving ? "Saving..." : "Confirm"}
            </button>

            {status === "pending" && (
              <p style={{ color: "#777", marginBottom: 0 }}>
                Please choose an RSVP option first.
              </p>
            )}

            {saved && (
              <div className="success">
                Thank you, {guest.name}. Your response has been received. ♥
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="ornament">✦</div>
        With love, Sachintha &amp; Ranumi
        <br />
        {wedding.dateLabel} • {wedding.venue}
      </footer>
    </main>
  );
}
