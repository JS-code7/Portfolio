import SectionHeader from "@/components/mission/SectionHeader";
import SkillNode from "@/components/mission/SkillNode";

const skillModules = [
  {
    title: "Secure Engineering",
    detail: "Threat-aware design, input validation, and practical defense patterns.",
    score: 84,
  },
  {
    title: "AI System Design",
    detail: "Applied ML workflows and inference-first product integration.",
    score: 78,
  },
  {
    title: "Robotics + IoT",
    detail: "Sensor-driven control systems with real-time signal handling.",
    score: 80,
  },
  {
    title: "Frontend Craft",
    detail: "Motion-first UI systems with accessibility and strong hierarchy.",
    score: 88,
  },
  {
    title: "Full-Stack Delivery",
    detail: "API integration, data flows, and deployment-ready implementation.",
    score: 82,
  },
  {
    title: "Debugging Discipline",
    detail: "Failure analysis, profiling, and reproducible fixes under constraints.",
    score: 86,
  },
];

const SkillsSection = () => (
  <section id="skills" className="relative px-4 py-20 md:py-28">
    <div className="container mx-auto max-w-6xl">
      <SectionHeader
        eyebrow="System Capabilities"
        title="Core capabilities powering every mission"
        subtitle="Skill modules are mapped as production capabilities, not keyword lists."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillModules.map((skill) => (
          <SkillNode key={skill.title} title={skill.title} detail={skill.detail} score={skill.score} />
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
