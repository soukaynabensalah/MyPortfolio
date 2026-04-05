import { motion } from "framer-motion";

const techSkills = [
  { name: "HTML", icon: "html5" },
  { name: "CSS", icon: "css" },
  { name: "JavaScript", icon: "javascript" },
  { name: "React", icon: "react" },
  { name: "Php", icon: "php" },
  { name: "Laravel", icon: "laravel" },
  { name: "Mysql", icon: "mysql" },
  { name: "Python", icon: "python" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "Bootstrap", icon: "bootstrap" },
  { name: "NodeJS", icon: "nodedotjs" },
  { name: "ExpressJS", icon: "express", color: "ffffff" },
  { name: "TailwindCSS", icon: "tailwindcss" },
  { name: "Gitlab", icon: "gitlab" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github", color: "ffffff" },
  { name: "Jira", icon: "jira" },
  { name: "Docker", icon: "docker" },
  { name: "Postman", icon: "postman" },
  { name: "n8n", icon: "n8n" }
];

// Pyramid rows: 6, 5, 5, 4 = 20
const pyramidRows = [
  techSkills.slice(0, 6),
  techSkills.slice(6, 11),
  techSkills.slice(11, 16),
  techSkills.slice(16, 20)
];

// Mobile rows: 3, 2, 3, 2, 3, 2, 3, 2 = 20
const mobileRows = [
  techSkills.slice(0, 3),
  techSkills.slice(3, 5),
  techSkills.slice(5, 8),
  techSkills.slice(8, 10),
  techSkills.slice(10, 13),
  techSkills.slice(13, 15),
  techSkills.slice(15, 18),
  techSkills.slice(18, 20)
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-section__inner">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="skills-section__header"
        >
          <h2 className="skills-section__title">
            Skills
          </h2>
          <div className="title-underline title-underline--center"></div>
        </motion.div>

        <div className="skills-pyramid">
          {pyramidRows.map((row, rowIndex) => (
            <div key={`desktop-${rowIndex}`} className="skills-pyramid__row desktop-row">
              {row.map((skill, i) => (
                <motion.div
                  key={`desktop-skill-${skill.name}`}
                  className="skill-card"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (rowIndex * 0.1) + (i * 0.05) }}
                >
                  <div className="skill-card__icon-wrapper">
                    <div className="skill-card__glow"></div>
                    <img src={`https://cdn.simpleicons.org/${skill.icon}${skill.color ? `/${skill.color}` : ""}`} width="28" height="28" alt={skill.name} />
                  </div>
                  <h3 className="skill-card__name">{skill.name}</h3>
                </motion.div>
              ))}
            </div>
          ))}

          {/* Mobile Layout (3-2-3-2...) */}
          {mobileRows.map((row, rowIndex) => (
            <div key={`mobile-${rowIndex}`} className="skills-pyramid__row mobile-row">
              {row.map((skill, i) => (
                <motion.div
                  key={`mobile-skill-${skill.name}`}
                  className="skill-card"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (rowIndex * 0.1) + (i * 0.05) }}
                >
                  <div className="skill-card__icon-wrapper">
                    <div className="skill-card__glow"></div>
                    <img src={`https://cdn.simpleicons.org/${skill.icon}${skill.color ? `/${skill.color}` : ""}`} width="28" height="28" alt={skill.name} />
                  </div>
                  <h3 className="skill-card__name">{skill.name}</h3>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
