import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

const timeline = [
  {
    role: "Associate Professional Service Director",
    org: "Rotaract Club of New L.J.I.E.T",
    period: "July 2025 – Present",
    desc: "Leading professional service initiatives, organizing community events, and driving impactful projects that bridge technology and social responsibility.",
    skills: ["Leadership", "Community Service", "Event Management"],
  },
];

const ExperienceSection = () => (
  <section id="experience" className="relative py-20 md:py-32 px-4">
    <div className="container mx-auto max-w-3xl">
      <SectionHeading title="Experience" subtitle="Professional journey" />

      <div className="relative pl-8 md:pl-12">
        {/* Animated timeline line */}
        <motion.div
          className="absolute left-3 md:left-5 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.5), hsl(var(--primary) / 0.1), transparent)" }}
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div className="space-y-8">
          {timeline.map((item, i) => (
            <ScrollReveal key={i} direction="left" delay={i * 0.2}>
              <div className="relative">
                {/* Glowing node */}
                <motion.div
                  className="absolute -left-5 md:-left-7 top-1 w-4 h-4 rounded-full border-2 border-primary bg-background"
                  animate={{
                    boxShadow: [
                      "0 0 0px hsl(187 100% 50% / 0)",
                      "0 0 15px hsl(187 100% 50% / 0.5)",
                      "0 0 0px hsl(187 100% 50% / 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="absolute -left-[13px] md:-left-[19px] top-1 w-4 h-4 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: "3s" }} />

                <div className="glass glow-border rounded-xl p-6 hover:bg-primary/5 transition-colors duration-300">
                  <span className="text-xs font-mono text-primary/70 bg-primary/5 px-2 py-0.5 rounded-full">{item.period}</span>
                  <h3 className="font-display font-semibold text-foreground text-lg mt-2">
                    {item.role}
                  </h3>
                  <p className="text-sm text-primary/60 mt-0.5">{item.org}</p>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {item.skills.map((s) => (
                      <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
