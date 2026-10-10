"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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

function MehendiBackdrop({ isOpening = false }: { isOpening?: boolean }) {
  return (
    <div className={`mehendi-backdrop${isOpening ? " mehendi-backdrop--opening" : ""}`} aria-hidden="true">
      <svg className="mehendi-vine mehendi-vine--left" viewBox="0 0 260 640" fill="none">
        <path d="M34 638C76 554 63 495 111 430S192 331 151 263 79 179 134 104 201 39 214 3" />
        <path d="M76 549c-42-10-58-38-55-70 33 4 54 28 55 70Zm45-119c43-3 65-26 74-58-34-2-63 17-74 58Zm-3-119c-41-13-53-42-47-73 32 8 52 34 47 73Zm30-121c38 7 65-10 80-40-32-10-65 2-80 40Z" />
        <path d="M104 465c-7-27-1-50 19-66 18 23 14 48-19 66Zm34-147c4-29 19-47 44-53 9 28-5 51-44 53Zm-13-133c-2-28 9-49 33-61 15 25 7 50-33 61Z" />
        <path d="M48 599c-19-8-26-26-18-43 21 4 31 20 18 43Zm42-67c-27-4-37-23-31-43 23 3 37 19 31 43Zm55-83c-28 5-44-9-42-30 22-7 39 4 42 30Zm-22-97c20 8 37-1 43-20-19-10-37-3-43 20Zm37-84c-27-3-38-21-32-41 21 3 34 18 32 41Zm43-81c-21 5-33-7-30-24 17-7 30 2 30 24Z" />
        <path d="M80 578c13-14 30-13 37 1 7 15-11 27-19 16-5-7 1-14 7-11m44-109c-12-16-5-32 9-34 15-2 19 18 7 22-7 2-11-5-6-9m31-107c15-12 32-7 35 7 3 15-16 21-21 10-3-7 4-12 9-7" />
        <circle cx="143" cy="263" r="23" /><circle cx="143" cy="263" r="10" />
        <circle cx="111" cy="430" r="18" /><circle cx="111" cy="430" r="7" />
      </svg>
      <svg className="mehendi-vine mehendi-vine--right" viewBox="0 0 260 640" fill="none">
        <path d="M34 638C76 554 63 495 111 430S192 331 151 263 79 179 134 104 201 39 214 3" />
        <path d="M76 549c-42-10-58-38-55-70 33 4 54 28 55 70Zm45-119c43-3 65-26 74-58-34-2-63 17-74 58Zm-3-119c-41-13-53-42-47-73 32 8 52 34 47 73Zm30-121c38 7 65-10 80-40-32-10-65 2-80 40Z" />
        <path d="M104 465c-7-27-1-50 19-66 18 23 14 48-19 66Zm34-147c4-29 19-47 44-53 9 28-5 51-44 53Zm-13-133c-2-28 9-49 33-61 15 25 7 50-33 61Z" />
        <path d="M48 599c-19-8-26-26-18-43 21 4 31 20 18 43Zm42-67c-27-4-37-23-31-43 23 3 37 19 31 43Zm55-83c-28 5-44-9-42-30 22-7 39 4 42 30Zm-22-97c20 8 37-1 43-20-19-10-37-3-43 20Zm37-84c-27-3-38-21-32-41 21 3 34 18 32 41Zm43-81c-21 5-33-7-30-24 17-7 30 2 30 24Z" />
        <path d="M80 578c13-14 30-13 37 1 7 15-11 27-19 16-5-7 1-14 7-11m44-109c-12-16-5-32 9-34 15-2 19 18 7 22-7 2-11-5-6-9m31-107c15-12 32-7 35 7 3 15-16 21-21 10-3-7 4-12 9-7" />
        <circle cx="143" cy="263" r="23" /><circle cx="143" cy="263" r="10" />
        <circle cx="111" cy="430" r="18" /><circle cx="111" cy="430" r="7" />
      </svg>
      <svg className="mehendi-vine mehendi-vine--left mehendi-vine--secondary" viewBox="0 0 260 640" fill="none">
        <path d="M16 638c45-49 36-95 80-128s79-57 63-108-63-78-33-135 82-74 50-126S128 65 175 4" />
        <path d="M58 573c-26-5-39-22-34-44 24 2 39 18 34 44Zm48-64c-25 4-40-10-39-31 21-6 38 4 39 31Zm31-104c22 7 39-3 43-24-20-9-39 0-43 24Zm-2-122c-26-6-35-25-27-45 22 5 34 22 27 45Zm28-111c19 9 37 2 44-17-18-12-38-7-44 17Zm-7-99c-20-6-27-22-18-38 18 4 27 18 18 38Z" />
        <path d="M81 554c-2-22 10-37 29-38 8 20-2 36-29 38Zm44-106c-14-18-8-36 9-40 16 12 14 31-9 40Zm9-124c12-20 31-23 44-9-6 21-22 29-44 9Zm28-110c-8-20 1-37 20-41 13 17 7 34-20 41Z" />
        <circle cx="127" cy="302" r="15" /><circle cx="127" cy="302" r="5" />
        <circle cx="159" cy="176" r="12" /><circle cx="159" cy="176" r="4" />
      </svg>
      <svg className="mehendi-vine mehendi-vine--right mehendi-vine--secondary" viewBox="0 0 260 640" fill="none">
        <path d="M16 638c45-49 36-95 80-128s79-57 63-108-63-78-33-135 82-74 50-126S128 65 175 4" />
        <path d="M58 573c-26-5-39-22-34-44 24 2 39 18 34 44Zm48-64c-25 4-40-10-39-31 21-6 38 4 39 31Zm31-104c22 7 39-3 43-24-20-9-39 0-43 24Zm-2-122c-26-6-35-25-27-45 22 5 34 22 27 45Zm28-111c19 9 37 2 44-17-18-12-38-7-44 17Zm-7-99c-20-6-27-22-18-38 18 4 27 18 18 38Z" />
        <path d="M81 554c-2-22 10-37 29-38 8 20-2 36-29 38Zm44-106c-14-18-8-36 9-40 16 12 14 31-9 40Zm9-124c12-20 31-23 44-9-6 21-22 29-44 9Zm28-110c-8-20 1-37 20-41 13 17 7 34-20 41Z" />
        <circle cx="127" cy="302" r="15" /><circle cx="127" cy="302" r="5" />
        <circle cx="159" cy="176" r="12" /><circle cx="159" cy="176" r="4" />
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
      <svg className="mehendi-medallion mehendi-medallion--small mehendi-medallion--upper-left" viewBox="0 0 260 260" fill="none">
        <circle cx="130" cy="130" r="108" /><circle cx="130" cy="130" r="94" />
        {Array.from({ length: 12 }, (_, index) => (
          <g key={index} transform={`rotate(${index * 30} 130 130)`}>
            <path d="M130 25c17 15 20 32 0 52-20-20-17-37 0-52Z" />
            <path d="M130 36v30m-7-12 7 6 7-6" />
          </g>
        ))}
        <circle cx="130" cy="130" r="28" /><circle cx="130" cy="130" r="12" />
        <path d="M130 102c10 10 10 18 0 28-10-10-10-18 0-28Zm0 28c10 10 10 18 0 28-10-10-10-18 0-28Zm0 0c-10 10-18 10-28 0 10-10 18-10 28 0Zm0 0c10-10 18-10 28 0-10 10-18 10-28 0Z" />
      </svg>
      <svg className="mehendi-medallion mehendi-medallion--small mehendi-medallion--lower-right" viewBox="0 0 260 260" fill="none">
        <circle cx="130" cy="130" r="108" /><circle cx="130" cy="130" r="94" />
        {Array.from({ length: 12 }, (_, index) => (
          <g key={index} transform={`rotate(${index * 30} 130 130)`}>
            <path d="M130 25c17 15 20 32 0 52-20-20-17-37 0-52Z" />
            <path d="M130 36v30m-7-12 7 6 7-6" />
          </g>
        ))}
        <circle cx="130" cy="130" r="28" /><circle cx="130" cy="130" r="12" />
        <path d="M130 102c10 10 10 18 0 28-10-10-10-18 0-28Zm0 28c10 10 10 18 0 28-10-10-10-18 0-28Zm0 0c-10 10-18 10-28 0 10-10 18-10 28 0Zm0 0c10-10 18-10 28 0-10 10-18 10-28 0Z" />
      </svg>
    </div>
  );
}

function CoupleIllustration() {
  return (
    <Image
      className="couple-portrait"
      src="/images/couple-faceless-realistic.png"
      alt="A hand-painted, faceless 2D wedding illustration of a groom in a black salwar kameez and glasses beside a bride in a blood-red embroidered lehenga"
      width={1024}
      height={1536}
      loading="eager"
      decoding="async"
    />
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

  function openInvitation() {
    if (opening) return;
    setOpening(true);
    const revealDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 120 : 2550;
    window.setTimeout(() => setOpened(true), revealDuration);

    const audio = audioRef.current;
    if (audio) {
      void audio.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
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

      <MehendiBackdrop isOpening={!opened} />

      {!opened && (
        <div className={`opening-screen${opening ? " is-opening" : ""}`}>
          <div className="opening-layout">
            <div className="envelope-stage" aria-hidden="true">
              <div className="envelope-aura" />
              <div className="invitation-letter">
                <div className="letter-frame">
                  <span className="letter-ornament">❦</span>
                  <span className="letter-kicker">The Homecoming</span>
                  <span className="letter-couple">Sachintha <i>&amp;</i> Ranumi</span>
                  <span className="letter-divider">✦</span>
                  <span className="letter-date">{wedding.dateLabel}</span>
                </div>
              </div>
              <div className="envelope-shell">
                <div className="envelope-back" />
                <div className="envelope-side envelope-side--left" />
                <div className="envelope-side envelope-side--right" />
                <div className="envelope-front">
                  <svg className="envelope-etching" viewBox="0 0 560 300" fill="none">
                    <path d="M26 248c83-2 102-65 142-93 39-27 78-24 112 24 35-48 73-51 112-24 41 28 60 91 142 93M31 267c74 0 98-47 138-72m222 0c40 25 64 72 138 72" />
                    <path d="M280 116c26 19 41 40 41 58s-15 39-41 58c-26-19-41-40-41-58s15-39 41-58Z" />
                    <circle cx="280" cy="174" r="18" />
                    <path d="M280 156v36m-14-18h28m-24-11 20 22m0-22-20 22" />
                    <path d="M156 155c-21-17-24-34-10-50 19 10 24 27 10 50Zm248 0c21-17 24-34 10-50-19 10-24 27-10 50ZM80 216c-22-8-31-24-25-43 23 3 34 18 25 43Zm400 0c22-8 31-24 25-43-23 3-34 18-25 43Z" />
                    <circle cx="146" cy="105" r="4" /><circle cx="414" cy="105" r="4" />
                    <circle cx="55" cy="173" r="4" /><circle cx="505" cy="173" r="4" />
                  </svg>
                </div>
                <div className="envelope-flap" />
                <div className="envelope-seal">
                  <svg viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="17" />
                    <circle cx="24" cy="24" r="12" />
                    <path d="M24 12c5 4 6 8 0 12-6-4-5-8 0-12Zm0 12c6 4 6 8 0 12-6-4-6-8 0-12Zm0 0c-5-4-9-4-12 0 3 5 7 5 12 0Zm0 0c5-4 9-4 12 0-3 5-7 5-12 0Z" />
                    <circle cx="24" cy="24" r="2" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="opening-card">
              <div className="opening-card-frame">
                <div className="opening-title">Sachintha <span>&amp;</span> Ranumi</div>
                <button className="open-invitation" type="button" onClick={openInvitation} disabled={opening}>
                  {opening ? "Opening invitation" : "Open invitation"} <span aria-hidden="true">✦</span>
                </button>
              </div>
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
