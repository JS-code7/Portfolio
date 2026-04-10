import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-16 z-50 h-[2px] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, hsl(var(--glow-cyan)), hsl(var(--glow-blue)), hsl(var(--glow-purple)))",
        }}
      />
      <motion.div
        className="fixed left-0 right-0 top-16 z-40 h-3 origin-left blur-md"
        style={{
          scaleX,
          background: "linear-gradient(90deg, hsl(var(--glow-cyan)/0.5), hsl(var(--glow-blue)/0.25))",
        }}
      />
    </>
  );
};

export default ScrollProgressBar;
