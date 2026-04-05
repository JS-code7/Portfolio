import { motion } from "framer-motion";

const AnimatedVectorBackground = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10" aria-hidden="true">
    <motion.div
      className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-glow-purple/10 blur-3xl"
      animate={{ x: [0, -25, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
    />
    <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 1200 900" fill="none">
      <motion.path
        d="M0 200 C 300 120, 900 280, 1200 180"
        stroke="hsl(var(--primary) / 0.25)"
        strokeWidth="1.5"
        strokeDasharray="8 10"
        animate={{ strokeDashoffset: [0, -72] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M0 560 C 320 640, 840 470, 1200 560"
        stroke="hsl(var(--glow-blue) / 0.2)"
        strokeWidth="1.5"
        strokeDasharray="10 12"
        animate={{ strokeDashoffset: [0, 80] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <circle cx="220" cy="720" r="120" stroke="hsl(var(--primary) / 0.2)" />
      <circle cx="980" cy="160" r="90" stroke="hsl(var(--glow-purple) / 0.2)" />
    </svg>
  </div>
);

export default AnimatedVectorBackground;
