import { motion } from "framer-motion";
import { Home, Folder, Wrench, PenLine, ExternalLink } from "lucide-react";

/**
 * Scrolls to the section with the given id.
 */
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const navConfig = [
  { label: "HOME", icon: Home, id: "home" },
  { label: "PROJECTS", icon: Folder, id: "projects" },
  { label: "SKILLS", icon: Wrench, id: "skills" },
  { label: "CONTACT", icon: PenLine, id: "contact" },
];

export default function Navbar({ activeSection }) {
  return (
    <>
      <motion.nav
        className="floating-nav"
        initial={{ y: -80, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="floating-nav__inner">
          {navConfig.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.label;
            return (
              <div key={item.id} className="floating-nav__item-wrapper">
                <button
                  className={`floating-nav__link ${isActive ? "floating-nav__link--active" : ""}`}
                  onClick={() => scrollToSection(item.id)}
                  aria-label={item.label}
                >
                  <Icon size={20} strokeWidth={2.5} />
                </button>
                <div className="floating-nav__tooltip">{item.label}</div>
              </div>
            );
          })}

          <div className="floating-nav__divider" />

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="floating-nav__resume"
          >
            Resume <ExternalLink size={14} />
          </a>
        </div>
      </motion.nav>
    </>
  );
}
