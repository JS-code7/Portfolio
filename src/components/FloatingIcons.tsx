import { motion } from "framer-motion";
import { Shield, Cpu, Globe, Brain, Zap, Wifi } from "lucide-react";

const icons = [
  { Icon: Shield, x: "10%", y: "20%", delay: 0 },
  { Icon: Cpu, x: "85%", y: "15%", delay: 0.5 },
  { Icon: Globe, x: "75%", y: "70%", delay: 1 },
  { Icon: Brain, x: "15%", y: "75%", delay: 1.5 },
  { Icon: Zap, x: "50%", y: "10%", delay: 0.8 },
  { Icon: Wifi, x: "90%", y: "45%", delay: 1.2 },
];

const FloatingIcons = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {icons.map(({ Icon, x, y, delay }, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{ left: x, top: y }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ delay: delay + 1, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon size={28} className="text-primary" />
        </motion.div>
      </motion.div>
    ))}
  </div>
);

export default FloatingIcons;
