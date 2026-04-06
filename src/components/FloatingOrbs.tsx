import { motion } from "framer-motion";

interface FloatingOrbsProps {
  count?: number;
  size?: "sm" | "md" | "lg";
}

const FloatingOrbs = ({ count = 3, size = "md" }: FloatingOrbsProps) => {
  const sizeMap = { sm: 40, md: 60, lg: 100 };
  const radius = sizeMap[size];

  const orbs = Array.from({ length: count });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10" aria-hidden="true">
      {orbs.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: radius,
            height: radius,
            left: `${30 + i * 35}%`,
            top: `${20 + (i % 2) * 40}%`,
            background: i % 2 === 0 ? "hsl(var(--glow-cyan) / 0.08)" : "hsl(var(--glow-purple) / 0.08)",
            filter: i % 2 === 0 ? "blur-2xl" : "blur-3xl",
          }}
          animate={{
            y: [0, -20 - i * 10, 0],
            x: [0, 10 + i * 5, 0],
            scale: [1, 1.1 - i * 0.05, 1],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;
