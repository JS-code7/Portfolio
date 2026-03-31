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
import { api, type BlogPost as BlogPostType } from "@/lib/api";
import { ArrowLeft, Calendar, Clock, Loader2 } from "lucide-react";

const blogContent: Record<string, string> = {
  "intro-to-cybersecurity": `Cybersecurity is no longer optional — it's a necessity in today's hyper-connected world. From ransomware attacks on hospitals to nation-state hacking campaigns, the threat landscape is evolving faster than ever.\n\nIn this guide, we cover the fundamentals every aspiring security professional needs:\n\n**1. Understanding the CIA Triad**\nConfidentiality, Integrity, and Availability form the bedrock of information security.\n\n**2. Common Attack Vectors**\n• Phishing & Social Engineering\n• SQL Injection & XSS\n• Man-in-the-Middle Attacks\n• Zero-Day Exploits\n\n**3. Essential Tools**\n• Wireshark for network analysis\n• Burp Suite for web app testing\n• Nmap for network scanning\n• Metasploit for penetration testing\n\n**4. Getting Certified**\nStart with CompTIA Security+, then move to CEH or OSCP depending on your path.\n\nThe most important skill? Curiosity. Never stop exploring, never stop learning.`,
  "building-robots-arduino": `Building autonomous robots with Arduino is one of the most rewarding experiences for any maker. In this tutorial, we'll walk through creating two classic robots.\n\n**Part 1: Line Follower Robot**\n\nComponents needed:\n• Arduino Uno\n• IR sensors (x3)\n• L298N motor driver\n• DC motors with wheels\n• Chassis\n\nThe key to a good line follower is PID control. Instead of simple on/off switching, PID smoothly adjusts motor speeds based on how far off-center the robot is.\n\n**Part 2: Obstacle Avoidance Bot**\n\nUpgrade your robot with ultrasonic sensors:\n• HC-SR04 ultrasonic sensor\n• Servo motor for sensor rotation\n• Decision-making algorithm\n\nThe bot continuously scans its environment, building a simple map of obstacles and choosing the clearest path forward.\n\n**Pro Tips:**\n• Always calibrate your sensors before running\n• Use smooth PWM transitions for natural movement\n• Add LED indicators for debugging states`,
  "ai-azure-fundamentals": `Microsoft Azure offers a comprehensive suite of AI services that make it possible to add intelligence to any application.\n\n**Azure Cognitive Services**\n\n• **Vision**: Image classification, object detection, OCR\n• **Language**: Sentiment analysis, key phrase extraction, translation\n• **Speech**: Speech-to-text, text-to-speech, speaker recognition\n• **Decision**: Anomaly detection, content moderation, personalizer\n\n**Getting Started**\n\n1. Create an Azure account (free tier available)\n2. Set up a Cognitive Services resource\n3. Get your API key and endpoint\n4. Start making API calls\n\n**Real-World Application**\n\nI used Azure Computer Vision in my Smart Traffic System to detect vehicle density at intersections, enabling real-time signal optimization.\n\n**Azure Machine Learning Studio**\n\nFor custom models, Azure ML Studio provides a drag-and-drop interface alongside code-first notebooks. Perfect for experimenting with algorithms before deploying to production.`,
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBlogPosts().then((posts) => {
      const found = posts.find((p) => p.slug === slug) || null;
      setPost(found);
      setLoading(false);
    });
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

  if (!post) {
    return (
      <PageTransition>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-display font-bold text-foreground">Post Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline text-sm">← Back to Blog</Link>
        </div>
      </PageTransition>
    );
  }

  const content = blogContent[post.slug] || "Full article coming soon. Stay tuned!";

  return (
    <PageTransition>
      <ParticleBackground />
      <ScrollProgress />
      <Navbar />
      <div className="relative z-10 min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Blog
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary/80">{tag}</span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-gradient-cyan mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <GlassCard tilt={false} className="p-6 md:p-10">
              <div className="prose prose-invert prose-sm max-w-none">
                {content.split("\n\n").map((paragraph, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {paragraph.startsWith("**") && paragraph.endsWith("**") ? (
                      <h3 className="text-lg font-display font-semibold text-foreground mt-6 mb-3">
                        {paragraph.replace(/\*\*/g, "")}
                      </h3>
                    ) : paragraph.includes("• ") ? (
                      <ul className="space-y-1 mb-4">
                        {paragraph.split("\n").map((line, j) => (
                          <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                            {line.startsWith("• ") ? (
                              <>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                <span>{line.replace("• ", "")}</span>
                              </>
                            ) : (
                              <span className="font-semibold text-foreground">{line.replace(/\*\*/g, "")}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {paragraph.split("**").map((part, j) =>
                          j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part
                        )}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default BlogPostPage;
