import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollReveal from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";
import StaggerContainer, { staggerItemVariants } from "@/components/StaggerContainer";
import Footer from "@/components/Footer";
import { api, type BlogPost } from "@/lib/api";
import { Calendar, Clock, Loader2, ArrowRight } from "lucide-react";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBlogPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    <PageTransition>
      <ParticleBackground />
      <ScrollProgress />
      <Navbar />
      <div className="relative z-10 min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground text-center mb-4">
              Blog & Research
            </h1>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              Thoughts on cybersecurity, AI, robotics, and the tech cosmos.
            </p>
          </ScrollReveal>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : (
            <StaggerContainer className="space-y-6">
              {posts.map((post) => (
                <motion.div key={post.id} variants={staggerItemVariants}>
                  <GlassCard delay={0} className="p-6 md:p-8 cursor-pointer group hover:bg-primary/5 transition-colors duration-300">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-display font-semibold text-lg md:text-xl text-foreground group-hover:text-primary transition-colors mb-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                      </div>
                      <span className="text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </StaggerContainer>
          )}
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default Blog;
