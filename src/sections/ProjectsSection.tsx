import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerContainer, { staggerItemVariants } from "@/components/StaggerContainer";
import { Button } from "@/components/ui/button";
import { api, type Project } from "@/lib/api";

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api.getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading title="Projects" subtitle="A selection of things I've built" />

        {/* Category filters */}
        <ScrollReveal className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                filter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground border border-border/50 hover:border-primary/30"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </ScrollReveal>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  variants={staggerItemVariants}
                  layout
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <GlassCard delay={0} className="p-6 cursor-pointer group h-full">
                    <div onClick={() => setSelectedProject(project)} className="h-full flex flex-col">
                      {/* Category badge */}
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary/80 self-start mb-3">
                        {project.category}
                      </span>
                      <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors text-sm md:text-base">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </StaggerContainer>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong glow-border rounded-2xl p-6 md:p-8 max-w-lg w-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary/80">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-display font-bold text-lg text-foreground mt-2">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0 hover:rotate-90 duration-300"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                {selectedProject.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-mono text-primary/70 uppercase tracking-wider mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-mono text-primary/70 uppercase tracking-wider mb-2">Highlights</h4>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((h, i) => (
                    <motion.li
                      key={h}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </div>

               <Button
                 asChild
                 variant="outline"
                 size="sm"
                 className="border-primary/30 text-foreground hover:bg-primary/10 gap-2 w-full group"
               >
                 <Link to={`/projects/${selectedProject.slug}`}>
                   <ExternalLink size={14} className="group-hover:rotate-12 transition-transform" /> View Project
                 </Link>
               </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
