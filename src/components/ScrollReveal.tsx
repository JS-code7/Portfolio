import { motion } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
  once?: boolean;
  scale?: number;
}

const getInitial = (direction: Direction, distance: number, scale?: number) => {
  const base: Record<string, number> = { opacity: 0 };
  if (scale) base.scale = scale;
  switch (direction) {
    case "up": return { ...base, y: distance };
    case "down": return { ...base, y: -distance };
    case "left": return { ...base, x: distance };
    case "right": return { ...base, x: -distance };
    default: return base;
  }
};

const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  distance = 60,
  once = true,
  scale,
}: ScrollRevealProps) => (
  <motion.div
    initial={getInitial(direction, distance, scale)}
    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
    viewport={{ once, margin: "-80px" }}
    transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default ScrollReveal;
