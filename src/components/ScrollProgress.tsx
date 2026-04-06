import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>
      <motion.div
        className="fixed top-16 left-0 right-0 h-[2px] z-50 origin-left backdrop-blur-sm"
        style={{
          scaleX,
          background: "linear-gradient(90deg, hsl(var(--glow-cyan)), hsl(var(--glow-blue)), hsl(var(--glow-purple)))",
          boxShadow: "0 0 15px -3px hsl(187 100% 50% / 0.6), 0 0 30px -5px hsl(217 91% 60% / 0.3)",
        }}
      />
      {/* Glow effect under progress bar - enhanced */}
      <motion.div
        className="fixed top-16 left-0 right-0 h-[8px] z-49 origin-left blur-md"
        style={{
          scaleX,
          background: "linear-gradient(90deg, hsl(var(--glow-cyan) / 0.4), hsl(var(--glow-blue) / 0.2))",
          opacity: 0.6,
        }}
      />
      {/* Additional accent glow */}
      <motion.div
        className="fixed top-16 left-0 right-0 h-[1px] z-48 origin-left"
        style={{
          scaleX,
          background: "hsl(var(--glow-cyan))",
          opacity: 0.3,
          filter: "blur(1px)",
        }}
      />
    </>
  );
};

export default ScrollProgress;
