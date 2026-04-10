import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const GridOverlay = () => {
  const cursorX = useMotionValue(50);
  const cursorY = useMotionValue(50);
  const smoothX = useSpring(cursorX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(cursorY, { stiffness: 50, damping: 20 });
  const gridX = useTransform(smoothX, (v) => (v - 50) * -0.18);
  const gridY = useTransform(smoothY, (v) => (v - 50) * -0.18);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      cursorX.set((event.clientX / window.innerWidth) * 100);
      cursorY.set((event.clientY / window.innerHeight) * 100);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursorX, cursorY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background)),hsl(224_40%_4%))]" />
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)/0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.1) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          x: gridX,
          y: gridY,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--glow-blue)/0.12),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--glow-cyan)/0.09),transparent_55%)]" />
      <div className="noise-layer absolute inset-0 opacity-[0.22]" />
    </div>
  );
};

export default GridOverlay;
