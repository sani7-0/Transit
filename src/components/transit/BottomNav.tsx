import { Map, Search, Clock } from "lucide-react";
import type { Screen } from "@/pages/Index";

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNav = ({ currentScreen, onNavigate }: BottomNavProps) => {
  const items: { icon: typeof Map; label: string; screen: Screen }[] = [
    { icon: Map, label: "Nearby", screen: "nearby" },
    { icon: Search, label: "Search", screen: "search" },
    { icon: Clock, label: "Schedule", screen: "schedule" },
  ];

  return (
    <div className="flex items-center justify-around py-2 pb-4 bg-card border-t border-border/50 shrink-0">
      {items.map((item) => {
        const isActive = currentScreen === item.screen;
        return (
          <button
            key={item.label}
            onClick={() => onNavigate(item.screen)}
            className="flex flex-col items-center gap-0.5 px-4 py-1"
          >
            <item.icon
              className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
            />
            <span
              className={`text-[10px] font-bold font-display ${isActive ? "text-primary" : "text-muted-foreground"}`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
