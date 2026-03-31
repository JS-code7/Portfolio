import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills Galaxy", href: "/skills-galaxy" },
  { label: "Experience", href: "/experience" },
  { label: "Blog", href: "/blog" },
  { label: "Analytics", href: "/analytics" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-40 glass-strong scanline"
    >
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="group">
          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl font-display font-bold text-gradient-cyan inline-block"
          >
            JS
          </motion.span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`relative text-sm px-3 py-1.5 rounded-lg transition-colors duration-200 ${
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.label}
              {location.pathname === item.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {/* Hover underline */}
              <motion.div
                className="absolute bottom-0 left-1/2 h-px bg-primary -translate-x-1/2"
                initial={{ width: 0 }}
                whileHover={{ width: "60%" }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-sm py-2.5 px-3 rounded-lg transition-colors ${
                      location.pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
