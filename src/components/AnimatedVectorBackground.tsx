import { motion } from "framer-motion";
import GradientBlob from "@/components/GradientBlob";

const AnimatedVectorBackground = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10" aria-hidden="true">
    <GradientBlob className="-top-24 -left-24 h-72 w-72 bg-primary/10" />
    <GradientBlob className="-bottom-24 right-0 h-80 w-80 bg-glow-purple/10" delay={0.8} />
    <GradientBlob className="top-1/3 left-1/2 h-56 w-56 bg-glow-blue/10" delay={1.2} />
    <motion.div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--primary) / 0.08) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.08) 1px, transparent 1px)",
        backgroundSize: "54px 54px",
      }}
      animate={{ backgroundPosition: ["0px 0px", "54px 54px"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 1200 900" fill="none">
      <motion.path
        d="M0 200 C 300 120, 900 280, 1200 180"
        stroke="hsl(var(--primary) / 0.25)"
        strokeWidth="1.5"
        strokeDasharray="8 10"
        animate={{ strokeDashoffset: [0, -72] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M0 560 C 320 640, 840 470, 1200 560"
        stroke="hsl(var(--glow-blue) / 0.2)"
        strokeWidth="1.5"
        strokeDasharray="10 12"
        animate={{ strokeDashoffset: [0, 80] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <circle cx="220" cy="720" r="120" stroke="hsl(var(--primary) / 0.2)" />
      <circle cx="980" cy="160" r="90" stroke="hsl(var(--glow-purple) / 0.2)" />
    </svg>
  </div>
);

export default AnimatedVectorBackground;
