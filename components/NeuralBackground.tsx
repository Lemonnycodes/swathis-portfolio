"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };
// A pulse is a packet of light traveling from node `a` to node `b`.
type Pulse = { a: number; b: number; t: number; speed: number };

// A lightweight generative "neural network" canvas: drifting nodes connected
// by fading synapses, with a cursor spotlight and bright packets of light that
// travel along the connections. Pure canvas, no deps.
export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Palette: purple network, emerald data.
    const LINE = "124, 92, 255";
    const NODE = "167, 139, 255";
    const ACCENT = "52, 211, 153";

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let frame = 0;
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;

    const LINK_DIST = 140;
    const MOUSE_DIST = 200;
    const MAX_PULSES = 26;

    function nodeCount() {
      return Math.min(90, Math.floor((width * height) / 18000));
    }

    function seed() {
      nodes = Array.from({ length: nodeCount() }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
      pulses = [];
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    // Spawn a packet that runs along an existing connection.
    function spawnPulse() {
      if (pulses.length >= MAX_PULSES || nodes.length < 2) return;
      const i = (Math.random() * nodes.length) | 0;
      const a = nodes[i];
      const neighbors: number[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const d = Math.hypot(a.x - nodes[j].x, a.y - nodes[j].y);
        if (d < LINK_DIST) neighbors.push(j);
      }
      if (!neighbors.length) return;
      const b = neighbors[(Math.random() * neighbors.length) | 0];
      pulses.push({ a: i, b, t: 0, speed: 0.006 + Math.random() * 0.01 });
    }

    function step() {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        const dxm = mouse.x - n.x;
        const dym = mouse.y - n.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < MOUSE_DIST && dm > 0.001) {
          const pull = (1 - dm / MOUSE_DIST) * 0.04;
          n.vx += (dxm / dm) * pull;
          n.vy += (dym / dm) * pull;
        }

        n.vx *= 0.99;
        n.vy *= 0.99;
        const sp = Math.hypot(n.vx, n.vy);
        const max = 0.7;
        if (sp > max) {
          n.vx = (n.vx / sp) * max;
          n.vy = (n.vy / sp) * max;
        }

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Cursor spotlight.
      if (mouse.x > -9000) {
        const g = ctx!.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          MOUSE_DIST
        );
        g.addColorStop(0, `rgba(${ACCENT}, 0.06)`);
        g.addColorStop(1, `rgba(${ACCENT}, 0)`);
        ctx!.fillStyle = g;
        ctx!.fillRect(
          mouse.x - MOUSE_DIST,
          mouse.y - MOUSE_DIST,
          MOUSE_DIST * 2,
          MOUSE_DIST * 2
        );
      }

      // Synapses.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.5;
            ctx!.strokeStyle = `rgba(${LINE}, ${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // Traveling packets of light.
      ctx!.save();
      ctx!.shadowColor = `rgba(${ACCENT}, 0.9)`;
      ctx!.shadowBlur = 12;
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k];
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) {
          pulses.splice(k, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const fade = Math.sin(p.t * Math.PI); // bright in the middle
        ctx!.fillStyle = `rgba(${ACCENT}, ${0.85 * fade + 0.15})`;
        ctx!.beginPath();
        ctx!.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx!.fill();
        p.t += p.speed;
        if (p.t >= 1) pulses.splice(k, 1);
      }
      ctx!.restore();

      // Nodes (soft halo + bright core).
      for (const n of nodes) {
        const near = Math.hypot(mouse.x - n.x, mouse.y - n.y) < MOUSE_DIST;
        const color = near ? ACCENT : NODE;
        ctx!.fillStyle = `rgba(${color}, 0.12)`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, near ? 7 : 5, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = `rgba(${color}, ${near ? 0.95 : 0.8})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, near ? 2.6 : 1.8, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function loop() {
      step();
      frame++;
      if (frame % 5 === 0) spawnPulse();
      draw();
      raf = requestAnimationFrame(loop);
    }

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    if (reduceMotion) {
      draw(); // single static frame, no animation
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-70"
    />
  );
}
