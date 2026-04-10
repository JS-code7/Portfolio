import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  align?: "left" | "center";
}

const SectionHeader = ({ eyebrow, title, subtitle, action, align = "center" }: SectionHeaderProps) => {
  const center = align === "center";

  return (
    <div className={`mb-10 md:mb-14 flex ${center ? "items-center text-center" : "items-start text-left"} flex-col gap-4`}>
      <div className={`flex ${center ? "justify-center" : "justify-start"} items-center gap-3 w-full`}>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="h-px flex-1 max-w-16 origin-center bg-gradient-to-r from-transparent via-primary/70 to-transparent"
        />
        {eyebrow && (
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.32em] text-primary/80">
            {eyebrow}
          </span>
        )}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="h-px flex-1 max-w-16 origin-center bg-gradient-to-r from-transparent via-primary/70 to-transparent"
        />
      </div>

      <div className={`w-full flex ${center ? "justify-center" : "justify-between"} items-end gap-4 flex-wrap`}>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-foreground"
        >
          {title}
        </motion.h2>
        {action}
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-2xl text-sm md:text-base text-muted-foreground ${center ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;