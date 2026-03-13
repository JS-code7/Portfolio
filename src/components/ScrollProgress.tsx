import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 h-[2px] bg-gradient-to-r from-glow-cyan via-glow-blue to-glow-purple z-50 origin-left"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
