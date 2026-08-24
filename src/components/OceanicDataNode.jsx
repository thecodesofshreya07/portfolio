import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { sound } from "../utils/audioSystem";

export default function OceanicDataNode() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const handleMouseEnter = () => {
      sound.playSonarPing();
    };
    container.addEventListener("mouseenter", handleMouseEnter);

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    // ── Scene Setup ──────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const dataNodeGroup = new THREE.Group();
    scene.add(dataNodeGroup);

    // ── 1. 3D Plexus Wireframe Sphere (Oceanographic Data Node) ──────────────
    const sphereRadius = 5.6;
    const sphereGeo = new THREE.IcosahedronGeometry(sphereRadius, 3);
    const posAttr = sphereGeo.attributes.position;
    const vertexCount = posAttr.count;

    // A. Outer Wireframe
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const wireframeSphere = new THREE.Mesh(sphereGeo, wireframeMat);
    dataNodeGroup.add(wireframeSphere);

    // B. Inner Core Sphere
    const coreGeo = new THREE.IcosahedronGeometry(sphereRadius * 0.92, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    dataNodeGroup.add(coreSphere);

    // C. Glowing Node Vertices (Plexus Points)
    const createPointTexture = (colorStr) => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, colorStr);
      grad.addColorStop(0.35, "rgba(56, 189, 248, 0.85)");
      grad.addColorStop(0.7, "rgba(56, 189, 248, 0.2)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const pointsMat = new THREE.PointsMaterial({
      size: 0.45,
      map: createPointTexture("#ffffff"),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.95,
    });
    const pointsMesh = new THREE.Points(sphereGeo, pointsMat);
    dataNodeGroup.add(pointsMesh);

    // ── 2. Glowing Orbital Rings (Acoustic Currents & Sonar Tracks) ───────────
    const ringsGroup = new THREE.Group();
    dataNodeGroup.add(ringsGroup);

    const createAcousticRing = (radius, tiltX, tiltY, color, opacity = 0.5) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(120);
      const ringGeo = new THREE.BufferGeometry().setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
      });
      const ringLine = new THREE.LineLoop(ringGeo, ringMat);
      ringLine.rotation.x = tiltX;
      ringLine.rotation.y = tiltY;
      return ringLine;
    };

    const ring1 = createAcousticRing(sphereRadius * 1.35, Math.PI / 3, Math.PI / 6, 0x38bdf8, 0.5);
    const ring2 = createAcousticRing(sphereRadius * 1.55, -Math.PI / 4, Math.PI / 4, 0x4ef2d2, 0.42);
    const ring3 = createAcousticRing(sphereRadius * 1.75, Math.PI / 2.2, -Math.PI / 5, 0xff729f, 0.35);

    ringsGroup.add(ring1, ring2, ring3);

    // Expanding Sonar Ping Wave
    const sonarWaveGeo = new THREE.RingGeometry(0.1, 0.25, 64);
    const sonarWaveMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const sonarWave = new THREE.Mesh(sonarWaveGeo, sonarWaveMat);
    sonarWave.rotation.x = Math.PI / 2.4;
    dataNodeGroup.add(sonarWave);

    // ── 3. Submarine Fiber-Optic Cables & Moving Data Pulses ──────────────────
    const cableCurves = [];
    const cableLinesGroup = new THREE.Group();
    dataNodeGroup.add(cableLinesGroup);

    const pulseCount = 16;
    const pulses = [];

    for (let i = 0; i < 12; i++) {
      const idx1 = Math.floor(Math.random() * vertexCount);
      const idx2 = Math.floor(Math.random() * vertexCount);
      const v1 = new THREE.Vector3(posAttr.getX(idx1), posAttr.getY(idx1), posAttr.getZ(idx1));
      const v2 = new THREE.Vector3(posAttr.getX(idx2), posAttr.getY(idx2), posAttr.getZ(idx2));

      const mid = v1.clone().add(v2).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(sphereRadius * (1.12 + Math.random() * 0.15));

      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      cableCurves.push(curve);

      const curveGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
      const cableMat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0x00f2fe : 0x38bdf8,
        transparent: true,
        opacity: 0.38,
        blending: THREE.AdditiveBlending,
      });
      const cableLine = new THREE.Line(curveGeo, cableMat);
      cableLinesGroup.add(cableLine);
    }

    const pulseTexture = createPointTexture("#ff9ebb");
    const cyanPulseTexture = createPointTexture("#00ffff");

    for (let p = 0; p < pulseCount; p++) {
      const curveIndex = p % cableCurves.length;
      const isPeach = p % 3 === 0;
      const pulseGeo = new THREE.BufferGeometry();
      pulseGeo.setAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0], 3));

      const pulseMat = new THREE.PointsMaterial({
        size: isPeach ? 0.65 : 0.55,
        map: isPeach ? pulseTexture : cyanPulseTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.95,
      });

      const pulseMesh = new THREE.Points(pulseGeo, pulseMat);
      dataNodeGroup.add(pulseMesh);

      pulses.push({
        mesh: pulseMesh,
        curveIndex,
        t: Math.random(),
        speed: 0.004 + Math.random() * 0.006,
      });
    }

    // ── Mouse Interactivity ──────────────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const xNorm = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const yNorm = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetRotY = xNorm * 0.75;
      targetRotX = yNorm * 0.55;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Resize Observer for flawless responsive scaling
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // ── Animation Loop ───────────────────────────────────────────────────────
    let animId;
    let clock = new THREE.Clock();

    function animate() {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous fluid rotation + smooth mouse tilt
      dataNodeGroup.rotation.y += 0.004;
      dataNodeGroup.rotation.x += 0.002;

      dataNodeGroup.rotation.y += (targetRotY - dataNodeGroup.rotation.y) * 0.04;
      dataNodeGroup.rotation.x += (targetRotX - dataNodeGroup.rotation.x) * 0.04;

      // Rotate acoustic rings
      ring1.rotation.z += 0.005;
      ring2.rotation.z -= 0.006;
      ring3.rotation.z += 0.004;

      // Sonar ping pulse expansion
      const waveCycle = (elapsedTime * 0.5) % 1;
      const currentScale = 1 + waveCycle * 2.6;
      sonarWave.scale.set(currentScale, currentScale, 1);
      sonarWaveMat.opacity = Math.sin(waveCycle * Math.PI) * 0.45;

      // Data pulses traveling along submarine cables
      pulses.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.curveIndex = Math.floor(Math.random() * cableCurves.length);
        }
        const pt = cableCurves[p.curveIndex].getPoint(p.t);
        const pos = p.mesh.geometry.attributes.position;
        pos.setXYZ(0, pt.x, pt.y, pt.z);
        pos.needsUpdate = true;
      });

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 440,
        position: "relative",
        cursor: "grab",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
}
