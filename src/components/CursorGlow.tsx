import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CursorGlow = () => {
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-160);
  const y = useMotionValue(-160);
  const springX = useSpring(x, { stiffness: 160, damping: 24 });
  const springY = useSpring(y, { stiffness: 160, damping: 24 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX - 180);
      y.set(event.clientY - 180);
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      className="fixed pointer-events-none z-20 hidden h-[360px] w-[360px] rounded-full blur-3xl md:block"
      style={{
        left: springX,
        top: springY,
        opacity: visible ? 1 : 0,
        background:
          "radial-gradient(circle, rgba(34,211,238,0.09) 0%, rgba(59,130,246,0.04) 38%, transparent 70%)",
      }}
    />
  );
};

export default CursorGlow;