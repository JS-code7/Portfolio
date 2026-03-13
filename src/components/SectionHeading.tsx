import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="text-center mb-12 md:mb-16"
  >
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient-cyan mb-3">
      {title}
    </h2>
    {subtitle && (
      <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">{subtitle}</p>
    )}
    <div className="neon-line w-24 mx-auto mt-4" />
  </motion.div>
);

export default SectionHeading;
