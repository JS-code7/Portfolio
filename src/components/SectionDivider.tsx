import { motion } from "framer-motion";

const SectionDivider = () => (
  <div className="relative flex h-20 items-center justify-center overflow-hidden py-6 pointer-events-none" aria-hidden="true">
    <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    <motion.div
      className="h-px w-1/3 max-w-sm rounded-full bg-gradient-to-r from-transparent via-primary/70 to-transparent"
      animate={{ opacity: [0.25, 1, 0.25], scaleX: [0.85, 1, 0.85] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 bg-background shadow-[0_0_18px_rgba(34,211,238,0.35)]" />
  </div>
);

export default SectionDivider;
