import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ── Inline styles & keyframes ──────────────────────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #050508;
    --surface: #0d0d14;
    --accent: #7affd4;
    --accent2: #ff6b6b;
    --accent3: #a78bfa;
    --text: #e8e8f0;
    --muted: #5a5a72;
    --border: rgba(122,255,212,0.12);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Space Mono', monospace;
    overflow-x: hidden;
    cursor: none;
  }

  /* Custom cursor */
  .cursor {
    width: 12px; height: 12px;
    background: var(--accent);
    border-radius: 50%;
    position: fixed; top: 0; left: 0;
    pointer-events: none; z-index: 9999;
    mix-blend-mode: difference;
    transition: transform 0.15s ease;
  }
  .cursor-ring {
    width: 40px; height: 40px;
    border: 1px solid var(--accent);
    border-radius: 50%;
    position: fixed; top: 0; left: 0;
    pointer-events: none; z-index: 9998;
    opacity: 0.5;
    transition: transform 0.35s ease, width 0.2s, height 0.2s;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); }

  /* Grain overlay */
  body::after {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 9997; opacity: 0.4;
  }

  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(122,255,212,0.2)} 50%{box-shadow:0 0 60px rgba(122,255,212,0.6)} }
  @keyframes scanline {
    0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)}
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes gradient-shift {
    0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%}
  }
`;

// ── Data ──────────────────────────────────────────────────────────────
const projects = [
  { id: "01", title: "Nebula OS", desc: "Interface système futuriste avec visualisation de données en temps réel", tags: ["React", "WebGL", "GSAP"], color: "#7affd4" },
  { id: "02", title: "Synthwave Studio", desc: "DAW web avec synthèse sonore visuelle et collaboration en temps réel", tags: ["Web Audio API", "Canvas", "WebSockets"], color: "#ff6b6b" },
  { id: "03", title: "Quantum Grid", desc: "Marketplace 3D immersive pour NFTs avec navigation spatiale", tags: ["Three.js", "Next.js", "Solidity"], color: "#a78bfa" },
  { id: "04", title: "Phantom Auth", desc: "Système d'authentification biométrique basé sur les mouvements de souris", tags: ["ML", "TypeScript", "Node.js"], color: "#fbbf24" },
];

const skills = ["React", "Three.js", "GSAP", "TypeScript", "Node.js", "WebGL", "Framer Motion", "Figma", "Next.js", "GraphQL", "Python", "Rust"];

const navItems = ["ACCUEIL", "PROJETS", "COMPÉTENCES", "CONTACT"];

// ── Three.js Canvas Component ────────────────────────────────────────
function ThreeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => initThree();
    document.head.appendChild(script);

    function initThree() {
      const THREE = window.THREE;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
      camera.position.z = 5;

      // Particle field
      const particleGeo = new THREE.BufferGeometry();
      const count = 2000;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
      }
      for (let i = 0; i < count; i++) {
        const t = Math.random();
        colors[i * 3] = t < 0.33 ? 0.478 : t < 0.66 ? 1.0 : 0.651;
        colors[i * 3 + 1] = t < 0.33 ? 1.0 : t < 0.66 ? 0.42 : 0.545;
        colors[i * 3 + 2] = t < 0.33 ? 0.831 : t < 0.66 ? 0.42 : 0.980;
      }
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const particleMat = new THREE.PointsMaterial({ size: 0.03, vertexColors: true, transparent: true, opacity: 0.7 });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // Wireframe icosahedron
      const geoIco = new THREE.IcosahedronGeometry(1.4, 1);
      const matIco = new THREE.MeshBasicMaterial({ color: 0x7affd4, wireframe: true, transparent: true, opacity: 0.15 });
      const ico = new THREE.Mesh(geoIco, matIco);
      scene.add(ico);

      // Inner sphere glow
      const geoSphere = new THREE.SphereGeometry(0.9, 32, 32);
      const matSphere = new THREE.MeshBasicMaterial({ color: 0x7affd4, transparent: true, opacity: 0.04 });
      const sphere = new THREE.Mesh(geoSphere, matSphere);
      scene.add(sphere);

      // Mouse interaction
      let mx = 0, my = 0;
      const handleMouseMove = (e) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", handleMouseMove);

      let frame;
      const animate = () => {
        frame = requestAnimationFrame(animate);
        const t = Date.now() * 0.001;
        ico.rotation.x = t * 0.12 + my * 0.3;
        ico.rotation.y = t * 0.18 + mx * 0.3;
        particles.rotation.y = t * 0.04;
        particles.rotation.x = t * 0.02;
        camera.position.x += (mx * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (-my * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
      };
    }

    return () => document.head.removeChild(script);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
    />
  );
}

// ── Typewriter hook ───────────────────────────────────────────────────
function useTypewriter(words, speed = 80) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else setCharIdx(c => c + 1);
      } else {
        setDisplayed(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx(w => (w + 1) % words.length);
          setCharIdx(0);
        } else setCharIdx(c => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed]);

  return displayed;
}

// ── Main Portfolio Component ──────────────────────────────────────────
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("ACCUEIL");
  const [hoveredProject, setHoveredProject] = useState(null);
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const role = useTypewriter(["Développeur Full-Stack", "Creative Technologist", "UI/UX Engineer", "3D Web Artist"]);

  // Custom cursor
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const S = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{globalCSS}</style>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      {/* Progress bar */}
      <motion.div style={{ width: progressWidth, height: 2, background: "var(--accent)", position: "fixed", top: 0, left: 0, zIndex: 9996, transformOrigin: "left" }} />

      {/* NAV */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1.2rem 3rem",
          background: "rgba(5,5,8,0.7)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "1.2rem", letterSpacing: "0.2em", color: "var(--accent)" }}>
          ◈ AXIOM
        </div>
        <div style={{ display: "flex", gap: "2.5rem" }}>
          {navItems.map(item => (
            <button
              key={item}
              onClick={() => S(item.toLowerCase().replace("é", "e").replace("è", "e"))}
              style={{
                background: "none", border: "none", cursor: "none",
                fontFamily: "Space Mono", fontSize: "0.7rem", letterSpacing: "0.15em",
                color: activeSection === item ? "var(--accent)" : "var(--muted)",
                transition: "color 0.3s",
              }}
              onMouseEnter={e => e.target.style.color = "var(--accent)"}
              onMouseLeave={e => e.target.style.color = activeSection === item ? "var(--accent)" : "var(--muted)"}
            >
              {item}
            </button>
          ))}
        </div>
        <div style={{ fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em" }}>
          PORTFOLIO <span style={{ color: "var(--accent)" }}>2025</span>
        </div>
      </motion.nav>

      {/* Scroll container */}
      <div
        ref={containerRef}
        style={{ height: "100vh", overflowY: "scroll", overflowX: "hidden", scrollbarWidth: "thin", scrollbarColor: "var(--accent) var(--bg)" }}
      >

        {/* ── HERO ── */}
        <section id="accueil" style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <ThreeCanvas />

          {/* Grid lines */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 2,
            backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

          {/* Scanline */}
          <div style={{
            position: "absolute", left: 0, right: 0, height: "2px",
            background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
            animation: "scanline 4s linear infinite", zIndex: 3, opacity: 0.3,
          }} />

          <div style={{ position: "relative", zIndex: 4, textAlign: "center", padding: "0 2rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ fontSize: "0.75rem", letterSpacing: "0.4em", color: "var(--accent)", marginBottom: "1.5rem" }}
            >
              ── DISPONIBLE POUR PROJETS ──
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(3.5rem, 10vw, 9rem)",
                lineHeight: 0.9, letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #fff 0%, var(--accent) 50%, var(--accent3) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundSize: "200% 200%", animation: "gradient-shift 4s ease infinite",
              }}
            >
              Soukayna<br />
              <span style={{ WebkitTextFillColor: "transparent", WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}>
                Ben salah
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{ marginTop: "1.5rem", fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "var(--muted)", letterSpacing: "0.05em", minHeight: "1.5em" }}
            >
              <span style={{ color: "var(--accent2)" }}>{">"}</span> {role}
              <span style={{ animation: "blink 1s step-end infinite", color: "var(--accent)" }}>█</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              style={{ marginTop: "3rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            >
              {[["VOIR MES PROJETS", "var(--accent)", "var(--bg)", "projets"], ["ME CONTACTER", "transparent", "var(--accent)", "contact"]].map(([label, bg, color, id]) => (
                <button
                  key={label}
                  onClick={() => S(id)}
                  style={{
                    padding: "0.9rem 2.2rem", background: bg,
                    border: `1px solid var(--accent)`, color,
                    fontFamily: "Space Mono", fontSize: "0.75rem", letterSpacing: "0.15em",
                    cursor: "none", transition: "all 0.3s", animation: bg !== "transparent" ? "pulse-glow 3s ease-in-out infinite" : "none",
                  }}
                  onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 20px 40px rgba(122,255,212,0.3)"; }}
                  onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}
                >
                  {label}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Corner decorations */}
          {["top:80px;left:30px", "top:80px;right:30px", "bottom:30px;left:30px", "bottom:30px;right:30px"].map((pos, i) => (
            <div key={i} style={{
              position: "absolute", zIndex: 4, ...Object.fromEntries(pos.split(";").map(p => p.split(":"))),
              width: "40px", height: "40px",
              borderTop: i < 2 ? "1px solid var(--accent)" : "none",
              borderBottom: i >= 2 ? "1px solid var(--accent)" : "none",
              borderLeft: i % 2 === 0 ? "1px solid var(--accent)" : "none",
              borderRight: i % 2 !== 0 ? "1px solid var(--accent)" : "none",
              opacity: 0.5,
            }} />
          ))}

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 4, color: "var(--muted)", fontSize: "0.65rem", letterSpacing: "0.2em", textAlign: "center" }}
          >
            SCROLL<br />▼
          </motion.div>
        </section>

        {/* ── MARQUEE ── */}
        <div style={{ overflow: "hidden", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)", padding: "1rem 0" }}>
          <div style={{ display: "flex", animation: "marquee 20s linear infinite", whiteSpace: "nowrap" }}>
            {[...Array(2)].map((_, i) => (
              <span key={i} style={{ display: "flex", gap: "3rem", marginRight: "3rem" }}>
                {["REACT", "◈", "THREE.JS", "◈", "GSAP", "◈", "WEBGL", "◈", "MOTION", "◈", "TYPESCRIPT", "◈", "NODE.JS", "◈", "NEXT.JS", "◈"].map((t, j) => (
                  <span key={j} style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.25em", color: t === "◈" ? "var(--accent)" : "var(--muted)" }}>{t}</span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ── PROJECTS ── */}
        <section id="projets" style={{ padding: "8rem 3rem", maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "var(--accent)", marginBottom: "1rem" }}>02 / PROJETS SÉLECTIONNÉS</div>
            <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1, marginBottom: "5rem" }}>
              ŒUVRES<br /><span style={{ color: "var(--accent3)" }}>DIGITALES</span>
            </h2>
          </motion.div>

          <div style={{ display: "grid", gap: "2px" }}>
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  display: "grid", gridTemplateColumns: "80px 1fr auto",
                  alignItems: "center", gap: "2rem",
                  padding: "2rem 0", cursor: "none",
                  borderBottom: "1px solid var(--border)",
                  transition: "background 0.3s",
                  background: hoveredProject === project.id ? "rgba(122,255,212,0.03)" : "transparent",
                  paddingLeft: hoveredProject === project.id ? "1rem" : "0",
                }}
              >
                <span style={{ fontFamily: "Syne", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em" }}>
                  {project.id}
                </span>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "0.5rem" }}>
                    <motion.div
                      animate={{ width: hoveredProject === project.id ? 24 : 0 }}
                      style={{ height: 2, background: project.color, overflow: "hidden" }}
                    />
                    <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "clamp(1.2rem, 3vw, 2rem)", transition: "color 0.3s", color: hoveredProject === project.id ? project.color : "var(--text)" }}>
                      {project.title}
                    </h3>
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: "0.8rem", maxWidth: "500px", lineHeight: 1.6 }}>{project.desc}</p>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.8rem", flexWrap: "wrap" }}>
                    {project.tags.map(tag => (
                      <span key={tag} style={{
                        padding: "0.2rem 0.7rem", fontSize: "0.6rem", letterSpacing: "0.1em",
                        border: `1px solid ${project.color}30`, color: project.color,
                        fontFamily: "Space Mono",
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <motion.div
                  animate={{ x: hoveredProject === project.id ? 0 : 10, opacity: hoveredProject === project.id ? 1 : 0 }}
                  style={{ fontSize: "1.5rem", color: project.color }}
                >→</motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="competences" style={{ padding: "8rem 3rem", background: "var(--surface)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "var(--accent2)", marginBottom: "1rem" }}>03 / COMPÉTENCES</div>
              <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1, marginBottom: "4rem" }}>
                ARSENAL<br /><span style={{ color: "var(--accent2)" }}>TECHNIQUE</span>
              </h2>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "1rem" }}>
              {skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, borderColor: "var(--accent)", color: "var(--accent)" }}
                  style={{
                    padding: "1.2rem", textAlign: "center",
                    border: "1px solid var(--border)",
                    fontFamily: "Syne", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em",
                    color: "var(--muted)", cursor: "none",
                    transition: "all 0.3s",
                    background: "rgba(122,255,212,0.02)",
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", marginTop: "5rem" }}>
              {[["40+", "Projets livrés"], ["5", "Années d'expérience"], ["100%", "Satisfaction client"]].map(([n, l]) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "1.5rem" }}
                >
                  <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--accent)" }}>{n}</div>
                  <div style={{ color: "var(--muted)", fontSize: "0.75rem", letterSpacing: "0.1em", marginTop: "0.3rem" }}>{l}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ padding: "8rem 3rem", minHeight: "80vh", display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "var(--accent3)", marginBottom: "1rem" }}>04 / CONTACT</div>
              <h2 style={{
                fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(3rem, 8vw, 7rem)",
                lineHeight: 0.95, marginBottom: "3rem",
              }}>
                TRAVAILLONS<br />
                <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)", WebkitTextFillColor: "transparent" }}>ENSEMBLE</span>
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0", maxWidth: "600px" }}>
                {[
                  { label: "EMAIL", value: "adam@axiom.dev", icon: "◉" },
                  { label: "GITHUB", value: "@adam-karim", icon: "◉" },
                  { label: "LINKEDIN", value: "in/adam-karim", icon: "◉" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ paddingLeft: "1rem" }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "1.5rem 0", borderBottom: "1px solid var(--border)",
                      cursor: "none", transition: "padding 0.3s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <span style={{ color: "var(--accent3)", fontSize: "0.8rem" }}>{item.icon}</span>
                      <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--muted)" }}>{item.label}</span>
                    </div>
                    <span style={{ fontFamily: "Syne", fontWeight: 600, fontSize: "1rem", color: "var(--text)" }}>{item.value}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  marginTop: "3rem", padding: "1.2rem 3rem",
                  background: "var(--accent3)", border: "none", color: "var(--bg)",
                  fontFamily: "Syne", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.15em",
                  cursor: "none", boxShadow: "0 20px 60px rgba(167,139,250,0.3)",
                }}
              >
                ENVOYER UN MESSAGE →
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          padding: "2rem 3rem", borderTop: "1px solid var(--border)",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem",
        }}>
          <span style={{ fontFamily: "Syne", fontWeight: 800, color: "var(--accent)", letterSpacing: "0.2em" }}>◈ AXIOM</span>
          <span style={{ fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em" }}>© 2025 ADAM KARIM — TOUS DROITS RÉSERVÉS</span>
          <span style={{ fontSize: "0.65rem", color: "var(--muted)" }}>BUILT WITH REACT + THREE.JS + FRAMER MOTION</span>
        </footer>
      </div>
    </>
  );
}
