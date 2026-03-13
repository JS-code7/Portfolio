import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import { Award } from "lucide-react";

const certs = [
  "Microsoft Introduction to Cloud Infrastructure",
  "Microsoft Introduction to AI in Azure",
  "Oracle Cloud Infrastructure Certified – AI Foundations Associate",
  "Defensive Security Hacking",
  "Offensive Security Certified Professional",
];

const CertificationsSection = () => (
  <section id="certifications" className="relative py-20 md:py-32 px-4">
    <div className="container mx-auto max-w-4xl">
      <SectionHeading title="Certifications" subtitle="Professional credentials" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map((cert, i) => (
          <GlassCard key={cert} delay={i * 0.08} className="p-5 group cursor-default">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Award size={16} className="text-primary" />
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-snug">
                {cert}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

export default CertificationsSection;
