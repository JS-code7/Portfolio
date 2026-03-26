import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>
      <motion.div
        className="fixed top-16 left-0 right-0 h-[2px] z-50 origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, hsl(var(--glow-cyan)), hsl(var(--glow-blue)), hsl(var(--glow-purple)))",
        }}
      />
      {/* Glow effect under progress bar */}
      <motion.div
        className="fixed top-16 left-0 right-0 h-[6px] z-49 origin-left blur-sm opacity-50"
        style={{
          scaleX,
          background: "linear-gradient(90deg, hsl(var(--glow-cyan)), hsl(var(--glow-blue)))",
        }}
      />
    </>
  );
};

export default ScrollProgress;
