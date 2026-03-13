import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, Mail, Linkedin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setLoading(true);
    // Placeholder for backend integration
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-2xl">
        <SectionHeading title="Get in Touch" subtitle="Let's connect and build something great" />

        <div className="flex justify-center gap-4 mb-8">
          <a
            href="mailto:contact@jeetsoni.dev"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail size={16} /> Email
          </a>
          <a
            href="https://linkedin.com/in/jeetsoni"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>

        <GlassCard tilt={false} className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-secondary/50 border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
                required
                maxLength={100}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-secondary/50 border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
                required
                maxLength={255}
              />
            </div>
            <div>
              <Textarea
                placeholder="Your message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="bg-secondary/50 border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground min-h-[120px]"
                required
                maxLength={1000}
              />
            </div>
            <Button
              type="submit"
              disabled={loading || success}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display gap-2"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Sending...</>
              ) : success ? (
                <><CheckCircle size={16} /> Message Sent!</>
              ) : (
                <><Send size={16} /> Send Message</>
              )}
            </Button>
          </form>
        </GlassCard>
      </div>
    </section>
  );
};

export default ContactSection;
