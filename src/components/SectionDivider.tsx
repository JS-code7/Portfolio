import { motion } from "framer-motion";

const SectionDivider = () => (
  <div className="relative h-20 overflow-hidden pointer-events-none" aria-hidden="true">
    <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 1200 200" fill="none">
      <motion.path
        d="M0 120C220 40 380 160 600 110C840 56 965 165 1200 95"
        stroke="hsl(var(--primary) / 0.35)"
        strokeWidth="2"
        strokeLinecap="round"
        animate={{ pathLength: [0.2, 1, 0.2], opacity: [0.25, 0.8, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  </div>
);

export default SectionDivider;
