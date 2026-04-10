import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const GridOverlay = () => {
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, { stiffness: 90, damping: 18, mass: 0.4 });
  const springY = useSpring(offsetY, { stiffness: 90, damping: 18, mass: 0.4 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 12;
      offsetX.set(x);
      offsetY.set(y);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [offsetX, offsetY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-0 opacity-45"
        style={{
          x: springX,
          y: springY,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "64px 64px"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.08),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(147,51,234,0.06),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,16,0.2),rgba(6,8,16,0.75))]" />
    </div>
  );
};

export default GridOverlay;