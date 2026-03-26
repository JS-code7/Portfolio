import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socialLinks = [
  { href: "mailto:contact@jeetsoni.dev", icon: Mail, label: "Email" },
  { href: "https://linkedin.com/in/jeetsoni", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/jeetsoni", icon: Github, label: "GitHub" },
];

const Footer = () => (
  <footer className="relative py-12 px-4 border-t border-border/50">
    <div className="neon-line w-full absolute top-0 left-0" />

    {/* Glow effect */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-primary/50 blur-xl" />

    <div className="container mx-auto">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-display font-bold text-gradient-cyan"
        >
          JS
        </motion.div>

        {/* Social links */}
        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-secondary/50 border border-border/50 hover:border-primary/30 hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
            >
              <link.icon size={16} />
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          © {new Date().getFullYear()} Jeet Soni. Built with{" "}
          <Heart size={10} className="text-primary animate-pulse-glow" /> and code.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
