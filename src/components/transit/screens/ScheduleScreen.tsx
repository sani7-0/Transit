import { X, ChevronLeft, ChevronRight, Clock, AlertCircle, CheckCircle, Zap } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Screen } from "@/pages/Index";
import { useRoutes, formatRouteColor } from "@/hooks/useApi";

interface ScheduleScreenProps {
  onNavigate: (screen: Screen) => void;
}

const ScheduleScreen = ({ onNavigate }: ScheduleScreenProps) => {
  // Fetch routes from backend
  const { data: routesData, isLoading, error } = useRoutes();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Generate schedule data from real routes
  const generateScheduleData = () => {
    if (!routesData?.routes) return [];
    
    return routesData.routes.slice(0, 10).map((route) => {
      // Generate schedule blocks with realistic times
      const now = new Date();
      const scheduleBlocks = [];
      
      // Generate "Upcoming" times (next 2 hours)
      const upcomingTimes = [];
      for (let i = 0; i < 3; i++) {
        const nextTime = new Date(now);
        nextTime.setMinutes(now.getMinutes() + (i * 12) + Math.floor(Math.random() * 5));
        const timeStr = nextTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        const etaMinutes = i === 0 ? Math.floor(Math.random() * 5) + 1 : (i * 12) + Math.floor(Math.random() * 8);
        
        upcomingTimes.push({
          time: timeStr,
          eta: i < 2 ? `${etaMinutes} min` : undefined,
          status: i === 0 ? "arriving" : (Math.random() > 0.8 ? "delayed" : "on-time")
        });
      }
      
      // Generate "Later today" times (3-6 hours from now)
      const laterTimes = [];
      for (let i = 0; i < 3; i++) {
        const laterTime = new Date(now);
        laterTime.setHours(now.getHours() + 3 + i);
        laterTime.setMinutes(Math.floor(Math.random() * 60));
        const timeStr = laterTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        
        laterTimes.push({
          time: timeStr,
          status: Math.random() > 0.85 ? "delayed" : "on-time"
        });
      }
      
      scheduleBlocks.push(
        { label: "Upcoming", times: upcomingTimes },
        { label: "Later today", times: laterTimes }
      );
      
      return {
        id: route.route_id,
        number: route.route_short_name || route.route_id.slice(-3),
        type: "bus",
        direction: route.route_long_name?.split("↔")[0]?.trim() || "Addis Ababa",
        destination: route.route_long_name || "Addis Ababa",
        color: formatRouteColor(route.route_color),
        schedule: scheduleBlocks
      };
    });
  };

  const routes = useMemo(() => generateScheduleData(), [routesData?.routes]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p className="text-muted-foreground">Loading schedule...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <h2 className="text-xl font-bold mb-2">Connection Error</h2>
        <p className="text-muted-foreground text-center mb-4">
          Unable to load schedule data. Please check your connection and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Retry
        </button>
        <button
          onClick={() => onNavigate("nearby")}
          className="mt-2 px-4 py-2 bg-muted text-foreground rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!routes.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <Clock className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold mb-2">No Schedule Data</h2>
        <p className="text-muted-foreground text-center mb-4">
          No routes available. Please try again later.
        </p>
        <button
          onClick={() => onNavigate("nearby")}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const route = routes[currentIndex];
  const color = route.color;

  const goTo = (i: number) => {
    setCurrentIndex(i);
  };
  
  const prev = () => { setCurrentIndex((i) => (i - 1 + routes.length) % routes.length); };
  const next = () => { setCurrentIndex((i) => (i + 1) % routes.length); };

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
                {route.direction}
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
          <div className="flex gap-1.5 flex-1 justify-center overflow-x-auto">
            {routes.slice(0, 5).map((r, i) => (
              <motion.button
                key={r.id}
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
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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

              {/* Times */}
              {block.times.map((t, i) => (
                <motion.div
                  key={i}
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