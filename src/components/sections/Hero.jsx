import { motion } from "framer-motion";
import { Mouse, ChevronDown } from "lucide-react";
import { useTypewriter } from "../../hooks/useTypewriter";
import { roles } from "../../data/portfolio";
import ThreeCanvas from "./ThreeCanvas";

/**
 * Scrolls to the section with the given id.
 */
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/** Corner decoration positions and border config */
const corners = [
  { style: { top: 80, left: 30 }, borders: { borderTop: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" } },
  { style: { top: 80, right: 30 }, borders: { borderTop: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" } },
  { style: { bottom: 30, left: 30 }, borders: { borderBottom: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" } },
  { style: { bottom: 30, right: 30 }, borders: { borderBottom: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" } },
];

export default function Hero() {
  const role = useTypewriter(roles);

  return (
    <section id="home" className="hero">
      {/* ThreeCanvas moved inside hero__right below */}

      {/* Grid lines */}
      <div className="hero__grid" />

      {/* Scanline */}
      <div className="hero__scanline" />

      {/* Two-column layout */}
      <div className="hero__layout">
        {/* Left: text content */}
        <div className="hero__left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hero__status"
          >
            ── AVAILABLE FOR PROJECTS ──
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="hero__title"
          >
            BEN <br /> SALAH
            <br />
            <span className="hero__title-outline">SOUKAYNA</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="hero__role"
          >
            <span className="hero__role-arrow">{">"}</span> {role}
            <span className="hero__role-cursor">█</span>
          </motion.div>

          {/* Accroche métier (Value Proposition) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{ marginTop: "1.5rem", color: "var(--muted)", maxWidth: "85%", lineHeight: "1.6", fontSize: "0.95rem" }}
          >
            Passionate about creating innovative and intuitive web experiences. I transform your ideas into elegant and high-performing digital solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="hero__buttons"
          >
            <button
              className="hero__btn hero__btn--primary"
              onClick={() => scrollToSection("projects")}
            >
              VIEW MY PROJECTS
            </button>
            <button
              className="hero__btn hero__btn--secondary"
              onClick={() => scrollToSection("contact")}
            >
              CONTACT ME
            </button>
          </motion.div>
        </div>

        {/* Right: 3D sphere */}
        <div className="hero__right">
          <ThreeCanvas />
        </div>
      </div>

      {/* Corner decorations */}
      {corners.map((corner, i) => (
        <div
          key={i}
          className="hero__corner"
          style={{ ...corner.style, ...corner.borders }}
        />
      ))}

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="hero__scroll-indicator"
      >
        <span>SCROLL</span>
        <div className="hero__scroll-icon">
          <Mouse size={24} strokeWidth={1.5} />
          <motion.div
            animate={{ y: [0, 4, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            style={{ display: "flex", justifyContent: "center", marginTop: "-6px" }}
          >
            <ChevronDown size={16} strokeWidth={2.5} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
