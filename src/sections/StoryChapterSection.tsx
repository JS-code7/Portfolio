import { motion } from "framer-motion";
import SectionHeader from "@/components/mission/SectionHeader";
import GlassPanel from "@/components/mission/GlassPanel";

const chapters = [
  {
    title: "Chapter 1: The Beginning",
    content: "Curiosity started with small circuits and scripts. The objective was simple: understand how systems behave under pressure.",
  },
  {
    title: "Chapter 2: First Build",
    content: "Early projects became proof points — rough around the edges but focused on solving practical problems end-to-end.",
  },
  {
    title: "Chapter 3: Failures & Learning",
    content: "Bugs, latency, and flawed assumptions exposed weak architecture decisions, pushing better debugging and stronger planning habits.",
  },
  {
    title: "Chapter 4: Breakthrough",
    content: "Integrating AI, robotics, and secure engineering workflows turned isolated experiments into cohesive product thinking.",
  },
  {
    title: "Chapter 5: Now",
    content: "Today the focus is premium execution: thoughtful UX, reliable systems, and measurable outcomes that hold up in production.",
  },
];

const StoryChapterSection = () => (
  <section className="relative px-4 py-20 md:py-28" id="story-mode">
    <div className="container mx-auto max-w-6xl">
      <SectionHeader
        eyebrow="Story Mode"
        title="A narrative journey from first prototypes to product-grade delivery"
        subtitle="Scroll unfolds each chapter like a campaign timeline, with deliberate transitions and clear progression."
      />

      <div className="space-y-5">
        {chapters.map((chapter, index) => (
          <motion.div
            key={chapter.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="relative"
          >
            <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-primary/40 via-primary/10 to-transparent md:block" />
            <GlassPanel className="relative ml-0 p-5 md:ml-12 md:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/35 bg-primary/10 font-mono text-[11px] text-primary">
                  {index + 1}
                </span>
                <h3 className="text-lg font-display font-semibold text-foreground">{chapter.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{chapter.content}</p>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StoryChapterSection;
