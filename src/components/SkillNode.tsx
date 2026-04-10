import { motion } from "framer-motion";

interface SkillNodeProps {
  label: string;
  kind: string;
  active?: boolean;
  related?: boolean;
  x: number;
  y: number;
  onHover: () => void;
}

const SkillNode = ({ label, kind, active = false, related = false, x, y, onHover }: SkillNodeProps) => {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={onHover}
      onFocus={onHover}
      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-4 py-2 text-left transition-all duration-300 ${
        active
          ? "border-primary/60 bg-primary/15 text-foreground shadow-[0_0_24px_-8px_rgba(34,211,238,0.75)]"
          : related
            ? "border-white/15 bg-white/10 text-foreground"
            : "border-white/10 bg-black/20 text-muted-foreground"
      }`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${active ? "bg-primary" : "bg-white/35"}`} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.24em] text-primary/70">{kind}</div>
    </motion.button>
  );
};

export default SkillNode;