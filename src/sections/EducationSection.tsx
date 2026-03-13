import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import { GraduationCap } from "lucide-react";

const EducationSection = () => (
  <section id="education" className="relative py-20 md:py-32 px-4">
    <div className="container mx-auto max-w-3xl">
      <SectionHeading title="Education" />

      <GlassCard className="p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <GraduationCap size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground text-lg">
              Bachelor of Technology – Computer Engineering
            </h3>
            <p className="text-sm text-primary/80 mt-1">Gujarat Technological University</p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">2024 – 2028</p>
          </div>
        </div>
      </GlassCard>
    </div>
  </section>
);

export default EducationSection;
