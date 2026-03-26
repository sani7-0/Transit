import { X, ChevronLeft, ChevronRight, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Screen } from "@/pages/Index";

interface RouteSchedule {
  number: string;
  type: "bus" | "metro";
  direction: string;
  destination: string;
  color: string;
  schedule: {
    label: string;
    times: { time: string; eta?: string; status?: "on-time" | "delayed" | "arriving" }[];
  }[];
}

const routes: RouteSchedule[] = [
  {
    number: "55",
    type: "bus",
    direction: "North",
    destination: "Station Saint-Laurent",
    color: "hsl(152,60%,32%)",
    schedule: [
      {
        label: "Now",
        times: [
          { time: "9:14 AM", eta: "3 min", status: "arriving" },
          { time: "9:22 AM", eta: "11 min", status: "on-time" },
          { time: "9:30 AM", eta: "19 min", status: "on-time" },
        ],
      },
      {
        label: "Later",
        times: [
          { time: "9:38 AM", status: "on-time" },
          { time: "9:50 AM", status: "on-time" },
          { time: "10:05 AM", status: "on-time" },
        ],
      },
    ],
  },
  {
    number: "51",
    type: "bus",
    direction: "West",
    destination: "Édouard-Montpetit",
    color: "hsl(268,50%,40%)",
    schedule: [
      {
        label: "Now",
        times: [
          { time: "9:11 AM", eta: "0 min", status: "arriving" },
          { time: "9:19 AM", eta: "8 min", status: "on-time" },
          { time: "9:25 AM", eta: "14 min", status: "delayed" },
        ],
      },
      {
        label: "Later",
        times: [
          { time: "9:34 AM", status: "on-time" },
          { time: "9:43 AM", status: "on-time" },
          { time: "9:52 AM", status: "on-time" },
        ],
      },
    ],
  },
  {
    number: "15",
    type: "bus",
    direction: "West",
    destination: "De Maisonneuve / No 205",
    color: "hsl(210,75%,45%)",
    schedule: [
      {
        label: "Now",
        times: [
          { time: "9:18 AM", eta: "7 min", status: "on-time" },
          { time: "9:28 AM", eta: "17 min", status: "on-time" },
        ],
      },
      {
        label: "Later",
        times: [
          { time: "9:38 AM", status: "on-time" },
          { time: "9:55 AM", status: "delayed" },
          { time: "10:10 AM", status: "on-time" },
        ],
      },
    ],
  },
];

interface ScheduleScreenProps {
  onNavigate: (screen: Screen) => void;
}

const ScheduleScreen = ({ onNavigate }: ScheduleScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const route = routes[currentIndex];

  const goTo = (i: number) => {
    setDirection(i > currentIndex ? 1 : -1);
    setCurrentIndex(i);
  };
  const prev = () => { setDirection(-1); setCurrentIndex((i) => (i - 1 + routes.length) % routes.length); };
  const next = () => { setDirection(1); setCurrentIndex((i) => (i + 1) % routes.length); };

  const statusColor = (status?: string) => {
    if (status === "arriving") return route.color;
    if (status === "delayed") return "hsl(0,70%,48%)";
    return "hsl(var(--muted-foreground))";
  };

  const statusLabel = (status?: string) => {
    if (status === "arriving") return "Arriving";
    if (status === "delayed") return "Delayed";
    return "On time";
  };

  return (
    <div className="flex flex-col min-h-full bg-card">
      {/* Header */}
      <div className="px-5 pt-6 pb-4" style={{ backgroundColor: route.color }}>
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[52px] font-extrabold text-white font-display leading-none">
              {route.number}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[11px] font-bold text-white/90 bg-white/15 rounded-full px-2 py-0.5">
                ⊕ {route.direction}
              </span>
            </div>
            <span className="text-sm font-semibold text-white/80 mt-1 block">
              {route.destination}
            </span>
          </div>
          <button
            onClick={() => onNavigate("nearby")}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mt-2"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Route switcher pills */}
        <div className="flex items-center gap-2 mt-4">
          <button onClick={prev} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex gap-1.5 flex-1 justify-center">
            {routes.map((r, i) => (
              <motion.button
                key={r.number}
                onClick={() => goTo(i)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-display transition-all ${
                  i === currentIndex
                    ? "bg-white text-foreground shadow-sm"
                    : "bg-white/20 text-white"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {r.number}
              </motion.button>
            ))}
          </div>
          <button onClick={next} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Schedule content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ x: direction > 0 ? 80 : -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? -80 : 80, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col px-4 py-4 gap-4"
        >
          {route.schedule.map((block) => (
            <div key={block.label} className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30" style={{ borderLeftWidth: 4, borderLeftColor: route.color }}>
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-bold text-foreground uppercase tracking-wide">{block.label}</span>
              </div>

              {block.times.map((t, i) => (
                <motion.div
                  key={t.time}
                  className="flex items-center justify-between px-4 py-3 border-b border-border/20 last:border-b-0"
                  whileTap={{ backgroundColor: "hsl(var(--muted))" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-foreground font-display w-20">{t.time}</span>
                    {t.eta && (
                      <span
                        className="text-xs font-extrabold font-display px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${route.color}18`,
                          color: route.color,
                        }}
                      >
                        {t.eta}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {t.status === "delayed" && <AlertCircle className="w-3 h-3" style={{ color: statusColor(t.status) }} />}
                    <span
                      className="text-[11px] font-bold"
                      style={{ color: statusColor(t.status) }}
                    >
                      {statusLabel(t.status)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ScheduleScreen;
