import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => (
  <div className="text-center mb-12 md:mb-16">
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", damping: 20 }}
      className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"
    />
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3 overflow-hidden">
      {title.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03, duration: 0.4 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-sm md:text-base text-muted-foreground font-mono"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="w-24 h-px bg-gradient-to-r from-primary via-glow-blue to-glow-purple mx-auto mt-4"
    />
  </div>
);

export default SectionHeading;
