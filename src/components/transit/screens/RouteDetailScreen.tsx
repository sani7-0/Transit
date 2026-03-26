import { X, Pin, Star, Users, ChevronRight, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import type { Screen, RouteId } from "@/pages/Index";
import ETACountdown from "@/components/transit/ETACountdown";

interface RouteDetailScreenProps {
  onNavigate: (screen: Screen) => void;
  selectedRoute: RouteId;
}

const routeData: Record<RouteId, {
  number: string;
  direction: string;
  destination: string;
  colorVar: string;
  etas: number[];
  rating: number;
  crowding: number;
  frequency: string;
  nextAt: string;
  stops: { name: string; time: string; routes: string[]; isTransfer?: boolean }[];
}> = {
  "55": {
    number: "55",
    direction: "North",
    destination: "Station Saint-Laurent",
    colorVar: "--route-green",
    etas: [3, 12, 19],
    rating: 4.5,
    crowding: 72,
    frequency: "Every 8 min",
    nextAt: "de Maisonneuve / Saint-Laurent",
    stops: [
      { name: "de Maisonneuve / Saint-Laurent", time: "9:14 AM", routes: ["51", "80"], isTransfer: true },
      { name: "Sherbrooke / Saint-Laurent", time: "9:18 AM", routes: ["24"] },
      { name: "Mont-Royal / Saint-Laurent", time: "9:22 AM", routes: ["97"], isTransfer: true },
      { name: "Laurier / Saint-Laurent", time: "9:25 AM", routes: [] },
      { name: "Saint-Viateur / Saint-Laurent", time: "9:28 AM", routes: [] },
    ],
  },
  metro2: {
    number: "2",
    direction: "Côte-Vertu",
    destination: "Station Berri-UQAM",
    colorVar: "--route-purple",
    etas: [2, 6, 10],
    rating: 4.7,
    crowding: 86,
    frequency: "Every 4 min",
    nextAt: "Berri-UQAM",
    stops: [
      { name: "Berri-UQAM", time: "9:11 AM", routes: ["1", "4"], isTransfer: true },
      { name: "Jean-Talon", time: "9:18 AM", routes: ["5"], isTransfer: true },
      { name: "Côte-Vertu", time: "9:28 AM", routes: [] },
    ],
  },
  "15": {
    number: "15",
    direction: "West",
    destination: "De Maisonneuve / No 205",
    colorVar: "--route-blue",
    etas: [5, 14, 22],
    rating: 4.2,
    crowding: 58,
    frequency: "Every 10 min",
    nextAt: "de Maisonneuve / Parc",
    stops: [
      { name: "de Maisonneuve / Parc", time: "9:16 AM", routes: ["80"], isTransfer: true },
      { name: "de Maisonneuve / Guy", time: "9:20 AM", routes: [] },
      { name: "de Maisonneuve / Atwater", time: "9:24 AM", routes: ["138"], isTransfer: true },
      { name: "de Maisonneuve / Greene", time: "9:28 AM", routes: [] },
    ],
  },
};

const RouteDetailScreen = ({ onNavigate, selectedRoute }: RouteDetailScreenProps) => {
  const route = routeData[selectedRoute];
  const color = `hsl(var(${route.colorVar}))`;

  return (
    <div className="flex flex-col bg-card min-h-full">
      {/* Colored hero header */}
      <div className="relative px-5 pt-6 pb-5" style={{ backgroundColor: color }}>
        <div className="flex items-start justify-between">
          <div>
            <motion.span
              className="text-[64px] font-extrabold font-display leading-none text-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {route.number}
            </motion.span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-bold text-white/90 bg-white/20 rounded-full px-2.5 py-0.5">
                ⊕ {route.direction}
              </span>
              <span className="text-xs font-semibold text-white/70">{route.frequency}</span>
            </div>
            <span className="text-sm font-semibold text-white/80 mt-1 block">{route.destination}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Pin className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => onNavigate("nearby")}
              className="w-8 h-8 rounded-full bg-destructive flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* GO button */}
        <motion.button
          className="absolute -bottom-5 right-5 rounded-2xl px-6 py-2.5 shadow-lg z-10"
          style={{ backgroundColor: "white" }}
          whileTap={{ scale: 0.92 }}
        >
          <span className="text-xl font-extrabold font-display" style={{ color }}>GO</span>
        </motion.button>
      </div>

      {/* ETA Cards */}
      <div className="flex gap-2 px-4 pt-8 pb-3">
        {route.etas.map((eta, i) => (
          <ETACountdown key={i} initialMinutes={eta} color={color} highlighted={i === 0} />
        ))}
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-2 px-5 pb-4">
        <div className="flex items-center gap-1.5 bg-muted rounded-xl px-3 py-2">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-foreground">{route.rating}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-muted rounded-xl px-3 py-2">
          <Users className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-bold text-foreground">{route.crowding}%</span>
          <div className="w-12 h-1.5 bg-border rounded-full overflow-hidden ml-1">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: route.crowding > 75 ? "hsl(var(--destructive))" : color }}
              initial={{ width: 0 }}
              animate={{ width: `${route.crowding}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-muted rounded-xl px-3 py-2">
          <Navigation className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-bold text-foreground">Live</span>
        </div>
      </div>

      {/* Stops timeline */}
      <div className="px-5 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Stops</span>
          <span className="text-[11px] text-muted-foreground">• 🚶 2 min walk to {route.nextAt}</span>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-[15px] top-3 bottom-3 w-0.5 rounded-full"
            style={{ backgroundColor: color, opacity: 0.3 }}
          />

          {route.stops.map((stop, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3 py-2.5 cursor-pointer relative"
              whileTap={{ scale: 0.98, x: 4 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {/* Timeline dot */}
              <div className="relative z-10 mt-1">
                <div
                  className="w-[10px] h-[10px] rounded-full border-2"
                  style={{
                    borderColor: color,
                    backgroundColor: i === 0 ? color : "hsl(var(--card))",
                  }}
                />
              </div>

              <div className="flex-1 flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-foreground leading-tight">{stop.name}</span>
                  {stop.routes.length > 0 && (
                    <div className="flex items-center gap-1">
                      {stop.isTransfer && (
                        <span className="text-[9px] font-semibold text-muted-foreground mr-0.5">Transfer:</span>
                      )}
                      {stop.routes.map((r) => (
                        <span
                          key={r}
                          className="text-[9px] font-bold text-white rounded px-1.5 py-0.5"
                          style={{ backgroundColor: color }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-muted-foreground">{stop.time}</span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RouteDetailScreen;
