import { motion } from "framer-motion";
import { skills, stats } from "../../data/portfolio";

export default function Skills() {
  return (
    <section id="competences" className="skills">
      <div className="skills__inner">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="skills__label">03 / COMPÉTENCES</div>
          <h2 className="skills__title">
            ARSENAL
            <br />
            <span>TECHNIQUE</span>
          </h2>
        </motion.div>

        <div className="skills__grid">
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              className="skill-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{
                scale: 1.05,
                borderColor: "var(--accent)",
                color: "var(--accent)",
              }}
            >
              {skill}
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="stats">
          {stats.map(([number, label]) => (
            <motion.div
              key={number}
              className="stat"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="stat__number">{number}</div>
              <div className="stat__label">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
