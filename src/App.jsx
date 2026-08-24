import React, { useState, useEffect, useRef } from "react";
import OceanicCanvas from "./components/OceanicCanvas";
import OceanicDataNode from "./components/OceanicDataNode";
import { sound } from "./utils/audioSystem";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = {
  "Agentic AI & LLMs": ["Autonomous Agents", "Tool & Function Calling", "Groq", "Gemini API", "RAG Systems", "Model Context Protocol (MCP)"],
  Languages: ["Python", "JavaScript", "Java", "C"],
  Frontend: ["React.js", "Three.js", "WebGL Shaders", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "Recharts"],
  "Creative Tech & Graphics": ["Three.js", "WebGL Shaders", "Math/Trigonometric Animations", "Interactive Cursor Physics", "Canvas 2D API"],
  "Backend & Tools": ["Node.js", "Express.js", "RESTful APIs", "Server-Sent Events (SSE)", "JWT Auth", "Git", "GitHub", "Vercel", "Render"],
  Databases: ["PostgreSQL", "MongoDB", "SQL", "Schema Design"],
  "CS Fundamentals": ["DSA", "DBMS", "Operating Systems", "OOP"],
  "Soft Skills": ["Communication", "Team Leadership", "Event Management", "Problem Solving", "Time Management"],
};

const PROJECTS = [
  {
    name: "SiteSync",
    subtitle: "AI Construction Operations & Agentic Site Management",
    tags: ["React", "Node.js", "PostgreSQL", "Groq", "Agentic Tools", "MCP", "SSE", "Tailwind CSS"],
    desc: "Enterprise multi-site construction operations platform combining real-time telemetry with autonomous LLM agents. Features multi-step tool-calling agents for automated root-cause analysis (RCA), dynamic stockout depletion balancing, 72-hour multimodal photo milestone predictions, 6-stage procurement pipeline tracking, and Model Context Protocol (MCP) server integration.",
    stats: ["Agentic AI", "Tool Calling", "RAG & MCP", "Real-Time SSE"],
    link: "https://github.com/thecodesofshreya07/sitesync",
    live: "https://site-sync-fawn.vercel.app/",
    color: "#38bdf8",
  },
  {
    name: "Artello",
    subtitle: "Creative Collaboration Tool",
    tags: ["React.js", "Canvas", "Socket.io", "Node.js", "MongoDB"],
    desc: "A real-time multiplayer whiteboard built with React and Socket.io, engineered for smooth collaboration at scale. A two-layer canvas architecture redraws only the active stroke instead of the entire drawing history, keeping boards fluid even as they grow large — paired with stroke-point compression that cuts network traffic by ~80%.",
    stats: ["Canvas Drawing", "Real-Time", "Creative Tool"],
    link: "https://github.com/thecodesofshreya07/artello",
    live: "https://artello.vercel.app/",
    color: "#ff729f",
  },
  {
    name: "Fix It Fast",
    subtitle: "On-Demand Home Services Platform",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth"],
    desc: "Full-stack booking platform across 15+ service categories with 10+ RESTful API endpoints covering JWT auth, service discovery, and real-time booking status. Built 25+ React components with role-based interfaces for users and providers; deployed on Vercel + Render.",
    stats: ["10+ APIs", "25+ Components", "Role-Based UI"],
    link: "https://github.com/thecodesofshreya07/FixItFast",
    live: "https://fix-it-fast-iota.vercel.app/",
    color: "#ff9ebb",
  },
  {
    name: "Itihas",
    subtitle: "Interactive Historical Exploration Platform",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "React Leaflet", "OpenRouteService API", "Framer Motion"],
    desc: "Geospatial platform mapping many ancient locations with dynamic timeline routing and intelligent multi-point historical navigation. Features interactive quizzes, downloadable report summaries, and profile login for persistent memory.",
    stats: ["Many Locations", "Sub-2s Load", "Timeline Routing", "Quiz & Reports"],
    link: "https://github.com/thecodesofshreya07/ITIHAS",
    live: "https://itihas-one.vercel.app/",
    color: "#c084fc",
  },
  {
    name: "Campus Navigator",
    subtitle: "Real-Time Wayfinding App · IIT Bombay",
    tags: ["React.js", "React Leaflet", "OpenRouteService API"],
    desc: "Campus navigation for IIT Bombay covering 12+ buildings with live route calculation and sub-1.5s query response.",
    stats: ["IIT Bombay", "12+ Buildings", "Sub-1.5s Query", "Live Routes"],
    link: "https://github.com/thecodesofshreya07/smart-move",
    live: "https://tricoded-webies.vercel.app/",
    color: "#38e8d8",
  },
  {
    name: "SkillSea",
    subtitle: "Skill-Sharing & Learning Platform",
    tags: ["HTML", "CSS", "JavaScript", "Node.js"],
    desc: "Peer-to-peer skill-sharing platform where users can browse, list, and learn skills across multiple categories. Features course listings, category-based discovery, and a clean responsive UI.",
    stats: ["Multi-Category", "Peer-to-Peer", "Frontend", "Live"],
    link: "https://github.com/thecodesofshreya07/SkillSea",
    live: "https://skill-sea.vercel.app/",
    color: "#4ef2d2",
  },
  {
    name: "FlavourHunt",
    subtitle: "Recipe Discovery App",
    tags: ["HTML", "CSS", "JavaScript", "Node.js"],
    desc: "Recipe discovery and food exploration app with rich filtering, search, and category-based browsing across multiple cuisines and meal types.",
    stats: ["Search & Filter", "Category Browse", "Frontend"],
    link: "https://github.com/thecodesofshreya07/FlavourHunt",
    live: "https://thecodesofshreya07.github.io/FlavourHunt/",
    color: "#fcd34d",
  },
  {
    name: "Marvel Universe",
    subtitle: "Marvel Cinematic Experience · Frontend",
    tags: ["React.js", "Framer Motion"],
    desc: "Immersive Marvel-themed frontend experience with cinematic animations, character showcases, and fluid motion design powered by Framer Motion.",
    stats: ["Cinematic UI", "Framer Motion", "Frontend"],
    link: "https://github.com/thecodesofshreya07/marvel",
    live: "https://marvel-black.vercel.app/",
    color: "#f43f5e",
  },
];

const EXPERIENCE = [
  {
    year: "June 2026 – Present",
    title: "Full Stack Development Intern",
    org: "Cpiombo Servtec Pvt. Ltd. · Hybrid, Mumbai",
    points: [
      "Independently work on full-stack development of a B2B Site Operations SaaS platform end-to-end — backend architecture, database design, and frontend — as sole engineer across 4+ core modules.",
      "Architected a complete Supplier Onboarding system single-handedly, replacing a static UI with a live, database-driven pipeline.",
      "Diagnosed and resolved multiple critical data-scoping bugs across the existing platform, migrating core query logic to a more reliable approach across 35+ components and eliminating silently dropped multi-batch records.",
    ],
  },
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
    org: "CGPA 9.5 · Sem 1: 9.37 | Sem 2: 9.25 | Sem 3: 9.59 | Sem 4: 9.83",
    points: [],
  },
];

const ACHIEVEMENTS = [
  {
    title: "2nd Place — CODEISSANCE 2026 (24-Hour Hackathon)",
    images: ["/3.jpeg", "/4.jpeg"],
  },
  {
    title: "3rd Place — MOSAIC National Level UI/UX Hackathon, RAIT D.Y. Patil",
    images: ["/1.jpeg", "/2.jpeg"],
  },
];

const LEARNING_TRACKS = [
  {
    category: "Frontend Expansion",
    color: "#38bdf8",
    icon: "⬡",
    items: [
      { name: "TypeScript", progress: 32, note: "Type systems, generics, utility types" },
      { name: "Angular", progress: 24, note: "Components, RxJS, dependency injection" },
    ],
  },
  {
    category: "Backend & Infrastructure",
    color: "#4ef2d2",
    icon: "⬡",
    items: [
      { name: "Docker & Containerization", progress: 45, note: "Images, docker-compose" },
      { name: "Redis & Caching", progress: 100, note: "Cache strategies, TTL patterns" },
      { name: "Rate Limiting", progress: 88 },
    ],
  },
];

// ─── Typewriter ───────────────────────────────────────────────────────────────
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const current = words[wordIdx] || "";

    let delay = deleting ? speed / 2 : speed;
    if (!deleting && charIdx === current.length) {
      delay = pause;
    } else if (deleting && charIdx === 0) {
      delay = 300;
    }

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplay(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        } else {
          setDeleting(true);
        }
      } else {
        if (charIdx > 0) {
          setDisplay(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setWordIdx((w) => (w + 1) % words.length);
        }
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ─── Achievement Card with Photo Slider ───────────────────────────────────────
function AchievementCard({ item }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const images = item.images || [];

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    if (images.length > 0) {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    if (images.length > 0) {
      setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 35) {
      nextImage();
    } else if (diff < -35) {
      prevImage();
    }
    setTouchStartX(null);
  };

  return (
    <div
      className="peach-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "24px 24px 20px",
        borderRadius: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#ff729f",
            flexShrink: 0,
            marginTop: 7,
            boxShadow: "0 0 10px #ff729f",
          }}
        />
        <p
          style={{
            fontSize: 15,
            color: "#f1f5f9",
            lineHeight: 1.6,
            margin: 0,
            fontWeight: 600,
            textShadow: "0 1px 6px rgba(0,0,0,0.9)",
          }}
        >
          {item.title}
        </p>
      </div>

      {images.length > 0 && (
        <div
          onClick={nextImage}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          title="Click to view next photo"
          style={{
            position: "relative",
            width: "100%",
            height: 240,
            borderRadius: 14,
            overflow: "hidden",
            background: "rgba(3, 13, 27, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            cursor: "pointer",
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            key={currentIdx}
            src={images[currentIdx]}
            alt={`${item.title} photo ${currentIdx + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transition: "transform 0.3s ease",
            }}
          />

          {images.length > 1 && (
            <>
              {/* Prev Button */}
              <button
                type="button"
                onClick={prevImage}
                title="Previous photo"
                aria-label="Previous photo"
                style={{
                  position: "absolute",
                  left: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(6, 24, 46, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  cursor: "pointer",
                  backdropFilter: "blur(6px)",
                  zIndex: 2,
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#ff729f";
                  e.currentTarget.style.borderColor = "#ff729f";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(6, 24, 46, 0.8)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
                }}
              >
                ‹
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={nextImage}
                title="Next photo"
                aria-label="Next photo"
                style={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(6, 24, 46, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  cursor: "pointer",
                  backdropFilter: "blur(6px)",
                  zIndex: 2,
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#ff729f";
                  e.currentTarget.style.borderColor = "#ff729f";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(6, 24, 46, 0.8)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
                }}
              >
                ›
              </button>

              {/* Indicator Dots */}
              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  borderRadius: 99,
                  background: "rgba(2, 11, 22, 0.75)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  backdropFilter: "blur(6px)",
                  zIndex: 2,
                }}
              >
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIdx(idx);
                    }}
                    style={{
                      width: currentIdx === idx ? 16 : 6,
                      height: 6,
                      borderRadius: 99,
                      background: currentIdx === idx ? "#ff729f" : "rgba(255, 255, 255, 0.4)",
                      boxShadow: currentIdx === idx ? "0 0 8px #ff729f" : "none",
                      transition: "all 0.25s ease",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>

              {/* Tag indicator badge */}
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  padding: "3px 8px",
                  borderRadius: 6,
                  background: "rgba(2, 11, 22, 0.75)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "rgba(255, 255, 255, 0.85)",
                  fontSize: 10.5,
                  fontWeight: 600,
                  backdropFilter: "blur(4px)",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              >
                {currentIdx + 1}/{images.length} • Click to switch
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Contact Grid with Copy ───────────────────────────────────────────────────
function ContactGrid() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("sm8054800@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, maxWidth: 760, margin: "0 auto" }}>
      {/* Email Card */}
      <div
        className="peach-card"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 20px",
          borderRadius: 20,
          cursor: "default",
          position: "relative",
        }}
      >
        <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.85)", textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 10, fontWeight: 700 }}>
          Email Address
        </span>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=sm8054800@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 15, color: "#ffffff", fontWeight: 700, wordBreak: "break-all", lineHeight: 1.5, textDecoration: "none", textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          sm8054800@gmail.com
        </a>
        <button
          onClick={copyEmail}
          title="Copy email"
          style={{
            marginTop: 16,
            background: "rgba(255, 255, 255, 0.16)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: 99,
            padding: "7px 20px",
            fontSize: 12.5,
            color: copied ? "#4ef2d2" : "#ffffff",
            cursor: "pointer",
            fontWeight: 700,
            transition: "all 0.2s",
          }}
        >
          {copied ? "Copied to clipboard!" : "Copy Email"}
        </button>
      </div>

      {[
        { label: "GitHub Profile", val: "thecodesofshreya07", href: "https://github.com/thecodesofshreya07" },
        { label: "LinkedIn Profile", val: "Shreya Mishra", href: "https://www.linkedin.com/in/shreya-mishra-55157a31a/" },
      ].map(({ label, val, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="peach-card"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "32px 20px",
            borderRadius: 20,
            color: "#ffffff",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.85)", textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 10, fontWeight: 700 }}>
            {label}
          </span>
          <span style={{ fontSize: 15, color: "#ffffff", fontWeight: 700, wordBreak: "break-all", lineHeight: 1.5, textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>
            {val}
          </span>
          <span style={{ marginTop: 16, fontSize: 12.5, color: "#38bdf8", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
            Open Link ↗
          </span>
        </a>
      ))}
    </div>
  );
}

// ─── Currently Learning Tracks ────────────────────────────────────────────────
function LearningBar({ progress, color, animate }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setWidth(progress), 120);
      return () => clearTimeout(t);
    }
  }, [animate, progress]);

  return (
    <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.08)", overflow: "hidden", flex: 1 }}>
      <div
        style={{
          height: "100%",
          borderRadius: 99,
          background: `linear-gradient(90deg, ${color}, #ff729f)`,
          width: `${width}%`,
          transition: "width 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: `0 0 10px ${color}88`,
        }}
      />
    </div>
  );
}

function CurrentlyLearning() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginTop: 52 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: "#ff9ebb", textTransform: "uppercase", letterSpacing: "0.18em" }}>
          Currently Learning
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 14px", borderRadius: 99, background: "rgba(78, 242, 210, 0.15)", border: "1px solid rgba(78, 242, 210, 0.35)" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ef2d2", boxShadow: "0 0 8px #4ef2d2" }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: "#4ef2d2", letterSpacing: "0.08em", textTransform: "uppercase" }}>Active</span>
        </div>
      </div>

      <p style={{ fontSize: 14.5, color: "#cbd5e1", lineHeight: 1.8, fontWeight: 300, maxWidth: 660, marginBottom: 28 }}>
        Always picking up something new. Expanding into large-scale frontend architecture with{" "}
        <span style={{ color: "#ffffff", fontWeight: 600 }}>TypeScript</span> &{" "}
        <span style={{ color: "#ffffff", fontWeight: 600 }}>Angular</span>, and going deep on backend infrastructure —{" "}
        <span style={{ color: "#ffffff", fontWeight: 600 }}>Docker</span>, <span style={{ color: "#ffffff", fontWeight: 600 }}>Redis</span>, <span style={{ color: "#ffffff", fontWeight: 600 }}>rate limiting</span>, and the whole ecosystem.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
        {LEARNING_TRACKS.map((track) => (
          <div
            key={track.category}
            className="peach-card"
            style={{
              borderRadius: 20,
              padding: "24px 26px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${track.color}, #ff729f)` }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: track.color + "25", border: `1px solid ${track.color}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: track.color }}>
                {track.icon}
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#ffffff", letterSpacing: "0.02em" }}>{track.category}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {track.items.map((item) => (
                <div key={item.name} style={{ borderRadius: 12, padding: "10px 14px", background: "rgba(255,255,255,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <LearningBar progress={item.progress} color={track.color} animate={visible} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: track.color, minWidth: 36, textAlign: "right" }}>{item.progress}%</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: "#ffffff" }}>{item.name}</span>
                    <span style={{ fontSize: 11.5, color: "#94a3b8", fontWeight: 300, textAlign: "right", flexShrink: 0, maxWidth: 180 }}>{item.note}</span>
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

// ─── Scroll To Top Button (Frosted Oceanic Glass) ────────────────────────────
function ScrollTopBtn({ scrolled }) {
  return (
    <button
      onClick={() => {
        sound.playClick();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      title="Back to top"
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 999,
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "rgba(8, 28, 52, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(56, 189, 248, 0.5)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.3)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#38bdf8",
        opacity: scrolled ? 1 : 0,
        pointerEvents: scrolled ? "auto" : "none",
        transform: scrolled ? "scale(1) translateY(0)" : "scale(0.8) translateY(18px)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={(e) => {
        sound.playHover(720);
        e.currentTarget.style.transform = "translateY(-4px) scale(1.1)";
        e.currentTarget.style.borderColor = "#ff729f";
        e.currentTarget.style.color = "#ff729f";
        e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.6), 0 0 24px rgba(255, 114, 159, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = scrolled ? "scale(1) translateY(0)" : "scale(0.8) translateY(18px)";
        e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.5)";
        e.currentTarget.style.color = "#38bdf8";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.3)";
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}

// ─── Main Portfolio App ───────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(false);

  const toggleSound = () => {
    const isNowPlaying = sound.toggleSound();
    setSoundOn(isNowPlaying);
  };

  const handleEnableAudio = () => {
    sound.startBgAudio(true).then(() => {
      setSoundOn(true);
      setShowAudioPrompt(false);
    });
  };

  const handleDismissAudio = () => {
    sound.stopBgAudio();
    setSoundOn(false);
    setShowAudioPrompt(false);
  };

  useEffect(() => {
    // Attempt automatic playback on initial load
    sound.startBgAudio().then((started) => {
      if (started) {
        setSoundOn(true);
        setShowAudioPrompt(false);
      } else {
        // If the browser blocks background audio, ask user explicitly for audio permission
        setShowAudioPrompt(true);
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 280);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const typed = useTypewriter([
    "an Agentic AI Developer",
    "a Full-Stack Developer",
    "a Backend Engineer",
    "an Aspiring SDE",
    "a Problem Solver",
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveNav(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
          }
        });
      },
      { threshold: 0.25, rootMargin: "-80px 0px 0px 0px" }
    );
    NAV_LINKS.forEach((n) => {
      const el = document.getElementById(n.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    sound.playClick();
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  const secLabel = {
    color: "#ff9ebb",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    fontSize: 12,
    marginBottom: 10,
  };

  const secTitle = {
    fontSize: "clamp(30px, 4.5vw, 48px)",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: 14,
    lineHeight: 1.15,
  };

  const dividerBar = {
    width: 54,
    height: 3.5,
    background: "linear-gradient(90deg, #ff729f, #38bdf8)",
    borderRadius: 99,
    marginBottom: 44,
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", position: "relative" }}>
      {/* ── 1. PHOTOREALISTIC OCEANIC BACKGROUND WITH CAUSTICS & LIGHT RAYS ── */}
      <OceanicCanvas />

      {/* ── Audio Permission Entrance Modal (for browsers blocking autoplay) ── */}
      {/* ── Ocean-Themed Audio Permission Entrance Modal ── */}
      {showAudioPrompt && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            background: "radial-gradient(ellipse at 50% 0%, rgba(13, 34, 51, 0.94) 0%, rgba(6, 20, 32, 0.96) 55%, rgba(3, 10, 17, 0.98) 100%)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            overflow: "hidden",
          }}
        >
          {/* Ambient Light Rays */}
          <div className="intro-modal-rays" />

          {/* Floating Theme-Colored Bubbles */}
          {[
            { size: 14, left: "6%", duration: 11, delay: 0, type: "cyan" },
            { size: 8, left: "14%", duration: 14, delay: 2.5, type: "pink" },
            { size: 20, left: "22%", duration: 9, delay: 5.2, type: "cyan" },
            { size: 10, left: "31%", duration: 16, delay: 1.1, type: "pink" },
            { size: 16, left: "42%", duration: 12, delay: 6.4, type: "cyan" },
            { size: 7, left: "54%", duration: 15, delay: 3.2, type: "pink" },
            { size: 22, left: "63%", duration: 10, delay: 4.8, type: "cyan" },
            { size: 12, left: "74%", duration: 13, delay: 0.8, type: "pink" },
            { size: 18, left: "83%", duration: 11, delay: 7.1, type: "cyan" },
            { size: 9, left: "92%", duration: 17, delay: 2.1, type: "pink" },
            { size: 15, left: "10%", duration: 13, delay: 8.5, type: "pink" },
            { size: 11, left: "27%", duration: 10, delay: 9.3, type: "cyan" },
            { size: 24, left: "48%", duration: 12, delay: 3.9, type: "cyan" },
            { size: 8, left: "69%", duration: 15, delay: 1.7, type: "pink" },
            { size: 17, left: "88%", duration: 10, delay: 4.2, type: "cyan" },
          ].map((b, idx) => (
            <div
              key={idx}
              className={`intro-modal-bubble ${b.type === "pink" ? "intro-bubble-pink" : "intro-bubble-cyan"}`}
              style={{
                width: b.size,
                height: b.size,
                left: b.left,
                bottom: "-30px",
                animationDuration: `${b.duration}s`,
                animationDelay: `${b.delay}s`,
              }}
            />
          ))}

          {/* Floating Subtle Jellyfish SVGs */}
          <svg
            className="intro-modal-jelly"
            style={{ top: "8%", left: "8%", width: "clamp(60px, 8vw, 84px)", opacity: 0.22 }}
            viewBox="0 0 100 140"
            fill="none"
          >
            <ellipse cx="50" cy="45" rx="40" ry="35" fill="rgba(56, 189, 248, 0.45)" />
            <path
              d="M15 55 Q20 100 15 135 M30 60 Q35 105 28 135 M50 62 Q50 110 50 138 M70 60 Q65 105 72 135 M85 55 Q80 100 85 135"
              stroke="#38bdf8"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <svg
            className="intro-modal-jelly"
            style={{ bottom: "10%", right: "6%", width: "clamp(70px, 9vw, 100px)", animationDelay: "-4s", opacity: 0.2 }}
            viewBox="0 0 100 140"
            fill="none"
          >
            <ellipse cx="50" cy="45" rx="40" ry="35" fill="rgba(255, 114, 159, 0.45)" />
            <path
              d="M15 55 Q20 100 15 135 M30 60 Q35 105 28 135 M50 62 Q50 110 50 138 M70 60 Q65 105 72 135 M85 55 Q80 100 85 135"
              stroke="#ff729f"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Glass Card */}
          <div
            className="audio-modal-anim"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: 540,
              maxWidth: "92vw",
              padding: "48px 40px 36px",
              borderRadius: 20,
              background: "linear-gradient(160deg, rgba(14, 34, 50, 0.72), rgba(6, 16, 26, 0.88))",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(56, 189, 248, 0.22)",
              boxShadow: "0 24px 64px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            {/* Animated Soundwave Equalizer Mark */}
            <div className="intro-modal-wave">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div
              style={{
                color: "#38bdf8",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "3.5px",
                textTransform: "uppercase",
                marginBottom: 14,
                opacity: 0.9,
              }}
            >
              BELOW THE SURFACE
            </div>

            <h2
              style={{
                fontSize: "clamp(22px, 4.5vw, 30px)",
                fontWeight: 800,
                color: "#f2f6f9",
                lineHeight: 1.3,
                letterSpacing: "-0.3px",
                marginBottom: 14,
              }}
            >
              Listen for what remains unheard.
            </h2>

            <div
              style={{
                color: "rgba(200, 218, 230, 0.7)",
                fontSize: 15,
                lineHeight: 1.6,
                maxWidth: 400,
                margin: "0 auto 32px",
              }}
            >
              The eye sees the surface. Sound reveals the depth.
            </div>

            <button onClick={handleEnableAudio} className="intro-modal-cta">
              Enable Sound
            </button>

            <button onClick={handleDismissAudio} className="intro-modal-silence">
              Continue in silence
            </button>
          </div>
        </div>
      )}

      {/* ── 2. PEACHWEB FLOATING FROSTED HEADER ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 76,
          zIndex: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(1.2rem, 4vw, 3.5rem)",
          background: "linear-gradient(to bottom, rgba(4, 18, 36, 0.7) 0%, rgba(4, 18, 36, 0) 100%)",
        }}
      >
        {/* Left: Clean Brand Logo */}
        <div
          onClick={() => scrollTo("Home")}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.4px",
            }}
          >
            shreya<span style={{ color: "#ff729f" }}>.</span>
          </span>
        </div>

        {/* Center: Frosted Glass Pill Navigation */}
        <nav
          className="desktop-nav-menu"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            padding: "4px 10px",
            borderRadius: 99,
            border: "1px solid rgba(255, 255, 255, 0.18)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          }}
        >
          {NAV_LINKS.map((n, i) => (
            <span
              key={n}
              onClick={() => scrollTo(n)}
              onMouseEnter={() => sound.playHover(440 + i * 55)}
              className={`nav-pill-item ${activeNav === n ? "active" : ""}`}
            >
              {n}
            </span>
          ))}
        </nav>

        {/* Right: Action CTA Buttons & Sound Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Audio Soundscape Toggle Button (Michael Gatt style) */}
          <button
            onClick={toggleSound}
            title={soundOn ? "Mute soundscape" : "Enable atmospheric soundscape"}
            aria-label="Toggle Sound"
            style={{
              background: soundOn ? "rgba(56, 189, 248, 0.2)" : "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: soundOn ? "1px solid rgba(56, 189, 248, 0.6)" : "1px solid rgba(255, 255, 255, 0.2)",
              color: soundOn ? "#38bdf8" : "#cbd5e1",
              borderRadius: 99,
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              sound.playHover(520);
              e.currentTarget.style.borderColor = "#38bdf8";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = soundOn ? "rgba(56, 189, 248, 0.6)" : "rgba(255, 255, 255, 0.2)";
            }}
          >
            {/* Animated Equalizer Wave Bars */}
            <div style={{ display: "flex", alignItems: "center", gap: 2, height: 12 }}>
              <span className={`audio-bar ${soundOn ? "bar-anim-1" : ""}`} style={{ width: 2.5, height: soundOn ? 12 : 4, background: "currentColor", borderRadius: 2 }} />
              <span className={`audio-bar ${soundOn ? "bar-anim-2" : ""}`} style={{ width: 2.5, height: soundOn ? 8 : 10, background: "currentColor", borderRadius: 2 }} />
              <span className={`audio-bar ${soundOn ? "bar-anim-3" : ""}`} style={{ width: 2.5, height: soundOn ? 14 : 6, background: "currentColor", borderRadius: 2 }} />
              <span className={`audio-bar ${soundOn ? "bar-anim-4" : ""}`} style={{ width: 2.5, height: soundOn ? 10 : 8, background: "currentColor", borderRadius: 2 }} />
            </div>
            <span style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {soundOn ? "Sound ON" : "Sound OFF"}
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              scrollTo("Contact");
            }}
            onMouseEnter={() => sound.playHover(580)}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#ffffff",
              borderRadius: 99,
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            className="desktop-nav-menu"
            onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"; }}
          >
            Get in Touch
          </button>

          <a
            href="/Shreya_Mishra_Resume.pdf"
            download
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover(660)}
            className="mobile-compact-btn"
            style={{
              background: "#ffffff",
              color: "#0a2540",
              borderRadius: 99,
              padding: "9px 20px",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 0 26px rgba(255, 114, 159, 0.6)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.4)";
            }}
          >
            Resume PDF ↗
          </a>

          <button
            onClick={() => {
              sound.playClick();
              setMenuOpen(!menuOpen);
            }}
            className="mobile-hamburger"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 99,
              color: "#fff",
              cursor: "pointer",
              padding: "6px 12px",
              display: "none",
            }}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 84,
            left: 20,
            right: 20,
            zIndex: 490,
            background: "rgba(8, 28, 52, 0.95)",
            backdropFilter: "blur(24px)",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.2)",
            padding: "20px",
            boxShadow: "0 20px 48px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {NAV_LINKS.map((n) => (
            <div
              key={n}
              onClick={() => scrollTo(n)}
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: activeNav === n ? "#ff9ebb" : "#ffffff",
                padding: "8px 0",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
              }}
            >
              {n}
            </div>
          ))}
        </div>
      )}

      {/* ── 4. HERO SECTION (Exact Peachweb Layout & Typography) ── */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "160px clamp(1.2rem, 5vw, 3rem) 90px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Hero Central Name Tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: "clamp(24px, 3.2vw, 34px)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              textShadow: "0 2px 16px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.25)",
            }}
          >
            shreya mishra
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(44px, 7.5vw, 86px)",
            fontWeight: 700,
            lineHeight: 1.06,
            color: "#ffffff",
            maxWidth: 960,
            margin: "0 auto 22px",
            letterSpacing: "-0.03em",
          }}
        >
          Architecting <span className="serif-italic" style={{ color: "#ff9ebb", textShadow: "0 0 30px rgba(255, 114, 159, 0.7)" }}>intelligent</span> systems today.
        </h1>

        {/* Dynamic Typewriter */}
        <p
          style={{
            fontSize: "clamp(18px, 2.4vw, 24px)",
            color: "#f1f5f9",
            fontWeight: 400,
            marginBottom: 20,
            minHeight: 36,
          }}
        >
          I am <span style={{ color: "#38bdf8", fontWeight: 700, borderRight: "2px solid #38bdf8", paddingRight: 6 }}>{typed}</span>
        </p>

        <p
          style={{
            color: "#ffffff",
            fontSize: "clamp(15.5px, 1.9vw, 18px)",
            maxWidth: 620,
            margin: "0 auto 38px",
            lineHeight: 1.8,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            textShadow: "0 2px 12px rgba(0, 0, 0, 0.95)",
          }}
        >
          Computer Engineering student · CGPA 9.5 · I love building things that actually work.
        </p>

        {/* Portfolio Action Buttons */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 54 }}>
          <button
            onClick={() => scrollTo("Projects")}
            style={{
              padding: "13px 36px",
              borderRadius: 99,
              background: "#ffffff",
              color: "#0a2540",
              border: "none",
              fontSize: 14.5,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 0 24px rgba(255, 255, 255, 0.4)",
              transition: "all 0.25s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(255, 114, 159, 0.65)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 0 24px rgba(255, 255, 255, 0.4)";
            }}
          >
            View Projects ↗
          </button>

          <button
            onClick={() => scrollTo("Contact")}
            style={{
              padding: "13px 32px",
              borderRadius: 99,
              background: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.28)",
              color: "#ffffff",
              fontSize: 14.5,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.22)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
              e.currentTarget.style.transform = "none";
            }}
          >
            Get in Touch
          </button>
        </div>

        {/* Metrics Row in Frosted Glass Capsules */}
        <div style={{ display: "flex", gap: "clamp(16px, 3.5vw, 44px)", justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { label: "9.5", sub: "CGPA" },
            { label: "9+", sub: "Projects" },
            { label: "7+", sub: "Live Apps" },
          ].map(({ label, sub }) => (
            <div
              key={sub}
              className="peach-card"
              style={{
                borderRadius: 20,
                padding: "16px 28px",
                textAlign: "center",
                minWidth: 120,
              }}
            >
              <div style={{ fontSize: "clamp(26px, 3.5vw, 34px)", fontWeight: 800, color: "#38bdf8", letterSpacing: "-0.03em" }}>
                {label}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.16em", marginTop: 4, fontWeight: 700 }}>
                {sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. ABOUT SECTION ── */}
      <section
        id="about"
        style={{
          padding: "110px 0",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 clamp(1.2rem, 4vw, 3.5rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 52, alignItems: "start" }}>
            <div>
              <p style={secLabel}>About Me</p>
              <h2 style={secTitle}>
                Building things <span className="serif-italic" style={{ color: "#ff9ebb" }}>that matter.</span>
              </h2>
              <div style={dividerBar} />

              <p style={{ color: "#f1f5f9", lineHeight: 1.9, fontSize: 16, marginBottom: 18, fontWeight: 500, textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>
                I'm a Computer Engineering student with a CGPA of 9.5, and I genuinely enjoy the process of building things — from designing APIs to making a UI feel just right. I've shipped 7+ full-stack apps that are live and actually used.
              </p>

              <p style={{ color: "#f1f5f9", lineHeight: 1.9, fontSize: 16, marginBottom: 36, fontWeight: 500, textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>
                Right now I'm interning as a Full Stack Developer, where I've been trusted to own an entire B2B SaaS platform pretty much solo — backend, database, frontend, testing, all of it. It's the kind of "figure it out yourself" role that's taught me more in a few months than most semesters have.
              </p>

              <p style={{ color: "#f1f5f9", lineHeight: 1.9, fontSize: 16, marginBottom: 36, fontWeight: 500, textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>
                Outside of code, I've been part of a national-level CSI committee where I got to lead events, handle sponsorships, and work with people from colleges across the country. I'm someone who follows through — whether that's a deadline, a bug at 2am, or a presentation.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[
                  { label: "GitHub Profile", href: "https://github.com/thecodesofshreya07" },
                  { label: "LinkedIn Profile", href: "https://www.linkedin.com/in/shreya-mishra-55157a31a/" },
                  { label: "Direct Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=sm8054800@gmail.com" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "10px 22px",
                      borderRadius: 99,
                      background: "rgba(255, 255, 255, 0.12)",
                      border: "1px solid rgba(255, 255, 255, 0.22)",
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: 13,
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255, 114, 159, 0.25)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)"; }}
                  >
                    {label} ↗
                  </a>
                ))}
              </div>
            </div>

            {/* Info Cards Grid (Symmetrical 2x2) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { label: "Education", val: "B.E. Computer Engg", sub: "2024–Present" },
                { label: "Location", val: "Mumbai, India", sub: "Open to remote & on-site" },
                { label: "CGPA", val: "9.5", sub: "Cumulative (all semesters)" },
                { label: "Career Goal", val: "Software Developer" },
              ].map(({ label, val, sub }) => (
                <div
                  key={label}
                  className="peach-card"
                  style={{
                    borderRadius: 20,
                    padding: "26px 20px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 8, fontWeight: 700 }}>
                    {label}
                  </div>
                  <div style={{ fontWeight: 700, color: "#ffffff", fontSize: 14.5, marginBottom: 4 }}>{val}</div>
                  {sub && <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 300 }}>{sub}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. SKILLS SECTION ── */}
      <section
        id="skills"
        className="sec-responsive-pad"
        style={{
          padding: "110px 0",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 clamp(1.2rem, 4vw, 3.5rem)" }}>
          <p style={secLabel}>Capabilities</p>
          <h2 style={secTitle}>
            Technical <span className="serif-italic" style={{ color: "#38bdf8" }}>Skills</span>
          </h2>
          <div style={dividerBar} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: 20 }}>
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div
                key={cat}
                className="peach-card"
                style={{
                  borderRadius: 20,
                  padding: "24px",
                }}
              >
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "#ff9ebb", textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 16 }}>
                  {cat}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {items.map((s) => (
                    <span
                      key={s}
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        borderRadius: 99,
                        fontSize: 12,
                        fontWeight: 500,
                        background: "rgba(255, 255, 255, 0.08)",
                        color: "#ffffff",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Currently Learning */}
          <CurrentlyLearning />
        </div>
      </section>

      {/* ── 7. FEATURED PROJECTS SECTION ── */}
      <section
        id="projects"
        style={{
          padding: "110px 0",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 clamp(1.2rem, 4vw, 3.5rem)" }}>
          <p style={secLabel}>What I've Built</p>
          <h2 style={secTitle}>
            Featured <span className="serif-italic" style={{ color: "#ff9ebb" }}>Projects</span>
          </h2>
          <div style={dividerBar} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
              gap: 26,
            }}
          >
            {PROJECTS.map((p) => (
              <div
                key={p.name}
                className="peach-card"
                style={{
                  borderRadius: 22,
                  padding: "30px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {/* Top glowing line */}
                  <div style={{ width: 40, height: 3.5, background: p.color, borderRadius: 99, marginBottom: 20 }} />

                  <h3 style={{ fontSize: 21, fontWeight: 700, color: "#ffffff", marginBottom: 4, letterSpacing: "-0.01em" }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 16, fontWeight: 400 }}>
                    {p.subtitle}
                  </p>

                  {/* Tags */}
                  <div style={{ marginBottom: 16, display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 99,
                          background: "rgba(255, 255, 255, 0.08)",
                          color: "#e2e8f0",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: 14.5, color: "#f1f5f9", lineHeight: 1.8, marginBottom: 20, fontWeight: 450, textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                    {p.desc}
                  </p>

                  {/* Stats Badges */}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 26 }}>
                    {p.stats.map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: 8,
                          background: "rgba(56, 189, 248, 0.12)",
                          color: "#38bdf8",
                          border: "1px solid rgba(56, 189, 248, 0.25)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Links */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 18px",
                      borderRadius: 99,
                      background: "rgba(255, 255, 255, 0.12)",
                      border: "1px solid rgba(255, 255, 255, 0.22)",
                      color: "#ffffff",
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.22)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
                  >
                    GitHub ↗
                  </a>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "8px 20px",
                        borderRadius: 99,
                        background: "#ffffff",
                        color: "#0a2540",
                        fontSize: 13,
                        fontWeight: 700,
                        textDecoration: "none",
                        boxShadow: "0 0 16px rgba(255, 255, 255, 0.35)",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.03)";
                        e.currentTarget.style.boxShadow = "0 0 24px rgba(255, 114, 159, 0.6)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = "0 0 16px rgba(255, 255, 255, 0.35)";
                      }}
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. EXPERIENCE & ACHIEVEMENTS SECTION ── */}
      <section
        id="experience"
        style={{
          padding: "110px 0",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 clamp(1.2rem, 4vw, 3.5rem)" }}>
          <p style={secLabel}>Journey</p>
          <h2 style={secTitle}>
            Experience & <span className="serif-italic" style={{ color: "#38bdf8" }}>Achievements</span>
          </h2>
          <div style={dividerBar} />

          {/* Top Row: Experience Timeline (Left) + 3D Oceanic Data Mesh Node (Right) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: 48,
              alignItems: "stretch",
              marginBottom: 56,
            }}
          >
            {/* Left: Experience Timeline */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#ff9ebb", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 30 }}>
                Experience
              </div>

              {EXPERIENCE.map(({ year, title, org, points }, idx, arr) => (
                <div key={title} style={{ display: "flex", marginBottom: 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 20, flexShrink: 0 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#38bdf8", marginTop: 4, flexShrink: 0, boxShadow: "0 0 12px #38bdf8" }} />
                    {idx < arr.length - 1 && <div style={{ flex: 1, width: 2, background: "rgba(56, 189, 248, 0.25)", marginTop: 6, minHeight: 48 }} />}
                  </div>
                  <div style={{ paddingBottom: 34 }}>
                    <div style={{ fontSize: 11, color: "#ff9ebb", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>
                      {year}
                    </div>
                    <div style={{ fontSize: 16.5, fontWeight: 700, color: "#ffffff", marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 14, color: "#e2e8f0", marginBottom: points.length ? 12 : 0, fontWeight: 500 }}>{org}</div>
                    {points.length > 0 && (
                      <ul style={{ paddingLeft: 16, listStyleType: "disc" }}>
                        {points.map((pt) => (
                          <li key={pt} style={{ color: "#f1f5f9", fontSize: 14, lineHeight: 1.85, marginBottom: 6, fontWeight: 500, textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Interactive 3D Oceanic Data Node Graphic Card */}
            <div
              className="peach-card"
              style={{
                borderRadius: 24,
                padding: "22px 24px",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 490,
                border: "1px solid rgba(56, 189, 248, 0.25)",
                background: "radial-gradient(circle at 50% 30%, rgba(10, 38, 70, 0.5) 0%, rgba(4, 18, 36, 0.75) 100%)",
              }}
            >
              {/* Top Philosophy Statement */}
              <div
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  paddingBottom: 14,
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(13px, 1.4vw, 14.5px)",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.01em",
                    textShadow: "0 2px 10px rgba(0, 0, 0, 0.9)",
                    lineHeight: 1.5,
                  }}
                >
                  Every node has a purpose. Every connection tells a story.
                </p>
              </div>

              {/* 3D Three.js Interactive Graphic */}
              <div style={{ flex: 1, minHeight: 310, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <OceanicDataNode />
              </div>

              {/* Bottom Philosophy Statement */}
              <div
                style={{
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                  paddingTop: 14,
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(13px, 1.4vw, 14.5px)",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.01em",
                    textShadow: "0 2px 10px rgba(0, 0, 0, 0.9)",
                    lineHeight: 1.5,
                  }}
                >
                  What looks like complexity is often just a thousand simple things, connected.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Row: Achievements (Positioned Below Experience) */}
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#ff9ebb", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 24 }}>
              Honors & Achievements
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
              {ACHIEVEMENTS.map((item, i) => (
                <AchievementCard key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. CONTACT SECTION ── */}
      <section
        id="contact"
        className="sec-responsive-pad"
        style={{
          padding: "110px 0",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 clamp(1.2rem, 4vw, 3.5rem)", textAlign: "center" }}>
          <p style={secLabel}>Let's Connect</p>
          <h2 style={secTitle}>
            Get In <span className="serif-italic" style={{ color: "#ff9ebb" }}>Touch</span>
          </h2>
          <div style={{ ...dividerBar, margin: "0 auto 28px" }} />

          <div style={{ maxWidth: 680, margin: "0 auto 48px", color: "#f1f5f9", fontSize: 16, lineHeight: 1.85, fontWeight: 500, textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>
            <p style={{ marginBottom: 16 }}>
              I’m currently exploring software development opportunities where I can contribute from day one, solve meaningful problems, and create real value for the team and the product.
            </p>
            <p>
              If you are hiring for software development roles or know of a suitable opportunity, I would be glad to connect and explore how I can contribute.

              I welcome professional connections, referrals, and conversations around relevant opportunities. Please feel free to reach out.
            </p>
          </div>

          <ContactGrid />
        </div>
      </section>

      {/* ── Scroll To Top Floating Button ── */}
      <ScrollTopBtn scrolled={scrolled} />
    </div>
  );
}
