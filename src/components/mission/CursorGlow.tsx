import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CursorGlow = () => {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const smoothX = useSpring(x, { stiffness: 220, damping: 36 });
  const smoothY = useSpring(y, { stiffness: 220, damping: 36 });

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    setEnabled(media.matches);

    const onChange = (event: MediaQueryListEvent) => setEnabled(event.matches);
    media.addEventListener("change", onChange);

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX - 180);
      y.set(event.clientY - 180);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      media.removeEventListener("change", onChange);
      window.removeEventListener("mousemove", onMove);
    };
  }, [x, y]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed z-10 h-[360px] w-[360px] rounded-full"
      style={{
        left: smoothX,
        top: smoothY,
        background: "radial-gradient(circle, hsl(187 100% 50% / 0.06) 0%, hsl(217 91% 60% / 0.03) 36%, transparent 72%)",
      }}
      aria-hidden="true"
    />
  );
};

export default CursorGlow;
