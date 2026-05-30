import React, { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = {
  Languages: ["Python", "JavaScript", "Java", "C"],
  Frontend: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
  "Backend & Tools": ["Node.js", "Express.js", "RESTful APIs", "JWT Auth", "Git", "GitHub", "Vercel", "Render"],
  Databases: ["MongoDB", "SQL", "PostgreSQL", "Schema Design"],
  "CS Fundamentals": ["DSA", "DBMS", "Operating Systems", "OOP"],
  "Soft Skills": ["Communication", "Team Leadership", "Event Management", "Problem Solving", "Time Management"],
};

const PROJECTS = [
  {
    name: "Fix It Fast",
    subtitle: "On-Demand Home Services Platform",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth"],
    desc: "Full-stack booking platform across 5+ service categories with 10+ RESTful API endpoints covering JWT auth, service discovery, and real-time booking status. Built 25+ React components with role-based interfaces for users and providers; deployed on Vercel + Render.",
    stats: ["10+ APIs", "25+ Components", "Role-Based UI"],
    link: "https://github.com/thecodesofshreya07/FixItFast",
    live: "https://fix-it-fast-iota.vercel.app/",
    color: "#ff6b35",
  },
  {
    name: "Itihas",
    subtitle: "Interactive Historical Exploration Platform",
    tags: ["React.js", "Node.js", "Express.js", "React Leaflet", "OpenRouteService API", "Framer Motion"],
    desc: "Geospatial platform mapping many ancient locations with dynamic timeline routing and intelligent multi-point historical navigation. Features interactive quizzes, downloadable report summaries, and profile login for persistent memory.",
    stats: ["Many Locations", "Sub-2s Load", "Timeline Routing", "Quiz & Reports"],
    link: "https://github.com/thecodesofshreya07/ITIHAS",
    live: "https://itihas-one.vercel.app/",
    color: "#7c3aed",
  },
  {
    name: "Campus Navigator",
    subtitle: "Real-Time Wayfinding App · IIT Bombay",
    tags: ["React.js", "React Leaflet", "OpenRouteService API"],
    desc: "Campus navigation for IIT Bombay covering 12+ buildings with live route calculation and sub-1.5s query response.",
    stats: ["IIT Bombay", "12+ Buildings", "Sub-1.5s Query", "Live Routes"],
    link: "https://github.com/thecodesofshreya07/tricoded-webies",
    live: "https://tricoded-webies.vercel.app/",
    color: "#0ea5e9",
  },
  {
    name: "SkillSea",
    subtitle: "Skill-Sharing & Learning Platform",
    tags: ["HTML", "CSS", "JavaScript", "Node.js"],
    desc: "Peer-to-peer skill-sharing platform where users can browse, list, and learn skills across multiple categories. Features course listings, category-based discovery, and a clean responsive UI.",
    stats: ["Multi-Category", "Peer-to-Peer", "Frontend", "Live"],
    link: "https://github.com/thecodesofshreya07/SkillSea",
    live: "https://skill-sea.vercel.app/",
    color: "#10b981",
  },
  {
    name: "FlavourHunt",
    subtitle: "Recipe Discovery App",
    tags: ["HTML", "CSS", "JavaScript", "Node.js"],
    desc: "Recipe discovery and food exploration app with rich filtering, search, and category-based browsing across multiple cuisines and meal types.",
    stats: ["Search & Filter", "Category Browse", "Frontend"],
    link: "https://github.com/thecodesofshreya07/FlavourHunt",
    live: "https://flavour-hunt-henna.vercel.app/",
    color: "#f59e0b",
  },
  {
    name: "Artello",
    subtitle: "Creative Portfolio Tool",
    tags: ["React.js", "Canvas", "Socket.io"],
    desc: "A creative drawing and portfolio tool built with React, canvas-based interactions, and real-time collaboration via Socket.io.",
    stats: ["Canvas Drawing", "Real-Time", "Creative Tool"],
    link: "https://github.com/thecodesofshreya07/artello",
    color: "#ec4899",
  },
];

const EXPERIENCE = [
  {
    year: "Apr 2025 – Apr 2026",
    title: "Member, National Level Committee",
    org: "Computer Society of India (CSI)",
    points: [
      "Co-organized 3+ national-scale tech events — handled logistics, speaker outreach, and community engagement.",
      "Secured a study abroad sponsorship and signed an MOU, opening up international opportunities for students.",
    ],
  },
  {
    year: "2024 – Present",
    title: "B.E. Computer Engineering",
    org: "CGPA 9.4 · Sem 1: 9.37 | Sem 2: 9.25 | Sem 3: 9.59",
    points: [],
  },
];

const ACHIEVEMENTS = [
  "3rd Place — MOSAIC National Level UI/UX Hackathon, RAIT D.Y. Patil (50+ teams)",
  "JEE Mains 93.17 percentile · MHT-CET 98.713 percentile — top 2% of 800,000+ candidates",
];

// ─── Typewriter ───────────────────────────────────────────────────────────────
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), pause);
        else setCharIdx(c => c + 1);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx === 0) { setDeleting(false); setWordIdx(w => (w + 1) % words.length); }
        else setCharIdx(c => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

// ─── Particles ────────────────────────────────────────────────────────────────
function Particles({ dark }) {
  const canvasRef = useRef(null);
  const darkRef = useRef(dark);
  useEffect(() => { darkRef.current = dark; }, [dark]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
    }));
    let raf;
    function draw() {
      const ctx = canvas.getContext("2d");
      const isDark = darkRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dotColor = isDark ? "rgba(167,139,250,0.5)" : "rgba(59,70,180,0.65)";
      const lineBase = isDark ? "rgba(124,58,237," : "rgba(59,70,180,";
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = dotColor; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = lineBase + (0.16 * (1 - dist / 120)).toFixed(3) + ")";
            ctx.lineWidth = 0.7; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}


// ─── ScrollTopBtn ─────────────────────────────────────────────────────────────
function ScrollTopBtn({ T, scrolled }) {
  return scrolled ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      title="Back to top"
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 300,
        width: 44, height: 44, borderRadius: "50%",
        background: T.btnPrimary, border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
        transition: "all 0.2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.filter = "brightness(1.15)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.filter = ""; }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  ) : null;
}

// ─── ContactGrid ──────────────────────────────────────────────────────────────
function ContactGrid({ T }) {
  const [copied, setCopied] = React.useState(false);
  const copyEmail = () => {
    navigator.clipboard.writeText("sm8054800@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, maxWidth: 640, margin: "0 auto" }}>
      {/* Email card with copy */}
      <div className="contact-card"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 14px", background: T.bgCard, border: `1px solid ${T.cardBorder}`, borderRadius: 12, cursor: "default", position: "relative" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent + "55"; e.currentTarget.style.background = T.pillBg; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = T.cardBorder; e.currentTarget.style.background = T.bgCard; }}>
        <span style={{ fontSize: 10, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 8, fontWeight: 600 }}>Email</span>
        <a href="mailto:sm8054800@gmail.com" style={{ fontSize: 12.5, color: T.accent, fontWeight: 600, wordBreak: "break-all", lineHeight: 1.5, cursor: "pointer" }}>sm8054800@gmail.com</a>
        <button onClick={copyEmail} title="Copy email" style={{ marginTop: 10, background: "transparent", border: `1px solid ${T.cardBorder}`, borderRadius: 6, padding: "4px 10px", fontSize: 11, color: copied ? T.accent : T.textMuted, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 500, transition: "all 0.2s" }}>
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      {[
        { label: "GitHub", val: "thecodesofshreya07", href: "https://github.com/thecodesofshreya07" },
        { label: "LinkedIn", val: "Shreya Mishra", href: "https://www.linkedin.com/in/shreya-mishra-55157a31a/" },
      ].map(({ label, val, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-card"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 14px", background: T.bgCard, border: `1px solid ${T.cardBorder}`, borderRadius: 12, color: T.text, cursor: "pointer" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent + "55"; e.currentTarget.style.background = T.pillBg; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = T.cardBorder; e.currentTarget.style.background = T.bgCard; }}>
          <span style={{ fontSize: 10, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 8, fontWeight: 600 }}>{label}</span>
          <span style={{ fontSize: 12.5, color: T.accent, fontWeight: 600, wordBreak: "break-all", lineHeight: 1.5 }}>{val}</span>
        </a>
      ))}
    </div>
  );
}

// ─── CurrentlyLearning ────────────────────────────────────────────────────────
const LEARNING_TRACKS = [
  {
    category: "Frontend Expansion",
    color: "#3178c6",
    icon: "⬡",
    items: [
      { name: "TypeScript", progress: 52, note: "Type systems, generics, utility types" },
      { name: "Angular", progress: 34, note: "Components, RxJS, dependency injection" },
    ],
  },
  {
    category: "Backend & Infrastructure",
    color: "#06b6d4",
    icon: "⬡",
    items: [
      { name: "Docker & Containerization", progress: 45, note: "Images, volumes, docker-compose" },
      { name: "Redis & Caching", progress: 38, note: "Cache strategies, pub/sub, TTL patterns" },
      { name: "Rate Limiting", progress: 42, note: "Token bucket, sliding window algorithms" },
    ],
  },
];

function LearningBar({ progress, color, animate }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setWidth(progress), 120);
      return () => clearTimeout(t);
    }
  }, [animate, progress]);
  return (
    <div style={{ height: 5, borderRadius: 99, background: "rgba(128,128,128,0.13)", overflow: "hidden", flex: 1 }}>
      <div style={{
        height: "100%", borderRadius: 99,
        background: `linear-gradient(90deg, ${color}, ${color}bb)`,
        width: `${width}%`,
        transition: "width 1.1s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: `0 0 8px ${color}55`,
      }} />
    </div>
  );
}

function CurrentlyLearning({ T, dark }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginTop: 40 }}>
      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
        @keyframes scanline { 0%{transform:translateX(-100%)} 100%{transform:translateX(400%)} }
        .learn-card:hover .learn-scanline { animation: scanline 1.4s ease forwards; }
        .learn-item { transition: background 0.2s; }
        .learn-item:hover { background: rgba(128,128,128,0.06) !important; }
      `}</style>

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: "0.14em" }}>
          Currently Learning
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 99, background: dark ? "rgba(34,197,94,0.1)" : "rgba(22,163,74,0.08)", border: `1px solid ${dark ? "rgba(34,197,94,0.25)" : "rgba(22,163,74,0.2)"}` }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "pulse-dot 1.8s ease-in-out infinite" }} />
          <span style={{ fontSize: 10.5, fontWeight: 600, color: "#22c55e", letterSpacing: "0.06em" }}>Active</span>
        </div>
      </div>

      {/* Tagline */}
      <p style={{ fontSize: 13.5, color: T.textSub, lineHeight: 1.8, fontWeight: 300, maxWidth: 600, marginBottom: 24 }}>
        Always picking up something new. Expanding into large-scale frontend architecture with{" "}
        <span style={{ color: T.text, fontWeight: 500 }}>TypeScript</span> &{" "}
        <span style={{ color: T.text, fontWeight: 500 }}>Angular</span>, and going deep on backend infrastructure —{" "}
        <span style={{ color: T.text, fontWeight: 500 }}>Docker</span>, <span style={{ color: T.text, fontWeight: 500 }}>Redis</span>, <span style={{ color: T.text, fontWeight: 500 }}>rate limiting</span>, and the whole ecosystem.
      </p>

      {/* Track cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {LEARNING_TRACKS.map(track => (
          <div key={track.category} className="learn-card" style={{
            background: T.bgCard, border: `1px solid ${T.cardBorder}`,
            borderRadius: 14, padding: "20px 22px", position: "relative", overflow: "hidden",
          }}>
            {/* Scanline shimmer on hover */}
            <div className="learn-scanline" style={{
              position: "absolute", top: 0, left: 0, width: "25%", height: "100%",
              background: `linear-gradient(90deg, transparent, ${track.color}18, transparent)`,
              pointerEvents: "none",
            }} />

            {/* Top accent line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${track.color}, ${track.color}00)`, borderRadius: "14px 14px 0 0" }} />

            {/* Category header */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: track.color + "1a", border: `1px solid ${track.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: track.color }}>
                {track.icon}
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.text, letterSpacing: "0.02em" }}>{track.category}</span>
            </div>

            {/* Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {track.items.map(item => (
                <div key={item.name} className="learn-item" style={{ borderRadius: 8, padding: "10px 12px", background: "transparent" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                    <LearningBar progress={item.progress} color={track.color} animate={visible} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: track.color, minWidth: 32, textAlign: "right" }}>{item.progress}%</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{item.name}</span>
                    <span style={{ fontSize: 11, color: T.textMuted, fontWeight: 300, textAlign: "right", flexShrink: 0, maxWidth: 160 }}>{item.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const typed = useTypewriter(["a Full-Stack Developer", "a React.js Enthusiast", "a Backend Enthusiast", "an Aspiring SDE", "a Problem Solver"]);

  const T = dark ? {
    bg: "#09090e", bgAlt: "#0c0c14", bgCard: "rgba(255,255,255,0.035)",
    text: "#ede9fe", textSub: "#a1a1aa", textMuted: "#52525b",
    accent: "#a78bfa", accentDark: "#7c3aed",
    navBg: "rgba(9,9,14,0.9)", navBorder: "rgba(124,58,237,0.15)",
    cardBorder: "rgba(124,58,237,0.14)", pillBg: "rgba(167,139,250,0.1)",
    pillColor: "#a78bfa", pillBorder: "rgba(167,139,250,0.25)",
    heroSub: "#c4b5fd",
    btnPrimary: "linear-gradient(135deg,#7c3aed,#4f46e5)", btnPrimaryColor: "#fff",
    btnSecBorder: "rgba(167,139,250,0.5)", btnSecColor: "#a78bfa",
    statVal: "#a78bfa",
    divider: "linear-gradient(90deg,#7c3aed,#4f46e5,#818cf8)",
    sectionTitle: "#ede9fe",
    toggleBg: "#18103a", toggleBorder: "#3b1d8a", toggleKnob: "#a78bfa",
    heroBg: "#09090e",
    tagBg: c => c + "15", tagBorder: c => c + "40",
    statBg: "rgba(124,58,237,0.1)",
  } : {
    bg: "#f5f5f0", bgAlt: "#ffffff", bgCard: "#ffffff",
    text: "#0f172a", textSub: "#4b5563", textMuted: "#9ca3af",
    accent: "#f97316", accentDark: "#ea580c",
    navBg: "rgba(255,255,255,0.96)", navBorder: "rgba(0,0,0,0.07)",
    cardBorder: "rgba(0,0,0,0.08)", pillBg: "rgba(249,115,22,0.07)",
    pillColor: "#ea580c", pillBorder: "rgba(249,115,22,0.22)",
    heroSub: "#1e293b",
    btnPrimary: "linear-gradient(135deg,#1e3a5f,#1d4ed8)", btnPrimaryColor: "#fff",
    btnSecBorder: "#1e3a5f", btnSecColor: "#1e3a5f",
    statVal: "#ea580c",
    divider: "linear-gradient(90deg,#f97316,#ea580c)",
    sectionTitle: "#0f172a",
    toggleBg: "#e2e8f0", toggleBorder: "#cbd5e1", toggleKnob: "#475569",
    heroBg: "#f5f5f0",
    tagBg: c => c + "12", tagBorder: c => c + "38",
    statBg: "rgba(0,0,0,0.05)",
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
      }),
      { threshold: 0.25, rootMargin: "-60px 0px 0px 0px" }
    );
    NAV_LINKS.forEach(n => { const el = document.getElementById(n.toLowerCase()); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = id => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  const NAV_H = 64;

  const pill = color => ({
    display: "inline-block", padding: "3px 11px", borderRadius: 20,
    fontSize: 12, fontWeight: 500, marginRight: 6, marginBottom: 6,
    background: T.tagBg(color), color, border: `1px solid ${T.tagBorder(color)}`,
  });

  const defaultPill = {
    display: "inline-block", padding: "3px 11px", borderRadius: 20,
    fontSize: 12, fontWeight: 500, marginRight: 6, marginBottom: 6,
    background: T.pillBg, color: T.pillColor, border: `1px solid ${T.pillBorder}`,
  };

  const secLabel = { color: T.accent, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", fontSize: 11, marginBottom: 12 };
  const secTitle = { fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,4vw,44px)", fontWeight: 700, color: T.sectionTitle, marginBottom: 12, lineHeight: 1.1 };
  const dividerBar = { width: 48, height: 2, background: T.divider, borderRadius: 2, marginBottom: 36 };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
          width: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          scroll-behavior: smooth;
          cursor: default;
        }
        body { font-family: 'DM Sans', sans-serif; cursor: default; }
        /* Prevent I-beam cursor on all text/spans unless explicitly overridden */
        span, p, h1, h2, h3, h4, div { cursor: default; }
        a { text-decoration: none; cursor: pointer; }
        button { cursor: pointer; }

        .nl {
          position: relative; cursor: pointer; font-size: 13.5px; font-weight: 500;
          padding: 4px 0; letter-spacing: 0.01em; transition: color 0.2s; white-space: nowrap;
        }
        .nl::after {
          content: ''; position: absolute; bottom: -1px; left: 0; right: 0;
          height: 1.5px; border-radius: 2px; background: currentColor;
          transform: scaleX(0); transform-origin: left; transition: transform 0.25s ease;
        }
        .nl:hover::after, .nl.act::after { transform: scaleX(1); }

        .hamburger { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }

        .page-root {
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .full-section { width: 100%; }
        .inner {
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 clamp(1.2rem, 4vw, 3.5rem);
        }

        .sec-pad { padding: 96px 0; }
        @media (max-width: 768px) { .sec-pad { padding: 68px 0; } }
        @media (max-width: 480px) { .sec-pad { padding: 52px 0; } }

        .proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 22px;
        }
        @media (max-width: 640px) { .proj-grid { grid-template-columns: 1fr; } }

        .skill-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: start;
        }
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; gap: 36px; } }

        .info-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .exp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; }
        @media (max-width: 768px) { .exp-grid { grid-template-columns: 1fr; gap: 40px; } }

        .contact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        @media (max-width: 640px) { .contact-grid { grid-template-columns: 1fr 1fr; } }

        .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .hero-stats { display: flex; gap: 44px; justify-content: center; flex-wrap: wrap; margin-top: 56px; }

        .mobile-menu {
          position: fixed; top: 64px; left: 0; right: 0; bottom: 0;
          z-index: 199; overflow-y: auto; padding: 1.5rem 2rem 3rem;
        }

        .proj-card { transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease; }
        .proj-card:hover { transform: translateY(-5px); }
        .contact-card { transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease; }
        .contact-card:hover { transform: translateY(-4px); }
        .achieve-row { transition: transform 0.2s ease; }
        .achieve-row:hover { transform: translateX(4px); }

        .t { transition: background 0.35s ease, color 0.35s ease, border-color 0.35s ease; }

        /* Theme toggle */
        .theme-toggle {
          position: relative; width: 52px; height: 26px; border-radius: 13px;
          cursor: pointer; border: 1.5px solid; outline: none;
          transition: all 0.3s;
        }
        .toggle-icon {
          position: absolute; top: 50%; transform: translateY(-50%);
          font-size: 12px; line-height: 1; transition: opacity 0.25s;
          display: flex; align-items: center; justify-content: center;
        }
        .toggle-knob {
          position: absolute; top: 2px; width: 18px; height: 18px;
          border-radius: 50%; transition: left 0.3s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }
      `}</style>

      <div className="page-root t" style={{ background: T.bg, color: T.text }}>

        {/* ── NAVBAR ── */}
        <header className="t" style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: NAV_H,
          background: scrolled ? T.navBg : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: `1px solid ${scrolled ? T.navBorder : "transparent"}`,
          transition: "background 0.3s, border-color 0.3s",
        }}>
          <div style={{ width: "100%", maxWidth: 1160, margin: "0 auto", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(1.2rem,4vw,3.5rem)", position: "relative" }}>
            <div onClick={() => scrollTo("Home")} style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: T.accent, cursor: "pointer", flexShrink: 0, letterSpacing: "-0.4px" }}>
              Shreya<span style={{ opacity: 0.3, color: T.text }}>.</span>
            </div>

            <nav className="desktop-nav" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "2.2rem", alignItems: "center" }}>
              {NAV_LINKS.map(n => (
                <span key={n} className={`nl${active === n ? " act" : ""}`} onClick={() => scrollTo(n)} style={{ color: active === n ? T.accent : T.textSub }}>{n}</span>
              ))}
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              {/* Theme toggle with sun/moon icons */}
              <button
                onClick={() => setDark(d => !d)}
                aria-label="Toggle theme"
                className="theme-toggle"
                style={{ background: T.toggleBg, borderColor: T.toggleBorder }}
              >
                {/* Sun icon (visible in dark mode → clicking switches to light) */}
                <span className="toggle-icon" style={{ left: 5, opacity: dark ? 1 : 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                </span>
                {/* Moon icon (visible in light mode → clicking switches to dark) */}
                <span className="toggle-icon" style={{ right: 5, opacity: dark ? 0 : 1 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={T.toggleKnob} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                </span>
                <span className="toggle-knob" style={{ left: dark ? "calc(100% - 21px)" : 2, background: T.toggleKnob }} />
              </button>

              <button className="hamburger" onClick={() => setMenuOpen(m => !m)} aria-label="Menu" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{ width: 22, height: 2, borderRadius: 2, background: T.accent, display: "block", transition: "all 0.25s", transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none") : "none", opacity: menuOpen && i === 1 ? 0 : 1 }} />
                ))}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile overlay */}
        {menuOpen && (
          <div className="mobile-menu t" style={{ background: T.navBg, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
            <div style={{ borderTop: `1px solid ${T.navBorder}`, paddingTop: "1.5rem" }}>
              {NAV_LINKS.map(n => (
                <div key={n} onClick={() => scrollTo(n)} style={{ padding: "14px 0", fontSize: 20, fontWeight: 600, color: active === n ? T.accent : T.text, borderBottom: `1px solid ${T.navBorder}`, cursor: "pointer", transition: "color 0.2s" }}>{n}</div>
              ))}
            </div>
          </div>
        )}

        {/* ── HERO ── */}
        <section id="home" className="full-section" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: T.heroBg, paddingTop: NAV_H }}>
          <Particles dark={dark} />
          {dark && (
            <>
              <div style={{ position: "absolute", top: "18%", left: "6%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.1),transparent 70%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "14%", right: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(79,70,229,0.08),transparent 70%)", pointerEvents: "none" }} />
            </>
          )}
          <div style={{ position: "relative", zIndex: 2, textAlign: "center", width: "100%", padding: "clamp(2rem,6vw,5rem) clamp(1.2rem,4vw,2.5rem)" }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px,7.5vw,92px)", fontWeight: 700, lineHeight: 1.04, marginBottom: 16, ...(dark ? { background: "linear-gradient(135deg,#ede9fe 20%,#a78bfa 60%,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" } : { color: "#0f172a" }) }}>
              {dark ? "Shreya Mishra" : <>Hi, I'm <span style={{ color: T.accent }}>Shreya</span></>}
            </h1>
            <p style={{ fontSize: "clamp(17px,2.4vw,24px)", color: T.heroSub, fontWeight: 400, marginBottom: 32, minHeight: 34, letterSpacing: "-0.01em" }}>
              I am <span style={{ color: T.accent, borderRight: `2px solid ${T.accent}`, paddingRight: 4, fontWeight: 600 }}>{typed}</span>
            </p>
            <p style={{ color: T.textSub, fontSize: "clamp(13px,1.6vw,15px)", maxWidth: 500, margin: "0 auto 36px", lineHeight: 1.85, fontWeight: 300 }}>
              Final year Computer Engineering student · CGPA 9.4 · I love building things that actually work.
            </p>
            <div className="hero-btns">
              <button onClick={() => scrollTo("Projects")} style={{ padding: "13px 32px", background: T.btnPrimary, color: T.btnPrimaryColor, border: "none", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s", boxShadow: dark ? "0 0 24px rgba(124,58,237,0.28)" : "0 4px 16px rgba(30,58,95,0.18)", fontFamily: "'DM Sans',sans-serif" }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.filter = "brightness(1.1)"; }}
                onMouseLeave={e => { e.target.style.transform = ""; e.target.style.filter = ""; }}>
                View Projects
              </button>
              <a href="/ShreyaMishraResume.pdf" download style={{ padding: "12px 32px", background: "transparent", color: T.btnSecColor, border: `1.5px solid ${T.btnSecBorder}`, borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s", fontFamily: "'DM Sans',sans-serif", display: "inline-flex", alignItems: "center", gap: 7, textDecoration: "none" }}
                onMouseEnter={e => { e.currentTarget.style.background = T.pillBg; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Resume
              </a>
              <button onClick={() => scrollTo("Contact")} style={{ padding: "12px 32px", background: "transparent", color: T.btnSecColor, border: `1.5px solid ${T.btnSecBorder}`, borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s", fontFamily: "'DM Sans',sans-serif" }}
                onMouseEnter={e => { e.target.style.background = T.pillBg; }}
                onMouseLeave={e => { e.target.style.background = "transparent"; }}>
                Get in Touch
              </button>
            </div>
            <div className="hero-stats">
              {[{ label: "9.4", sub: "CGPA" }, { label: "6+", sub: "Projects" }, { label: "3+", sub: "Live Apps" }].map(({ label, sub }) => (
                <div key={sub} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,38px)", fontWeight: 700, color: T.statVal, letterSpacing: "-0.03em" }}>{label}</div>
                  <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.14em", marginTop: 4, fontWeight: 500 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="full-section sec-pad t" style={{ background: T.bgAlt }}>
          <div className="inner">
            <div className="about-grid">
              <div>
                <p style={secLabel}>About</p>
                <h2 style={secTitle}>Building things <span style={{ color: T.accent }}>that matter.</span></h2>
                <div style={dividerBar} />
                <p style={{ color: T.textSub, lineHeight: 1.9, fontSize: 15, marginBottom: 16, fontWeight: 300 }}>
                  I'm a Computer Engineering student with a CGPA of 9.4, and I genuinely enjoy the process of building things — from designing APIs to making a UI feel just right. I've shipped 3+ full-stack apps that are live and actually used.
                </p>
                <p style={{ color: T.textSub, lineHeight: 1.9, fontSize: 15, marginBottom: 32, fontWeight: 300 }}>
                  Outside of code, I've been part of a national-level CSI committee where I got to lead events, handle sponsorships, and work with people from colleges across the country. I'm someone who follows through — whether that's a deadline, a bug at 2am, or a presentation to stakeholders.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[
                    { label: "GitHub", href: "https://github.com/thecodesofshreya07" },
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/shreya-mishra-55157a31a/" },
                    { label: "Email", href: "mailto:sm8054800@gmail.com" },
                  ].map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      style={{ padding: "8px 20px", borderRadius: 7, background: T.pillBg, color: T.pillColor, border: `1px solid ${T.pillBorder}`, fontWeight: 500, fontSize: 13, transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
                      {label} ↗
                    </a>
                  ))}
                </div>
              </div>
              <div className="info-cards">
                {[
                  { label: "Education", val: "B.E. Computer Engg", sub: "2024–Present" },
                  { label: "Location", val: "Mumbai, India", sub: "Open to remote & on-site" },
                  { label: "CGPA", val: "9.4", sub: "Cumulative (all semesters)" },
                  { label: "Goal", val: "Software Developer", sub: "Seeking 2025" },
                ].map(({ label, val, sub }) => (
                  <div key={label}
                    style={{ background: T.bgCard, border: `1px solid ${T.cardBorder}`, borderRadius: 12, padding: "20px 16px", textAlign: "center", transition: "border-color 0.25s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent + "55"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.cardBorder; }}>
                    <div style={{ fontSize: 10, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6, fontWeight: 500 }}>{label}</div>
                    <div style={{ fontWeight: 600, color: T.text, fontSize: 13.5, marginBottom: 3 }}>{val}</div>
                    <div style={{ fontSize: 11.5, color: T.textSub, fontWeight: 300 }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="full-section sec-pad t" style={{ background: T.bg }}>
          <div className="inner">
            <p style={secLabel}>What I Know</p>
            <h2 style={secTitle}>Technical <span style={{ color: T.accent }}>Skills</span></h2>
            <div style={dividerBar} />
            <div className="skill-grid">
              {Object.entries(SKILLS).map(([cat, items]) => (
                <div key={cat}
                  style={{ background: T.bgCard, border: `1px solid ${T.cardBorder}`, borderRadius: 12, padding: "20px", transition: "border-color 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent + "44"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.cardBorder; }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 14 }}>{cat}</div>
                  <div>{items.map(s => <span key={s} style={defaultPill}>{s}</span>)}</div>
                </div>
              ))}
            </div>
            {/* ── CURRENTLY LEARNING ── */}
            <CurrentlyLearning T={T} dark={dark} />
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="full-section sec-pad t" style={{ background: T.bgAlt }}>
          <div className="inner">
            <p style={secLabel}>What I've Built</p>
            <h2 style={secTitle}>Featured <span style={{ color: T.accent }}>Projects</span></h2>
            <div style={dividerBar} />
            <div className="proj-grid">
              {PROJECTS.map(p => (
                <div key={p.name} className="proj-card"
                  style={{ background: T.bgCard, border: `1px solid ${dark ? p.color + "28" : T.cardBorder}`, borderRadius: 14, padding: "26px" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + "66"; e.currentTarget.style.boxShadow = `0 16px 40px ${p.color}10`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? p.color + "28" : T.cardBorder; e.currentTarget.style.boxShadow = ""; }}>
                  <div style={{ width: 32, height: 3, background: p.color, borderRadius: 2, marginBottom: 18 }} />
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, fontWeight: 700, color: T.text, marginBottom: 4 }}>{p.name}</h3>
                  <p style={{ fontSize: 12, color: T.textMuted, marginBottom: 14, fontWeight: 400 }}>{p.subtitle}</p>
                  <div style={{ marginBottom: 12 }}>{p.tags.map(t => <span key={t} style={pill(p.color)}>{t}</span>)}</div>
                  <p style={{ fontSize: 13.5, color: T.textSub, lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                    {p.stats.map(s => <span key={s} style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 6, background: T.statBg, color: T.textSub, border: `1px solid ${T.cardBorder}` }}>{s}</span>)}
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 7, background: p.color + "14", color: p.color, border: `1px solid ${p.color}38`, fontSize: 13, fontWeight: 600, transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = p.color + "24"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = p.color + "14"; }}>
                      GitHub ↗
                    </a>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 7, background: "transparent", color: T.textSub, border: `1px solid ${T.cardBorder}`, fontSize: 13, fontWeight: 600, transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = T.pillBg; e.currentTarget.style.color = p.color; e.currentTarget.style.borderColor = p.color + "44"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.textSub; e.currentTarget.style.borderColor = T.cardBorder; }}>
                        Live ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="full-section sec-pad t" style={{ background: T.bg }}>
          <div className="inner">
            <p style={secLabel}>Journey</p>
            <h2 style={secTitle}>Experience & <span style={{ color: T.accent }}>Achievements</span></h2>
            <div style={dividerBar} />
            <div className="exp-grid">
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 28 }}>Experience</div>
                {EXPERIENCE.map(({ year, title, org, points }, idx, arr) => (
                  <div key={title} style={{ display: "flex", marginBottom: 0 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 18, flexShrink: 0 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.accent, marginTop: 5, flexShrink: 0, boxShadow: dark ? `0 0 10px ${T.accent}88` : "none" }} />
                      {idx < arr.length - 1 && <div style={{ flex: 1, width: 1.5, background: T.accent + "30", marginTop: 5, minHeight: 44 }} />}
                    </div>
                    <div style={{ paddingBottom: 30 }}>
                      <div style={{ fontSize: 10.5, color: T.accent, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{year}</div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 3 }}>{title}</div>
                      <div style={{ fontSize: 13, color: T.textSub, marginBottom: points.length ? 10 : 0, fontWeight: 300 }}>{org}</div>
                      {points.length > 0 && (
                        <ul style={{ paddingLeft: 14, listStyleType: "disc" }}>
                          {points.map(pt => <li key={pt} style={{ color: T.textSub, fontSize: 13, lineHeight: 1.85, marginBottom: 3, fontWeight: 300 }}>{pt}</li>)}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 28 }}>Achievements</div>
                {ACHIEVEMENTS.map((a, i) => (
                  <div key={i} className="achieve-row"
                    style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 18px", background: T.bgCard, border: `1px solid ${T.cardBorder}`, borderRadius: 10, marginBottom: 10 }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent + "44"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.cardBorder; }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent, flexShrink: 0, marginTop: 7 }} />
                    <p style={{ fontSize: 13.5, color: T.textSub, lineHeight: 1.75, margin: 0, fontWeight: 300 }}>{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="full-section sec-pad t" style={{ background: T.bgAlt }}>
          <div className="inner" style={{ textAlign: "center" }}>
            <p style={secLabel}>Let's Connect</p>
            <h2 style={secTitle}>Get In <span style={{ color: T.accent }}>Touch</span></h2>
            <div style={{ ...dividerBar, margin: "0 auto 24px" }} />
            <p style={{ color: T.textSub, fontSize: 15, lineHeight: 1.85, maxWidth: 500, margin: "0 auto 44px", fontWeight: 300 }}>
              I'm looking for software development roles where I can actually contribute from day one. If you have something interesting, or just want to talk — feel free to reach out.
            </p>
            <ContactGrid T={T} />
          </div>
        </section>

        {/* ── SCROLL TO TOP ── */}
        <ScrollTopBtn T={T} scrolled={scrolled} />

        {/* ── FOOTER ── */}
        <footer className="t" style={{ textAlign: "center", padding: "28px 1rem", color: T.textMuted, fontSize: 13, background: T.bg, borderTop: `1px solid ${T.cardBorder}` }}>
          <p style={{ marginBottom: 4 }}>Designed & built by <span style={{ color: T.accent, fontWeight: 600 }}>Shreya Mishra</span></p>
          <p>© {new Date().getFullYear()} · All rights reserved</p>
        </footer>

      </div>
    </>
  );
}
