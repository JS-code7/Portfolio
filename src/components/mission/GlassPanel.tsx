import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const GlassPanel = ({ children, className, delay = 0 }: GlassPanelProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    className={cn(
      "relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,hsl(var(--surface-glass)/0.82),hsl(var(--surface-glass)/0.48))] backdrop-blur-xl shadow-[0_22px_45px_-26px_hsl(187_100%_50%/0.28)]",
      className,
    )}
  >
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
    {children}
  </motion.div>
);

export default GlassPanel;
