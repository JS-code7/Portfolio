import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";

const Footer = () => (
  <footer className="relative py-12 px-4 border-t border-border/50">
    <div className="neon-line w-full absolute top-0 left-0" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-primary/50 blur-xl" />

    <div className="container mx-auto">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-display font-bold text-gradient-cyan"
        >
          JS
        </motion.div>

        <SocialLinks className="flex items-center gap-3" variant="icon" />

        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          © {new Date().getFullYear()} Jeet Soni. Built with{" "}
          <Heart size={10} className="text-primary animate-pulse-glow" /> and code.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
