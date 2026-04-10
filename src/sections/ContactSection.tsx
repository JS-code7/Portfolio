import { useState } from "react";
import { CheckCircle, Loader2, Send } from "lucide-react";
import { api } from "@/lib/api";
import SectionHeader from "@/components/mission/SectionHeader";
import GlassPanel from "@/components/mission/GlassPanel";
import SocialLinks from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please complete all fields.");
      return;
    }

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
      setTimeout(() => setSuccess(false), 4500);
    } catch (submitError: unknown) {
      setError(submitError instanceof Error ? submitError.message : "Transmission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative px-4 py-20 md:py-28">
      <div className="container mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="Transmission Terminal"
          title="Open a direct engineering channel"
          subtitle="Share your project context, constraints, and expected impact — I’ll respond with a practical build strategy."
        />

        <GlassPanel className="p-5 md:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <SocialLinks className="flex flex-wrap gap-3" />
            <p className="font-mono text-xs text-muted-foreground">
              Direct channel: <a href="mailto:SONIJEET660@GMAIL.COM" className="text-primary hover:text-primary/80">SONIJEET660@GMAIL.COM</a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                placeholder="Your name"
                value={form.name}
                onChange={(event) => setForm((previous) => ({ ...previous, name: event.target.value }))}
                maxLength={100}
                required
              />
              <Input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(event) => setForm((previous) => ({ ...previous, email: event.target.value }))}
                maxLength={255}
                required
              />
            </div>
            <Textarea
              placeholder="Mission briefing: problem, timeline, desired outcome"
              value={form.message}
              onChange={(event) => setForm((previous) => ({ ...previous, message: event.target.value }))}
              maxLength={1000}
              className="min-h-[130px]"
              required
            />

            {error ? <p className="text-xs text-destructive">{error}</p> : null}

            <Button type="submit" disabled={loading || success} className="w-full">
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Sending transmission...
                </>
              ) : success ? (
                <>
                  <CheckCircle size={14} /> Transmission received
                </>
              ) : (
                <>
                  <Send size={14} /> Send message
                </>
              )}
            </Button>
          </form>
        </GlassPanel>
      </div>
    </section>
  );
};

export default ContactSection;
