import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });

  return (
    <div className="fixed top-16 left-0 right-0 z-50 h-1 origin-left overflow-hidden bg-white/5 backdrop-blur-sm">
      <motion.div
        className="h-full origin-left rounded-r-full bg-gradient-to-r from-primary via-sky-400 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.55)]"
        style={{ scaleX }}
      />
    </div>
  );
};

export default ScrollProgress;
