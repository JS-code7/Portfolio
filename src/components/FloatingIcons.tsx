import { motion } from "framer-motion";
import { Shield, Cpu, Globe, Brain, Zap, Wifi, Code2, Lock } from "lucide-react";

const icons = [
  { Icon: Shield, x: "8%", y: "18%", delay: 0, size: 24 },
  { Icon: Cpu, x: "87%", y: "12%", delay: 0.5, size: 28 },
  { Icon: Globe, x: "78%", y: "72%", delay: 1, size: 22 },
  { Icon: Brain, x: "12%", y: "78%", delay: 1.5, size: 26 },
  { Icon: Zap, x: "45%", y: "8%", delay: 0.8, size: 20 },
  { Icon: Wifi, x: "92%", y: "48%", delay: 1.2, size: 22 },
  { Icon: Code2, x: "5%", y: "48%", delay: 0.3, size: 24 },
  { Icon: Lock, x: "65%", y: "5%", delay: 0.9, size: 18 },
];

const FloatingIcons = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {icons.map(({ Icon, x, y, delay, size }, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{ left: x, top: y }}
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 0.12, scale: 1, rotate: 0 }}
        transition={{ delay: delay + 1, duration: 0.8, type: "spring" }}
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 5 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={size} className="text-primary" />
        </motion.div>
      </motion.div>
    ))}
  </div>
);

export default FloatingIcons;
