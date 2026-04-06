import { motion } from "framer-motion";

const AnimatedGridBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 1200 900" fill="none">
        {/* Animated grid lines */}
        <motion.g>
          {/* Horizontal lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0"
              y1={i * 75}
              x2="1200"
              y2={i * 75}
              stroke="hsl(var(--glow-cyan) / 0.3)"
              strokeWidth="1"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
          {/* Vertical lines */}
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.line
              key={`v-${i}`}
              x1={i * 75}
              y1="0"
              x2={i * 75}
              y2="900"
              stroke="hsl(var(--glow-blue) / 0.2)"
              strokeWidth="1"
              animate={{ opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, delay: i * 0.08 }}
            />
          ))}
        </motion.g>

        {/* Accent nodes at intersections */}
        <motion.g>
          {[2, 5, 8, 11].map((x) =>
            [2, 4, 7, 10].map((y) => (
              <motion.circle
                key={`node-${x}-${y}`}
                cx={x * 75}
                cy={y * 75}
                r="2"
                fill="hsl(var(--primary) / 0.3)"
                animate={{ r: [2, 4, 2] }}
                transition={{ duration: 4, repeat: Infinity, delay: (x + y) * 0.05 }}
              />
            ))
          )}
        </motion.g>
      </svg>
    </div>
  );
};

export default AnimatedGridBackground;
