import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <motion.div
          className="about__card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="about__header">
            <svg
              className="about__icon"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
            </svg>
            <h2 className="about__title">About</h2>
          </div>
          <div className="about__text">
            <p>
              I’m a passionate <strong>Web Developer</strong> focused on building modern, high-performance applications. I work across both frontend and backend, creating scalable, secure, and efficient systems that deliver seamless user experiences.
            </p>
            <p>
              I follow Agile principles, valuing collaboration, adaptability, and continuous improvement. I enjoy solving complex technical challenges and turning ideas into clean, reliable solutions.
            </p>
            <p>
              Always curious and driven to grow, I continuously explore new technologies to deliver impactful and innovative digital products.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
