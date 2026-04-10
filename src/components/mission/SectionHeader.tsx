import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

const SectionHeader = ({ eyebrow, title, subtitle }: SectionHeaderProps) => (
  <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-3 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-primary/90"
    >
      {eyebrow}
    </motion.p>
    <motion.h2
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 }}
      className="text-3xl font-display font-bold text-foreground md:text-5xl"
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.12 }}
      className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base"
    >
      {subtitle}
    </motion.p>
  </div>
);

export default SectionHeader;
