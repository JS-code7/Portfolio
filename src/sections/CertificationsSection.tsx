import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import StaggerContainer, { staggerItemVariants } from "@/components/StaggerContainer";
import { Award, Shield, Cloud, Brain, Lock } from "lucide-react";
import { type LucideIcon } from "lucide-react";

const certs: { name: string; icon: LucideIcon; issuer: string }[] = [
  { name: "Introduction to Cloud Infrastructure", icon: Cloud, issuer: "Microsoft" },
  { name: "Introduction to AI in Azure", icon: Brain, issuer: "Microsoft" },
  { name: "OCI – AI Foundations Associate", icon: Award, issuer: "Oracle" },
  { name: "Defensive Security Hacking", icon: Shield, issuer: "Security Cert" },
  { name: "Offensive Security Certified", icon: Lock, issuer: "OSCP" },
];

const CertificationsSection = () => (
  <section id="certifications" className="relative py-20 md:py-32 px-4">
    <div className="container mx-auto max-w-4xl">
      <SectionHeading title="Certifications" subtitle="Professional credentials" />

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
        {certs.map((cert) => (
          <motion.div key={cert.name} variants={staggerItemVariants}>
            <GlassCard delay={0} className="p-5 group cursor-default hover:bg-primary/5 transition-colors duration-300">
              <div className="flex items-start gap-3">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-glow-blue/10 flex items-center justify-center shrink-0"
                >
                  <cert.icon size={18} className="text-primary" />
                </motion.div>
                <div>
                  <p className="text-sm text-foreground group-hover:text-primary transition-colors leading-snug font-medium">
                    {cert.name}
                  </p>
                  <p className="text-[10px] font-mono text-muted-foreground mt-1">{cert.issuer}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default CertificationsSection;
