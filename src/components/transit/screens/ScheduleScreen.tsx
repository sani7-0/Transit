import { X, ChevronLeft, ChevronRight, Clock, AlertCircle, CheckCircle, Zap } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Screen } from "@/pages/Index";

interface RouteSchedule {
  number: string;
  type: "bus" | "metro";
  direction: string;
  destination: string;
  colorVar: string;
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
    colorVar: "--route-green",
    schedule: [
      {
        label: "Upcoming",
        times: [
          { time: "9:14 AM", eta: "3 min", status: "arriving" },
          { time: "9:22 AM", eta: "11 min", status: "on-time" },
          { time: "9:30 AM", eta: "19 min", status: "on-time" },
        ],
      },
      {
        label: "Later today",
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
    colorVar: "--route-purple",
    schedule: [
      {
        label: "Upcoming",
        times: [
          { time: "9:11 AM", eta: "0 min", status: "arriving" },
          { time: "9:19 AM", eta: "8 min", status: "on-time" },
          { time: "9:25 AM", eta: "14 min", status: "delayed" },
        ],
      },
      {
        label: "Later today",
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
    colorVar: "--route-blue",
    schedule: [
      {
        label: "Upcoming",
        times: [
          { time: "9:18 AM", eta: "7 min", status: "on-time" },
          { time: "9:28 AM", eta: "17 min", status: "on-time" },
        ],
      },
      {
        label: "Later today",
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
  const color = `hsl(var(${route.colorVar}))`;

  const goTo = (i: number) => {
    setDirection(i > currentIndex ? 1 : -1);
    setCurrentIndex(i);
  };
  const prev = () => { setDirection(-1); setCurrentIndex((i) => (i - 1 + routes.length) % routes.length); };
  const next = () => { setDirection(1); setCurrentIndex((i) => (i + 1) % routes.length); };

  const StatusIcon = ({ status }: { status?: string }) => {
    if (status === "arriving") return <Zap className="w-3.5 h-3.5" style={{ color }} />;
    if (status === "delayed") return <AlertCircle className="w-3.5 h-3.5 text-destructive" />;
    return <CheckCircle className="w-3.5 h-3.5 text-muted-foreground" />;
  };

  const statusLabel = (status?: string) => {
    if (status === "arriving") return "Arriving";
    if (status === "delayed") return "Delayed";
    return "On time";
  };

  const statusTextColor = (status?: string) => {
    if (status === "arriving") return color;
    if (status === "delayed") return "hsl(var(--destructive))";
    return "hsl(var(--muted-foreground))";
  };

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Header */}
      <div className="px-5 pt-6 pb-5" style={{ backgroundColor: color }}>
        <div className="flex items-start justify-between">
          <div>
            <motion.span
              key={route.number}
              className="text-[56px] font-extrabold text-white font-display leading-none"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {route.number}
            </motion.span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[11px] font-bold text-white/90 bg-white/20 rounded-full px-2 py-0.5">
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

        {/* Route switcher */}
        <div className="flex items-center gap-2 mt-4">
          <button onClick={prev} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex gap-1.5 flex-1 justify-center">
            {routes.map((r, i) => (
              <motion.button
                key={r.number}
                onClick={() => goTo(i)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold font-display transition-all ${
                  i === currentIndex
                    ? "bg-white text-foreground shadow-md"
                    : "bg-white/20 text-white"
                }`}
                whileTap={{ scale: 0.95 }}
                layout
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
          initial={{ x: direction > 0 ? 60 : -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? -60 : 60, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col px-4 py-5 gap-4"
        >
          {route.schedule.map((block) => (
            <div key={block.label} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50">
              {/* Block header */}
              <div
                className="flex items-center gap-2 px-4 py-3.5"
                style={{ borderLeft: `4px solid ${color}` }}
              >
                <Clock className="w-4 h-4" style={{ color }} />
                <span className="text-sm font-extrabold text-foreground uppercase tracking-wide">{block.label}</span>
                <span className="text-xs text-muted-foreground ml-auto">{block.times.length} departures</span>
              </div>

              {/* Times — larger, more whitespace */}
              {block.times.map((t, i) => (
                <motion.div
                  key={t.time}
                  className="flex items-center justify-between px-4 py-4 border-t border-border/30"
                  whileTap={{ scale: 0.98, backgroundColor: "hsl(var(--muted))" }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-foreground font-display w-24">{t.time}</span>
                    {t.eta && (
                      <motion.span
                        className="text-sm font-extrabold font-display px-3 py-1.5 rounded-full"
                        style={{
                          backgroundColor: t.status === "arriving" ? color : `${color}18`,
                          color: t.status === "arriving" ? "white" : color,
                        }}
                        animate={t.status === "arriving" ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        {t.eta}
                      </motion.span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <StatusIcon status={t.status} />
                    <span
                      className="text-xs font-bold"
                      style={{ color: statusTextColor(t.status) }}
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
