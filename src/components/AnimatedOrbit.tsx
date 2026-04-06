import { motion } from "framer-motion";

const AnimatedOrbit = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 1200 900" fill="none">
        {/* Orbital rings */}
        <motion.circle
          cx="600"
          cy="450"
          r="150"
          stroke="hsl(var(--primary) / 0.3)"
          strokeWidth="1"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="600"
          cy="450"
          r="250"
          stroke="hsl(var(--glow-blue) / 0.2)"
          strokeWidth="1"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="600"
          cy="450"
          r="350"
          stroke="hsl(var(--glow-purple) / 0.15)"
          strokeWidth="1"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* Orbiting dots */}
        <motion.g>
          <motion.circle
            cx="600"
            cy="300"
            r="6"
            fill="hsl(var(--primary) / 0.6)"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "600px 450px" }}
          />
          <motion.circle
            cx="750"
            cy="450"
            r="5"
            fill="hsl(var(--glow-blue) / 0.5)"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "600px 450px" }}
          />
          <motion.circle
            cx="600"
            cy="600"
            r="4"
            fill="hsl(var(--glow-purple) / 0.4)"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "600px 450px" }}
          />
        </motion.g>

        {/* Center glow */}
        <motion.circle
          cx="600"
          cy="450"
          r="20"
          fill="hsl(var(--primary) / 0.3)"
          animate={{ r: [20, 25, 20] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </svg>
    </div>
  );
};

export default AnimatedOrbit;
