import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

const socialLinks = [
  { href: "mailto:SONIJEET660@GMAIL.COM", icon: Mail, label: "Email" },
  { href: "https://www.linkedin.com/in/jeet-soni-01bb09337/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/JS-code7", icon: Github, label: "GitHub" },
];

interface SocialLinksProps {
  className?: string;
  variant?: "pill" | "icon";
}

const SocialLinks = ({ className = "", variant = "pill" }: SocialLinksProps) => (
  <div className={className}>
    {socialLinks.map((link) => {
      const isExternal = link.href.startsWith("http") || link.href.startsWith("mailto:");
      return (
        <motion.a
          key={link.label}
          href={link.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className={
            variant === "icon"
              ? "w-10 h-10 rounded-full bg-secondary/50 border border-border/50 hover:border-primary/30 hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
              : "group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-full bg-secondary/50 border border-border/50 hover:border-primary/30"
          }
          aria-label={link.label}
        >
          <link.icon size={16} />
          {variant === "pill" && <span>{link.label}</span>}
        </motion.a>
      );
    })}
  </div>
);

export default SocialLinks;
