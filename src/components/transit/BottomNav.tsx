import { Map, Search, Clock, Route, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Screen } from "@/pages/Index";

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNav = ({ currentScreen, onNavigate }: BottomNavProps) => {
  const items: { icon: typeof Map; label: string; screen: Screen }[] = [
    { icon: Map, label: "Nearby", screen: "nearby" },
    { icon: Search, label: "Search", screen: "search" },
    { icon: Route, label: "Planner", screen: "planner" },
    { icon: Clock, label: "Schedule", screen: "schedule" },
  ];

  return (
    <div className="flex items-center justify-around py-2 pb-4 bg-card border-t border-border/50 shrink-0 relative">
      {items.map((item) => {
        const isActive = currentScreen === item.screen;
        const Icon = item.icon;
        return (
          <motion.button
            key={item.label}
            onClick={() => onNavigate(item.screen)}
            className="flex flex-col items-center gap-0.5 px-4 py-1 relative"
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.05 }}
          >
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-2xl bg-primary/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </AnimatePresence>
            <motion.div
              animate={{ y: isActive ? -2 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Icon
                className={`w-5 h-5 relative z-10 transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground"}`}
              />
            </motion.div>
            <motion.span
              className={`text-[10px] font-bold font-display relative z-10 transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground"}`}
              animate={{ opacity: isActive ? 1 : 0.7 }}
            >
              {item.label}
            </motion.span>
          </motion.button>
        );
      })}

      {/* GO button */}
      <motion.button
        onClick={() => onNavigate("nearby")}
        className="w-12 h-12 -mt-8 rounded-2xl bg-primary shadow-lg flex items-center justify-center relative z-20"
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.1 }}
        initial={{ y: 0 }}
        animate={{ y: [0, -3, 0] }}
        transition={{ 
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          scale: { duration: 0.15 }
        }}
        style={{ boxShadow: "0 4px 20px -4px hsl(var(--primary) / 0.5)" }}
      >
        <Navigation className="w-5 h-5 text-primary-foreground" fill="currentColor" />
      </motion.button>
    </div>
  );
};

export default BottomNav;
