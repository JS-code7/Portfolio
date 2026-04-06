import { motion } from "framer-motion";

const SectionDivider = () => (
  <div className="relative h-24 overflow-hidden pointer-events-none py-6" aria-hidden="true">
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Main divider path */}
      <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 1200 200" fill="none">
        <motion.path
          d="M0 120C220 40 380 160 600 110C840 56 965 165 1200 95"
          stroke="hsl(var(--primary) / 0.35)"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ pathLength: [0.2, 1, 0.2], opacity: [0.25, 0.8, 0.25] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Secondary wave */}
        <motion.path
          d="M0 130C220 50 380 170 600 120C840 70 965 175 1200 105"
          stroke="hsl(var(--glow-blue) / 0.25)"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ pathLength: [0.1, 0.9, 0.1], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>

      {/* Accent dots */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40" />
      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/60" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40" />
    </div>
  </div>
);

export default SectionDivider;
