import React, { useEffect, useRef } from "react";

export default function OceanicCanvas() {
  const bubblesCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = bubblesCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animId;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Rich, vibrant, glossy oceanic bubbles with solid contrast on mobile & desktop
    const bubbleCount = width < 600 ? 22 : 32;
    const bubbles = Array.from({ length: bubbleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height + height * 0.1,
      radius: Math.random() * 24 + 10, // 10px to 34px radius
      speedY: Math.random() * 0.65 + 0.25,
      wobbleSpeed: Math.random() * 0.016 + 0.008,
      wobbleDist: Math.random() * 24 + 10,
      wobbleOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.35 + 0.55, // Rich, bright, prominent (0.55 to 0.90)
      hue: Math.random() > 0.4 ? "cyan" : "peach",
    }));

    let time = 0;
    function render() {
      animId = requestAnimationFrame(render);
      time += 0.018;
      ctx.clearRect(0, 0, width, height);

      // Floating vibrant, glossy bubbles
      bubbles.forEach((b) => {
        b.y -= b.speedY;
        const currentX = b.x + Math.sin(time * b.wobbleSpeed * 60 + b.wobbleOffset) * (b.wobbleDist * 0.08);

        if (b.y < -b.radius * 2) {
          b.y = height + b.radius * 2;
          b.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(currentX, b.y);

        const isCyan = b.hue === "cyan";
        const rimColor = isCyan ? "rgba(56, 189, 248, " : "rgba(255, 114, 159, ";
        const innerColor = isCyan ? "rgba(3, 30, 60, " : "rgba(55, 15, 42, ";

        // Glossy bubble radial gradient
        const grad = ctx.createRadialGradient(
          -b.radius * 0.3,
          -b.radius * 0.3,
          b.radius * 0.08,
          0,
          0,
          b.radius
        );
        grad.addColorStop(0, "rgba(255, 255, 255, " + Math.min(1, b.opacity * 0.85) + ")");
        grad.addColorStop(0.35, innerColor + b.opacity * 0.35 + ")");
        grad.addColorStop(0.8, rimColor + b.opacity * 0.85 + ")");
        grad.addColorStop(1, rimColor + Math.min(1, b.opacity * 1.1) + ")");

        ctx.beginPath();
        ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Vivid Bubble Rim
        ctx.strokeStyle = rimColor + Math.min(1, b.opacity * 0.95) + ")";
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Specular Highlight
        ctx.beginPath();
        ctx.ellipse(
          -b.radius * 0.38,
          -b.radius * 0.38,
          b.radius * 0.32,
          b.radius * 0.16,
          -Math.PI / 4,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "rgba(255, 255, 255, " + Math.min(1, b.opacity * 0.95) + ")";
        ctx.fill();

        ctx.restore();
      });
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
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
        backgroundColor: "#020b16",
      }}
    >
      {/* High-Resolution Deep Oceanic Background Texture */}
      <div
        style={{
          position: "absolute",
          inset: "-10px",
          backgroundImage: "url('/peachweb-ocean-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 22%",
          filter: "brightness(0.82) contrast(1.15) saturate(1.2)",
          transform: "scale(1.01)",
          opacity: 0.95,
        }}
      />

      {/* Balanced Contrast Scrim (Octopus stays clearly visible, text becomes razor-sharp) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 30%, rgba(3, 16, 32, 0.28) 0%, rgba(2, 11, 22, 0.58) 55%, rgba(2, 11, 22, 0.88) 100%)",
        }}
      />

      {/* Vibrant Deep-Sea Bubbles Canvas */}
      <canvas
        ref={bubblesCanvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
      />
    </div>
  );
}
