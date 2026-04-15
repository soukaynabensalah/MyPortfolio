import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import emailjs from "@emailjs/browser";

// EmailJS credentials (from .env)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      formRef.current.reset();

      // Reset status after 4 seconds
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");

      // Reset status after 4 seconds
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="contact-new">
      <motion.div
        className="contact-new__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="contact-new__title">Contact</h2>
        <div className="title-underline title-underline--center"></div>
        <p>A question? A project? Don't hesitate to reach out, I would love to chat with you!</p>
      </motion.div>

      <motion.div
        className="contact-new__card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <form ref={formRef} onSubmit={handleSubmit} className="contact-new__form">
          <input
            type="text"
            name="from_name"
            placeholder="Your Name"
            className="contact-new__input"
            required
          />
          <input
            type="email"
            name="from_email"
            placeholder="Your Email"
            className="contact-new__input"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="contact-new__input"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            className="contact-new__textarea"
            required
          ></textarea>

          <motion.button
            type="submit"
            className="contact-new__btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <span className="contact-new__btn-loading">
                <span className="contact-new__spinner"></span>
                SENDING...
              </span>
            ) : (
              "SEND MESSAGE →"
            )}
          </motion.button>
        </form>

        {/* Toast notification */}
        <AnimatePresence>
          {(status === "success" || status === "error") && (
            <motion.div
              className={`contact-new__toast ${status === "success"
                  ? "contact-new__toast--success"
                  : "contact-new__toast--error"
                }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {status === "success"
                ? " Message sent successfully!"
                : " Failed to send. Please try again."}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="contact-new__socials">
          <a href="https://github.com/soukaynabensalah" className="contact-new__social-icon" aria-label="GitHub"><FaGithub size={20} /></a>
          <a href="https://www.linkedin.com/in/soukayna-ben-salah/" className="contact-new__social-icon" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
          <a href="mailto:bensalah.soukayna01@gmail.com?subject=Contact%20from%20Portfolio&body=Hello%20Soukayna," className="contact-new__social-icon" aria-label="Email"><FaEnvelope size={20} /></a>
        </div>
      </motion.div>
    </section>
  );
}
