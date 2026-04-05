import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import SocialLinks from "@/components/SocialLinks";

const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.submitContact(form);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-2xl">
        <SectionHeading title="Get in Touch" subtitle="Let's connect and build something great" />

        <ScrollReveal>
          <SocialLinks className="flex justify-center flex-wrap gap-4 mb-8" />
          <p className="text-center text-xs text-muted-foreground font-mono mb-4">
            Direct email:{" "}
            <a
              href="mailto:SONIJEET660@GMAIL.COM"
              className="text-primary hover:underline"
            >
              SONIJEET660@GMAIL.COM
            </a>
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <GlassCard tilt={false} className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Input
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-secondary/50 border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:shadow-[0_0_15px_-3px_hsl(187_100%_50%/0.2)]"
                  required
                  maxLength={100}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Input
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-secondary/50 border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:shadow-[0_0_15px_-3px_hsl(187_100%_50%/0.2)]"
                  required
                  maxLength={255}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Textarea
                  placeholder="Your message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-secondary/50 border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground min-h-[120px] transition-all duration-300 focus:shadow-[0_0_15px_-3px_hsl(187_100%_50%/0.2)]"
                  required
                  maxLength={1000}
                />
              </motion.div>

              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}

              <MagneticButton className="w-full">
                <Button
                  type="submit"
                  disabled={loading || success}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display gap-2 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending...</>
                  ) : success ? (
                    <><CheckCircle size={16} /> Message Sent!</>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </Button>
              </MagneticButton>
            </form>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
