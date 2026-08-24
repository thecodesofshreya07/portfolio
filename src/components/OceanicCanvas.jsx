import React, { useEffect, useRef } from "react";

export default function OceanicCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Subtle luminescent floating spores / deep sea bubbles
    const spores = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      wobbleOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.4 + 0.15,
      color: Math.random() > 0.4 ? "rgba(255, 158, 187, " : "rgba(56, 189, 248, ",
    }));

    let time = 0;

    function render() {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // ─── Subtle Volumetric Light Rays (God-rays) ──────────────────────
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < 3; i++) {
        const xOffset = width * (0.2 + i * 0.3) + Math.sin(time * 0.4 + i) * 60;
        const rayGrad = ctx.createLinearGradient(xOffset, 0, xOffset + 80, height * 0.7);
        rayGrad.addColorStop(0, "rgba(80, 210, 255, 0.08)");
        rayGrad.addColorStop(0.5, "rgba(255, 140, 180, 0.03)");
        rayGrad.addColorStop(1, "transparent");

        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(xOffset - 40, 0);
        ctx.lineTo(xOffset + 120, 0);
        ctx.lineTo(xOffset + 240, height);
        ctx.lineTo(xOffset + 40, height);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // ─── Floating Ethereal Spores & Bubbles ───────────────────────────
      spores.forEach((s) => {
        s.y -= s.speedY;
        s.x += Math.sin(time + s.wobbleOffset) * 0.35 + s.speedX;

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color + s.opacity + ")";
        ctx.shadowColor = s.color + "0.8)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* High-Resolution Photorealistic 3D Ocean Background */}
      <div
        style={{
          position: "absolute",
          inset: "-20px",
          backgroundImage: "url('/peachweb-ocean-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          filter: "brightness(0.92) contrast(1.05)",
          transform: "scale(1.02)",
        }}
      />

      {/* Atmospheric Vignette & Depth Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(5, 23, 44, 0.35) 0%, rgba(3, 16, 32, 0.5) 45%, rgba(2, 10, 20, 0.88) 85%, #020b16 100%)",
        }}
      />

      {/* Subtle Caustic Canvas Layer */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
