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

function MehendiBackdrop() {
  return (
    <div className="mehendi-backdrop" aria-hidden="true">
      <svg className="mehendi-vine mehendi-vine--left" viewBox="0 0 260 640" fill="none">
        <path d="M34 638C76 554 63 495 111 430S192 331 151 263 79 179 134 104 201 39 214 3" />
        <path d="M76 549c-42-10-58-38-55-70 33 4 54 28 55 70Zm45-119c43-3 65-26 74-58-34-2-63 17-74 58Zm-3-119c-41-13-53-42-47-73 32 8 52 34 47 73Zm30-121c38 7 65-10 80-40-32-10-65 2-80 40Z" />
        <path d="M104 465c-7-27-1-50 19-66 18 23 14 48-19 66Zm34-147c4-29 19-47 44-53 9 28-5 51-44 53Zm-13-133c-2-28 9-49 33-61 15 25 7 50-33 61Z" />
        <circle cx="143" cy="263" r="23" /><circle cx="143" cy="263" r="10" />
        <circle cx="111" cy="430" r="18" /><circle cx="111" cy="430" r="7" />
      </svg>
      <svg className="mehendi-vine mehendi-vine--right" viewBox="0 0 260 640" fill="none">
        <path d="M34 638C76 554 63 495 111 430S192 331 151 263 79 179 134 104 201 39 214 3" />
        <path d="M76 549c-42-10-58-38-55-70 33 4 54 28 55 70Zm45-119c43-3 65-26 74-58-34-2-63 17-74 58Zm-3-119c-41-13-53-42-47-73 32 8 52 34 47 73Zm30-121c38 7 65-10 80-40-32-10-65 2-80 40Z" />
        <path d="M104 465c-7-27-1-50 19-66 18 23 14 48-19 66Zm34-147c4-29 19-47 44-53 9 28-5 51-44 53Zm-13-133c-2-28 9-49 33-61 15 25 7 50-33 61Z" />
        <circle cx="143" cy="263" r="23" /><circle cx="143" cy="263" r="10" />
        <circle cx="111" cy="430" r="18" /><circle cx="111" cy="430" r="7" />
      </svg>
      <svg className="mehendi-medallion mehendi-medallion--upper" viewBox="0 0 260 260" fill="none">
        <circle cx="130" cy="130" r="108" />
        <circle cx="130" cy="130" r="94" />
        <circle cx="130" cy="130" r="67" />
        {Array.from({ length: 16 }, (_, index) => (
          <g key={index} transform={`rotate(${index * 22.5} 130 130)`}>
            <path d="M130 17c13 18 13 34 0 50-13-16-13-32 0-50Z" />
            <path d="M130 25v30m-5-13 5 5 5-5" />
          </g>
        ))}
        <path d="M130 99c18 10 31 24 31 31s-13 21-31 31c-18-10-31-24-31-31s13-21 31-31Z" />
        <circle cx="130" cy="130" r="11" />
        <circle cx="130" cy="130" r="4" />
        <path d="M36 130h13m162 0h13M130 36v13m0 162v13" />
        <circle cx="36" cy="130" r="2" /><circle cx="224" cy="130" r="2" />
        <circle cx="130" cy="36" r="2" /><circle cx="130" cy="224" r="2" />
      </svg>
      <svg className="mehendi-medallion mehendi-medallion--lower" viewBox="0 0 260 260" fill="none">
        <circle cx="130" cy="130" r="108" />
        <circle cx="130" cy="130" r="94" />
        <circle cx="130" cy="130" r="67" />
        {Array.from({ length: 16 }, (_, index) => (
          <g key={index} transform={`rotate(${index * 22.5} 130 130)`}>
            <path d="M130 17c13 18 13 34 0 50-13-16-13-32 0-50Z" />
            <path d="M130 25v30m-5-13 5 5 5-5" />
          </g>
        ))}
        <path d="M130 99c18 10 31 24 31 31s-13 21-31 31c-18-10-31-24-31-31s13-21 31-31Z" />
        <circle cx="130" cy="130" r="11" />
        <circle cx="130" cy="130" r="4" />
        <path d="M36 130h13m162 0h13M130 36v13m0 162v13" />
        <circle cx="36" cy="130" r="2" /><circle cx="224" cy="130" r="2" />
        <circle cx="130" cy="36" r="2" /><circle cx="130" cy="224" r="2" />
      </svg>
    </div>
  );
}

function CoupleIllustration() {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="An illustrated couple: the groom in a black suit and glasses beside the bride in a red dress">
      <defs>
        <linearGradient id="brideDress" x1="266" y1="154" x2="338" y2="340" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d32242" />
          <stop offset="1" stopColor="#650d20" />
        </linearGradient>
        <linearGradient id="veil" x1="268" y1="44" x2="368" y2="275" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ef234c" stopOpacity=".62" />
          <stop offset="1" stopColor="#8f1025" stopOpacity=".16" />
        </linearGradient>
        <radialGradient id="coupleHalo" cx="0" cy="0" r="1" gradientTransform="matrix(0 145 -180 0 240 179)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b3132b" stopOpacity=".2" />
          <stop offset="1" stopColor="#b3132b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="240" cy="184" rx="180" ry="145" fill="url(#coupleHalo)" />
      <g className="couple-float">
        <path d="M91 326c37-12 83-17 149-17 60 0 107 5 149 17" stroke="#c8a465" strokeOpacity=".45" strokeWidth="1.5" />
        <path d="M113 325c25-61 54-102 91-120l39 37 35-37c38 18 70 59 92 120H113Z" fill="#080809" stroke="#c8a465" strokeOpacity=".58" strokeWidth="2" />
        <path d="m187 205 42 36-18 84h-51l10-84-13-19 30-17Zm98 0-42 36 18 84h51l-10-84 13-19-30-17Z" fill="#101012" stroke="#2b2526" strokeWidth="2" />
        <path d="m229 241 12 10 12-10 13 84h-50l13-84Z" fill="#f1e9df" />
        <path d="m240 251 10 14-10 46-10-46 10-14Z" fill="#9f1730" />
        <path d="m192 207 37 31-20 16-29-31 12-16Zm96 0-37 31 20 16 29-31-12-16Z" fill="#151517" stroke="#c8a465" strokeOpacity=".55" strokeWidth="1.5" />
        <path d="M159 81c0-31 19-51 48-51 29 0 48 21 48 52v21c0 28-20 47-48 47s-48-19-48-47V81Z" fill="#c7896b" />
        <path d="M155 89c-8-41 13-69 49-69 33 0 55 24 51 61l-8 13-8-27c-16 3-40-3-58-15-4 14-12 25-26 37Z" fill="#131214" />
        <path d="M170 98c10-8 22-8 31 0m18 0c9-8 21-8 31 0" stroke="#30211e" strokeWidth="2" strokeLinecap="round" />
        <g className="groom-glasses" fill="none" stroke="#171415" strokeWidth="4">
          <rect x="166" y="89" width="25" height="19" rx="5" />
          <rect x="207" y="89" width="25" height="19" rx="5" />
          <path d="M191 96h16m25-1 8-4" strokeLinecap="round" />
        </g>
        <path d="M193 124c8 6 18 6 26 0" stroke="#8b493f" strokeWidth="2" strokeLinecap="round" />
        <path d="M202 145v21m12-21v21" stroke="#bd795f" strokeWidth="8" />
        <path d="M164 59c15-19 43-24 66-10" stroke="#c8a465" strokeWidth="2" strokeLinecap="round" />
        <g className="bride-sway">
          <path className="bride-veil" d="M259 77c-1-33 18-54 48-54 31 0 51 22 51 57 0 52 10 104 41 146-38 30-74 47-112 51-30-45-47-97-45-200Z" fill="url(#veil)" stroke="#c8a465" strokeOpacity=".5" strokeWidth="2" />
          <path d="M269 80c0-29 17-48 41-48s41 19 41 48v26c0 27-17 45-41 45s-41-18-41-45V80Z" fill="#d59a7b" />
          <path d="M265 91c-5-37 15-63 46-63 27 0 45 18 46 49l-9 15-6-26c-18 4-45-3-60-18-1 15-7 29-17 43Z" fill="#241518" />
          <path d="M276 100c8-6 16-6 23 0m20 0c7-6 15-6 22 0" stroke="#59302b" strokeWidth="2" strokeLinecap="round" />
          <path d="M292 125c7 5 15 5 22 0" stroke="#974c47" strokeWidth="2" strokeLinecap="round" />
          <path d="M296 146v21m13-21v21" stroke="#c98b70" strokeWidth="8" />
          <path d="M264 204c14-14 33-22 56-22 20 0 39 8 53 22l36 119H234l30-119Z" fill="url(#brideDress)" stroke="#c8a465" strokeWidth="2" />
          <path d="M266 211c19 14 36 18 54 18s37-5 53-18m-124 78c29 13 52 18 78 18 25 0 49-5 76-18" stroke="#e6bc75" strokeOpacity=".78" strokeWidth="2" />
          <path d="M300 190h18m-9-9v18" stroke="#e6bc75" strokeWidth="2" strokeLinecap="round" />
          <circle cx="309" cy="198" r="9" stroke="#e6bc75" strokeWidth="1.5" />
        </g>
        <path d="M272 209c-20 26-31 44-39 68" stroke="#c7896b" strokeWidth="8" strokeLinecap="round" />
        <path d="M265 206c8 12 14 21 22 27" stroke="#d59a7b" strokeWidth="8" strokeLinecap="round" />
        <path d="M215 67c4-10 12-15 22-15" stroke="#c8a465" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="heart-float" fill="#ef234c">
        <path d="M241 77c-11-10-24 7 0 22 24-15 11-32 0-22Z" />
      </g>
      <g className="couple-sparkles" fill="#e6bc75">
        <path d="M112 124v14m-7-7h14M370 115v12m-6-6h12M387 215v10m-5-5h10" />
        <circle cx="112" cy="124" r="2" /><circle cx="370" cy="115" r="2" />
      </g>
    </svg>
  );
}

export default function InvitationClient({ guest }: { guest: Guest }) {
  const [status, setStatus] = useState(guest.rsvp_status);
  const attendeeCount = guest.attendee_count ?? guest.seats;
  const [message, setMessage] = useState(guest.message ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.38;
  }, []);

  async function openInvitation() {
    if (opening) return;
    setOpening(true);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => setOpened(true), reducedMotion ? 80 : 1900);

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

      <MehendiBackdrop />

      {!opened && (
        <div className={`opening-screen ${opening ? "is-opening" : ""}`}>
          <div className="opening-doors" aria-hidden="true">
            <picture className="opening-door-art">
              <source
                media="(max-width: 560px)"
                srcSet={opening ? "/images/royal-mehendi-doors-opening-mobile.gif" : "/images/royal-mehendi-doors-mobile.jpg"}
              />
              <img
                key={opening ? "opening" : "closed"}
                src={opening ? "/images/royal-mehendi-doors-opening.gif" : "/images/royal-mehendi-doors.jpg"}
                alt=""
              />
            </picture>
          </div>
          <div className="opening-card">
            <div className="opening-card-frame">
              <div className="opening-kicker">A celebration of love</div>
              <div className="opening-title">Sachintha <span>&amp;</span> Ranumi</div>
              <div className="opening-subtitle">The Homecoming • December 5th, 2026</div>
              <div className="opening-seal" aria-hidden="true">S <span>&amp;</span> R</div>
              <button className="open-invitation" type="button" onClick={openInvitation} disabled={opening}>
                {opening ? "With love…" : "Open Invitation"} <span aria-hidden="true">✦</span>
              </button>
              <p className="opening-note">Tap to open the doors</p>
            </div>
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

          <div className="couple-art couple-art--hero">
            <CoupleIllustration />
          </div>

          <div className="hero-rule" />
          <div className="hero-date">{wedding.dateLabel}</div>
          <br></br>
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
