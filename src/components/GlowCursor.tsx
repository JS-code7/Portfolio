import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const GlowCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-30 w-[300px] h-[300px] rounded-full hidden md:block"
      style={{
        background: "radial-gradient(circle, hsl(187 100% 50% / 0.06) 0%, transparent 70%)",
        left: pos.x - 150,
        top: pos.y - 150,
      }}
      animate={{ left: pos.x - 150, top: pos.y - 150 }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
    />
  );
};

export default GlowCursor;
