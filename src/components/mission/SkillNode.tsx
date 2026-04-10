import { motion } from "framer-motion";
import GlassPanel from "@/components/mission/GlassPanel";

interface SkillNodeProps {
  title: string;
  detail: string;
  score: number;
}

const SkillNode = ({ title, detail, score }: SkillNodeProps) => (
  <motion.div whileHover={{ y: -4, scale: 1.01 }}>
    <GlassPanel className="p-4">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-display font-semibold text-foreground">{title}</h4>
        <span className="font-mono text-[10px] text-primary">{score}%</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary/90 to-glow-blue/85"
        />
      </div>
    </GlassPanel>
  </motion.div>
);

export default SkillNode;
