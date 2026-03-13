import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const posts = [
  {
    title: "Understanding Neural Network Architectures",
    excerpt: "A deep dive into CNN, RNN, and Transformer architectures and their real-world applications.",
    date: "2025-03-10",
    tags: ["AI", "Deep Learning"],
  },
  {
    title: "Building Secure IoT Systems",
    excerpt: "Best practices for securing embedded systems and IoT networks from common attack vectors.",
    date: "2025-02-28",
    tags: ["Cybersecurity", "IoT"],
  },
  {
    title: "PID Control Algorithms Explained",
    excerpt: "How proportional-integral-derivative controllers work and how to tune them for robotics.",
    date: "2025-02-15",
    tags: ["Robotics", "Control Systems"],
  },
];

const Blog = () => (
  <div className="min-h-screen relative">
    <ParticleBackground />
    <ScrollProgress />
    <Navbar />
    <div className="relative z-10 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionHeading title="Blog & Research" subtitle="Thoughts on technology and innovation" />

        <div className="space-y-6">
          {posts.map((post, i) => (
            <GlassCard key={post.title} delay={i * 0.1} className="p-6 cursor-pointer group">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground shrink-0">{post.date}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Blog;
