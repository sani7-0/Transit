import { X, Accessibility, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Screen } from "@/pages/Index";

interface RouteSchedule {
  number: string;
  direction: string;
  destination: string;
  color: string;
  currentTimes: string[];
  nextTimes: string[];
}

const routes: RouteSchedule[] = [
  {
    number: "51",
    direction: "West",
    destination: "Édouard-Montpetit / Woodbury",
    color: "hsl(262,35%,42%)",
    currentTimes: ["9:11 AM", "9:19 AM", "9:25 AM", "9:34 AM", "9:43 AM", "9:52 AM"],
    nextTimes: ["10:08 AM", "10:24 AM", "10:40 AM", "10:56 AM"],
  },
  {
    number: "55",
    direction: "North",
    destination: "Station Saint-Laurent / de Maisonneuve",
    color: "hsl(158,42%,38%)",
    currentTimes: ["9:05 AM", "9:14 AM", "9:22 AM", "9:30 AM", "9:38 AM"],
    nextTimes: ["9:50 AM", "10:05 AM", "10:20 AM"],
  },
  {
    number: "15",
    direction: "West",
    destination: "De Maisonneuve / No 205",
    color: "hsl(205,65%,48%)",
    currentTimes: ["9:08 AM", "9:18 AM", "9:28 AM", "9:38 AM"],
    nextTimes: ["9:55 AM", "10:10 AM", "10:25 AM", "10:40 AM"],
  },
];

interface ScheduleScreenProps {
  onNavigate: (screen: Screen) => void;
}

const ScheduleScreen = ({ onNavigate }: ScheduleScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const route = routes[currentIndex];

  const prev = () => setCurrentIndex((i) => (i - 1 + routes.length) % routes.length);
  const next = () => setCurrentIndex((i) => (i + 1) % routes.length);

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: route.color }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-start justify-between">
        <div>
          <span className="text-[56px] font-extrabold text-card-foreground font-display leading-none">
            {route.number}
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[11px] font-bold text-card-foreground/90 bg-card/15 rounded-full px-2 py-0.5">
              ⊕ {route.direction}
            </span>
          </div>
          <span className="text-sm font-semibold text-card-foreground/80 mt-1 block">
            {route.destination}
          </span>
        </div>
        <button
          onClick={() => onNavigate("nearby")}
          className="w-8 h-8 rounded-full bg-card/20 flex items-center justify-center mt-2"
        >
          <X className="w-4 h-4 text-card-foreground" />
        </button>
      </div>

      {/* Route switcher */}
      <div className="px-5 pb-3 flex items-center gap-2">
        <button onClick={prev} className="w-7 h-7 rounded-full bg-card/20 flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-card-foreground" />
        </button>
        <div className="flex gap-1.5 flex-1 justify-center">
          {routes.map((r, i) => (
            <button
              key={r.number}
              onClick={() => setCurrentIndex(i)}
              className={`px-3 py-1 rounded-full text-xs font-bold font-display transition-all ${
                i === currentIndex
                  ? "bg-card text-foreground"
                  : "bg-card/20 text-card-foreground"
              }`}
            >
              {r.number}
            </button>
          ))}
        </div>
        <button onClick={next} className="w-7 h-7 rounded-full bg-card/20 flex items-center justify-center">
          <ChevronRight className="w-4 h-4 text-card-foreground" />
        </button>
      </div>

      {/* Schedule blocks */}
      <div className="px-4 pb-6 flex flex-col gap-3">
        <div className="bg-card rounded-2xl overflow-hidden">
          <div className="h-1" style={{ backgroundColor: route.color }} />
          <div className="p-3 flex flex-col gap-0">
            {route.currentTimes.map((time, i) => (
              <div key={time} className={`py-2.5 px-2 rounded-lg ${i === 1 || i === 2 ? "font-extrabold" : ""}`}>
                <div className="flex items-center gap-1.5">
                  {i === 1 && <span style={{ color: route.color }} className="text-xs">▸</span>}
                  <span
                    className={`text-sm font-display ${
                      i === 1 ? "font-extrabold text-foreground" : i === 2 ? "font-bold" : "font-semibold text-muted-foreground"
                    }`}
                    style={i === 2 ? { color: route.color } : undefined}
                  >
                    {time}
                  </span>
                  {(i === 1 || i === 2) && (
                    <span className="text-[7px] font-bold mb-1" style={{ color: route.color, opacity: 0.6 }}>ᐩ</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl overflow-hidden">
          <div className="h-1" style={{ backgroundColor: route.color }} />
          <div className="p-3 flex flex-col gap-0">
            {route.nextTimes.map((time) => (
              <div key={time} className="py-2.5 px-2">
                <span className="text-sm font-semibold text-muted-foreground font-display">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pb-6 mt-auto flex justify-end">
        <button className="w-10 h-10 rounded-full bg-card/20 flex items-center justify-center">
          <Accessibility className="w-5 h-5 text-card-foreground" />
        </button>
      </div>
    </div>
  );
};

export default ScheduleScreen;
