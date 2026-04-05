import { motion } from "framer-motion";

interface GradientBlobProps {
  className?: string;
  delay?: number;
}

const GradientBlob = ({ className = "", delay = 0 }: GradientBlobProps) => (
  <motion.div
    className={`absolute rounded-[45%_55%_60%_40%] blur-3xl ${className}`}
    animate={{
      borderRadius: [
        "45% 55% 60% 40%",
        "60% 40% 35% 65%",
        "48% 52% 58% 42%",
        "45% 55% 60% 40%",
      ],
      x: [0, 20, -15, 0],
      y: [0, -15, 20, 0],
      scale: [1, 1.05, 0.98, 1],
    }}
    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

export default GradientBlob;
