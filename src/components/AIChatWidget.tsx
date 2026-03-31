import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const knowledge: Record<string, string> = {
  "who": "Jeet Soni is an aspiring developer from Ahmedabad, Gujarat, India. He's pursuing B.Tech in Computer Engineering at Gujarat Technological University (2024–2028). His focus areas include Cybersecurity, Robotics, Web Development, Electronics, AI, and Automation Systems.",
  "project": "Jeet has built 5 major projects:\n• AI-Based Smart Traffic Assistance System (Python, TensorFlow, OpenCV)\n• Flappy Bird Game in Unreal Engine (C++, Blueprints)\n• UPI Scam Detection Tool (Python, ML)\n• Line Follower Robot (Arduino, PID Control)\n• Obstacle Assist Bot (Arduino, Ultrasonic Sensors)",
  "skill": "Jeet's key skills include Microsoft Azure, Arduino IDE, Data Monitoring, Cybersecurity, Web Development, and AI Fundamentals. He's certified in Azure AI, Oracle Cloud AI, and both Offensive & Defensive Security.",
  "experience": "Jeet currently serves as Associate Professional Service Director at Rotaract Club of New L.J.I.E.T (July 2025 – Present).",
  "certification": "Jeet holds 5 certifications:\n• Microsoft Introduction to Cloud Infrastructure\n• Microsoft Introduction to AI in Azure\n• Oracle Cloud Infrastructure AI Foundations Associate\n• Defensive Security Hacking\n• Offensive Security Certified Professional",
  "contact": "You can reach Jeet via:\n• GitHub: github.com/JS-code7\n• LinkedIn: linkedin.com/in/jeet-soni-01bb09337\n• Or use the Contact form on this portfolio.",
  "education": "Jeet is pursuing a Bachelor of Technology in Computer Engineering at Gujarat Technological University (2024–2028).",
  "navigate": "This portfolio has several pages:\n• Home — overview with all sections\n• About — background and focus areas\n• Projects — mission map and project grid\n• Skills Galaxy — interactive 3D skill visualization\n• Experience — timeline\n• Blog — articles and research\n• Contact — reach out form",
  "default": "I'm Jeet's AI assistant! I can tell you about his projects, skills, experience, certifications, education, or help you navigate the portfolio. What would you like to know?"
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("who") || lower.includes("about") || lower.includes("jeet") || lower.includes("tell me")) return knowledge["who"];
  if (lower.includes("project") || lower.includes("built") || lower.includes("work") || lower.includes("mission")) return knowledge["project"];
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("know")) return knowledge["skill"];
  if (lower.includes("experience") || lower.includes("role") || lower.includes("job")) return knowledge["experience"];
  if (lower.includes("certif") || lower.includes("badge") || lower.includes("certified")) return knowledge["certification"];
  if (lower.includes("contact") || lower.includes("reach") || lower.includes("email") || lower.includes("github") || lower.includes("linkedin")) return knowledge["contact"];
  if (lower.includes("education") || lower.includes("university") || lower.includes("study") || lower.includes("degree")) return knowledge["education"];
  if (lower.includes("navigate") || lower.includes("page") || lower.includes("section") || lower.includes("where") || lower.includes("find")) return knowledge["navigate"];
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return "Hey there! 👋 I'm Jeet's AI assistant. Ask me anything about his projects, skills, or experience!";
  return knowledge["default"];
}

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! I'm Jeet's AI assistant. Ask me about his projects, skills, experience, or anything else! 🚀" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setTyping(true);

    setTimeout(() => {
      const response = getResponse(userMsg);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ boxShadow: "0 0 30px hsl(187 100% 50% / 0.4)" }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] max-h-[500px] rounded-2xl overflow-hidden glass-strong glow-border flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/50 flex items-center gap-3 scanline">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-display font-semibold text-foreground terminal-glow">AI Assistant</h3>
                <p className="text-[10px] text-primary font-mono terminal-glow">Online • Ask me anything</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[340px]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                      <Bot size={12} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary/80 text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1">
                      <User size={12} className="text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot size={12} className="text-primary" />
                  </div>
                  <div className="bg-secondary/80 px-3 py-2 rounded-xl rounded-bl-sm flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-primary/60"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Jeet..."
                  className="flex-1 bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  maxLength={300}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"
                >
                  <Send size={14} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
