import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassPanel = ({ children, className = "", hover = false }: GlassPanelProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/8 bg-[hsl(var(--surface-glass)/0.62)] backdrop-blur-2xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.03),transparent_42%)]" />
      {children}
    </motion.div>
  );
};

export default GlassPanel;