import { motion } from "framer-motion";
import { navItems } from "../../data/portfolio";

/**
 * Scrolls to the section with the given id.
 */
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Converts a nav item label to a section id.
 */
function toSectionId(label) {
  return label.toLowerCase().replace("é", "e").replace("è", "e");
}

export default function Navbar({ activeSection }) {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="navbar__logo">◈ AXIOM</div>

      <div className="navbar__links">
        {navItems.map((item) => (
          <button
            key={item}
            className={`navbar__link ${activeSection === item ? "navbar__link--active" : ""}`}
            onClick={() => scrollToSection(toSectionId(item))}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="navbar__year">
        PORTFOLIO <span>2025</span>
      </div>
    </motion.nav>
  );
}
