import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayStart?: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerDelay: number; delayStart: number }) => ({
    opacity: 1,
    transition: {
      delayChildren: custom.delayStart,
      staggerChildren: custom.staggerDelay,
    },
  }),
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const StaggerContainer = ({ children, className = "", staggerDelay = 0.1, delayStart = 0 }: StaggerContainerProps) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    custom={{ staggerDelay, delayStart }}
    className={className}
  >
    {children}
  </motion.div>
);

export default StaggerContainer;
