import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../../data/portfolio";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <section id="projects" className="projects">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="projects__label">02 / SELECTED PROJECTS</div>
        <h2 className="projects__title">
          DIGITAL
          <br />
          <span>ARTWORKS</span>
        </h2>
      </motion.div>

      <div className="projects__grid">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            className="project-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            style={{
              background:
                hoveredProject === project.id
                  ? "rgba(122,255,212,0.03)"
                  : "transparent",
              paddingLeft: hoveredProject === project.id ? "1rem" : "0",
            }}
          >
            <span className="project-card__id">{project.id}</span>

            <div>
              <div className="project-card__header">
                <motion.div
                  animate={{ width: hoveredProject === project.id ? 24 : 0 }}
                  style={{
                    height: 2,
                    background: project.color,
                    overflow: "hidden",
                  }}
                />
                <h3
                  className="project-card__title"
                  style={{
                    color:
                      hoveredProject === project.id
                        ? project.color
                        : "var(--text)",
                  }}
                >
                  {project.title}
                </h3>
              </div>

              <p className="project-card__desc">{project.desc}</p>

              <div className="project-card__tags">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="project-card__tag"
                    style={{
                      border: `1px solid ${project.color}30`,
                      color: project.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              className="project-card__arrow"
              animate={{
                x: hoveredProject === project.id ? 0 : 10,
                opacity: hoveredProject === project.id ? 1 : 0,
              }}
              style={{ color: project.color }}
            >
              →
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
