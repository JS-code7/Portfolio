import { motion } from "framer-motion";

const floatingShapes = [
  { size: 26, left: "14%", top: "24%", delay: 0.2 },
  { size: 14, left: "30%", top: "68%", delay: 0.9 },
  { size: 18, left: "78%", top: "30%", delay: 0.5 },
  { size: 22, left: "64%", top: "76%", delay: 1.1 },
];

const FloatingShapes = () => (
  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
    {floatingShapes.map((shape, index) => (
      <motion.div
        key={index}
        className="absolute rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
        style={{
          width: shape.size,
          height: shape.size,
          left: shape.left,
          top: shape.top,
        }}
        animate={{ y: [0, -16, 0], rotate: [0, 8, -5, 0], opacity: [0.35, 0.75, 0.35] }}
        transition={{
          duration: 6 + index,
          repeat: Infinity,
          ease: "easeInOut",
          delay: shape.delay,
        }}
      />
    ))}
  </div>
);

export default FloatingShapes;
