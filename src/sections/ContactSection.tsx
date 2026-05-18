import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Copy, Loader2, Send, Shield, Sparkles, XCircle } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassPanel from "@/components/GlassPanel";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import SocialLinks from "@/components/SocialLinks";
import { linkedinProfile } from "@/data/linkedinProfile";
import { validateContactForm } from "@/lib/contact";

const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validation = validateContactForm(form);
    if (validation) {
      setError(validation);
      setSuccess(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.submitContact(form);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 4500);
    } catch (submitError: unknown) {
      setError(submitError instanceof Error ? submitError.message : "Transmission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("SONIJEET660@GMAIL.COM");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setError("Clipboard access is blocked. Please copy the email manually.");
    }
  };

  return (
    <section id="contact" className="relative px-4 py-24 md:py-32">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Transmission Terminal"
          title="Let’s talk about the next build"
          subtitle="Use the form if you want to discuss a project, collaboration, or a new product idea. The terminal is designed to feel direct, quiet, and professional."
        />

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <ScrollReveal>
            <GlassPanel className="p-6 md:p-7">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-primary/70">
                <Shield size={12} /> Secure channel
              </div>
              <h3 className="mt-3 text-2xl font-display font-semibold text-foreground">Direct contact</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                I’m open to product work, collaborations, design-sensitive frontend builds, and projects that need clear technical storytelling.
              </p>

              <div className="mt-6 space-y-3 rounded-2xl border border-white/8 bg-black/15 p-4 text-sm text-muted-foreground">
                <div className="flex items-center justify-between gap-4">
                  <span>Response style</span>
                  <span className="text-primary/80">Clear and concise</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Best fit</span>
                  <span className="text-primary/80">Frontend / product / systems</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Status</span>
                  <span className="text-primary/80">Available for discussion</span>
                </div>
              </div>

              <ScrollReveal>
                <SocialLinks className="mt-6 flex flex-wrap justify-start gap-3" />
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span>
                    Direct email: <a href="mailto:SONIJEET660@GMAIL.COM" className="text-primary">SONIJEET660@GMAIL.COM</a>
                  </span>
                  <Button type="button" variant="outline" size="sm" className="h-7 rounded-full border-primary/25 px-3 text-[10px]" onClick={handleCopyEmail}>
                    <Copy size={12} className="mr-1.5" /> {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </ScrollReveal>
            </GlassPanel>
          </ScrollReveal>

          <ScrollReveal>
            <GlassPanel className="p-6 md:p-8">
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
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    className="border-white/10 bg-white/5 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:shadow-[0_0_15px_-3px_hsl(187_100%_50%/0.16)]"
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
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    className="border-white/10 bg-white/5 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:shadow-[0_0_15px_-3px_hsl(187_100%_50%/0.16)]"
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
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                    className="min-h-[140px] border-white/10 bg-white/5 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:shadow-[0_0_15px_-3px_hsl(187_100%_50%/0.16)]"
                    required
                    maxLength={1000}
                  />
                </motion.div>

                <AnimatePresence mode="wait">
                  {error && (
                    <motion.p
                      key={error}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2 text-xs text-destructive"
                    >
                      <XCircle size={12} /> {error}
                    </motion.p>
                  )}
                  {success && !error && (
                    <motion.p
                      key="success"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2 text-xs text-primary"
                    >
                      <CheckCircle size={12} /> Message sent successfully.
                    </motion.p>
                  )}
                </AnimatePresence>

                <div className="flex flex-wrap gap-3">
                  <MagneticButton className="w-full sm:w-auto">
                    <Button
                      type="submit"
                      disabled={loading || success}
                      className="group w-full gap-2 rounded-full bg-primary px-7 text-background hover:bg-primary/90 sm:w-auto"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> Sending...
                        </>
                      ) : success ? (
                        <>
                          <CheckCircle size={16} /> Message Sent
                        </>
                      ) : (
                        <>
                          <Send size={16} /> Send Message
                        </>
                      )}
                    </Button>
                  </MagneticButton>
                  <Button asChild variant="outline" className="rounded-full border-primary/25 bg-transparent text-foreground hover:bg-primary/10">
                    <a href="mailto:SONIJEET660@GMAIL.COM?subject=Portfolio%20Inquiry">Open email client</a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-primary/25 bg-transparent text-foreground hover:bg-primary/10">
                    <a href={linkedinProfile.linkedinUrl} target="_blank" rel="noopener noreferrer">Open LinkedIn</a>
                  </Button>
                </div>

                <div className="rounded-2xl border border-white/8 bg-black/15 p-4 text-sm leading-relaxed text-muted-foreground">
                  <Sparkles className="mb-2 text-primary" size={14} />
                  I usually reply best to messages that explain the problem, the scope, and the expected outcome. That makes it easier to answer with something useful.
                </div>
              </form>
            </GlassPanel>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
