import { motion } from "framer-motion";
import { contactInfo } from "../../data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="contact__label">04 / CONTACT</div>
          <h2 className="contact__title">
            LET'S WORK
            <br />
            <span className="contact__title-outline">TOGETHER</span>
          </h2>

          <div className="contact__list">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                className="contact__item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ paddingLeft: "1rem" }}
              >
                <div className="contact__item-left">
                  <span className="contact__item-icon">{item.icon}</span>
                  <span className="contact__item-label">{item.label}</span>
                </div>
                <span className="contact__item-value">{item.value}</span>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="contact__btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            SEND A MESSAGE →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
