import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const GlowCursor = () => {
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
      if (!visible) setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", handler);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", handler);
      document.removeEventListener("mouseleave", leave);
    };
  }, [visible, mouseX, mouseY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-30 w-[300px] h-[300px] rounded-full hidden md:block"
      style={{
        background: "radial-gradient(circle, hsl(187 100% 50% / 0.06) 0%, hsl(217 91% 60% / 0.02) 40%, transparent 70%)",
        left: springX,
        top: springY,
        opacity: visible ? 1 : 0,
      }}
    />
  );
};

export default GlowCursor;
