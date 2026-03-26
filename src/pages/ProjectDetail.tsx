import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollReveal from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";
import Footer from "@/components/Footer";
import { api, type Project } from "@/lib/api";
import { ArrowLeft, ExternalLink, Loader2, CheckCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      api.getProjectBySlug(slug).then((data) => {
        setProject(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <PageTransition>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      </PageTransition>
    );
  }

  if (!project) {
    return (
      <PageTransition>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-display font-bold text-foreground">Project Not Found</h1>
          <Link to="/projects">
            <Button variant="outline" className="gap-2 border-primary/30">
              <ArrowLeft size={14} /> Back to Projects
            </Button>
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <ParticleBackground />
      <ScrollProgress />
      <Navbar />
      <div className="relative z-10 min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">{project.category}</span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-gradient-cyan mt-4 mb-4">
              {project.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{project.description}</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ScrollReveal direction="left" delay={0.2}>
              <GlassCard className="p-6">
                <h3 className="text-xs font-mono text-primary/70 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Zap size={14} /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="text-sm font-mono px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3}>
              <GlassCard className="p-6">
                <h3 className="text-xs font-mono text-primary/70 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <CheckCircle size={14} /> Highlights
                </h3>
                <ul className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <motion.li
                      key={h}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.4}>
            <div className="flex gap-3">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 group">
                <ExternalLink size={14} className="group-hover:rotate-12 transition-transform" /> View Live
              </Button>
              <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
                Source Code
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default ProjectDetail;
