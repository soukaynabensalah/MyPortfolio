import { motion } from "framer-motion";

export default function ScrollProgress({ scrollYProgress }) {
  return (
    <motion.div
      className="progress-bar"
      style={{ width: scrollYProgress }}
    />
  );
}
