import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa6";

export default function Contact() {
  return (
    <section id="contact" className="contact-new">
      <motion.div 
        className="contact-new__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="contact-new__title">Contact</h2>
        <p>A question? A project? Don't hesitate to reach out, I would love to chat with you!</p>
      </motion.div>

      <motion.div 
        className="contact-new__card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="contact-new__form">
          <input type="text" placeholder="Your Name" className="contact-new__input" />
          <input type="email" placeholder="Your Email" className="contact-new__input" />
          <input type="text" placeholder="Subject" className="contact-new__input" />
          <textarea placeholder="Message" className="contact-new__textarea"></textarea>
          
          <motion.button
            className="contact-new__btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            SEND MESSAGE →
          </motion.button>
        </div>
        
        <div className="contact-new__socials">
          <a href="#" className="contact-new__social-icon" aria-label="GitHub"><FaGithub size={20} /></a>
          <a href="#" className="contact-new__social-icon" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
          <a href="#" className="contact-new__social-icon" aria-label="Instagram"><FaInstagram size={20} /></a>
          <a href="#" className="contact-new__social-icon" aria-label="Email"><FaEnvelope size={20} /></a>
        </div>
      </motion.div>
    </section>
  );
}
