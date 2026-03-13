import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="relative py-8 px-4 border-t border-border">
    <div className="neon-line w-full absolute top-0 left-0" />
    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Jeet Soni. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <a href="mailto:contact@jeetsoni.dev" className="text-muted-foreground hover:text-primary transition-colors">
          <Mail size={16} />
        </a>
        <a href="https://linkedin.com/in/jeetsoni" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Linkedin size={16} />
        </a>
        <a href="https://github.com/jeetsoni" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Github size={16} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
