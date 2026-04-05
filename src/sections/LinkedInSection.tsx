import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";
import { linkedinProfile } from "@/data/linkedinProfile";
import { Briefcase, Trophy, MapPin, Sparkles } from "lucide-react";

const LinkedInSection = () => (
  <section id="linkedin" className="relative py-20 md:py-28 px-4">
    <div className="container mx-auto max-w-5xl">
      <SectionHeading title="LinkedIn Highlights" subtitle="Dynamic professional profile snapshot" />

      <ScrollReveal className="mb-8">
        <GlassCard tilt={false} className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3 className="text-2xl font-display font-bold text-foreground">{linkedinProfile.name}</h3>
              <p className="text-sm text-primary mt-1">{linkedinProfile.headline}</p>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <MapPin size={12} /> {linkedinProfile.location}
              </p>
            </div>
            <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">
              Simulated live data
            </span>
          </div>
        </GlassCard>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScrollReveal direction="left">
          <GlassCard tilt={false} className="p-6">
            <h4 className="text-sm font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Briefcase size={15} className="text-primary" /> Experience
            </h4>
            <div className="space-y-4">
              {linkedinProfile.experience.map((item, index) => (
                <motion.div
                  key={`${item.title}-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-border/60 bg-secondary/30 p-4"
                >
                  <p className="font-medium text-foreground text-sm">{item.title}</p>
                  <p className="text-xs text-primary/80">{item.company}</p>
                  <p className="text-[10px] text-muted-foreground font-mono mt-1">{item.period}</p>
                  <ul className="mt-2 space-y-1">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="text-xs text-muted-foreground flex gap-2">
                        <Sparkles size={12} className="text-primary/70 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.1}>
          <GlassCard tilt={false} className="p-6">
            <h4 className="text-sm font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Trophy size={15} className="text-primary" /> Achievements & Skills
            </h4>
            <div className="mb-4 flex flex-wrap gap-2">
              {linkedinProfile.achievements.map((achievement) => (
                <span
                  key={achievement}
                  className="text-[10px] font-mono px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {achievement}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {linkedinProfile.skills.slice(0, 10).map((skill) => (
                <div key={skill} className="text-xs text-muted-foreground rounded-lg bg-secondary/40 px-3 py-2">
                  {skill}
                </div>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default LinkedInSection;
