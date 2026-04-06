import { motion } from "framer-motion";

const NeonGlowLines = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 1200 900" fill="none">
        {/* Pulsing diagonal lines */}
        <motion.path
          d="M0 0 L1200 900"
          stroke="hsl(var(--glow-cyan))"
          strokeWidth="0.5"
          opacity="0.2"
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.path
          d="M1200 0 L0 900"
          stroke="hsl(var(--glow-purple))"
          strokeWidth="0.5"
          opacity="0.2"
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
        />

        {/* Animated corner accents */}
        <motion.rect
          x="10"
          y="10"
          width="80"
          height="80"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.rect
          x="1110"
          y="810"
          width="80"
          height="80"
          fill="none"
          stroke="hsl(var(--glow-blue))"
          strokeWidth="1"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.3 }}
        />

        {/* Center focal point */}
        <motion.circle
          cx="600"
          cy="450"
          r="2"
          fill="hsl(var(--primary))"
          animate={{ r: [2, 5, 2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </svg>
    </div>
  );
};

export default NeonGlowLines;
