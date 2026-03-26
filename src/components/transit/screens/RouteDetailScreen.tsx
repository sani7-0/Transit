import { X, Pin, Star, Users } from "lucide-react";
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
  color: string;
  etas: number[];
  rating: number;
  crowding: number;
  stops: { name: string; time: string; routes: string[] }[];
}> = {
  "55": {
    number: "55",
    direction: "North",
    destination: "Station Saint-Laurent",
    color: "hsl(152,60%,32%)",
    etas: [3, 12, 19],
    rating: 4.5,
    crowding: 72,
    stops: [
      { name: "de Maisonneuve / Saint-Laurent", time: "9:14 AM", routes: ["51", "80"] },
      { name: "Sherbrooke / Saint-Laurent", time: "9:18 AM", routes: ["24"] },
      { name: "Mont-Royal / Saint-Laurent", time: "9:22 AM", routes: ["97"] },
    ],
  },
  metro2: {
    number: "2",
    direction: "Côte-Vertu",
    destination: "Station Berri-UQAM",
    color: "hsl(268,50%,40%)",
    etas: [2, 6, 10],
    rating: 4.7,
    crowding: 86,
    stops: [
      { name: "Berri-UQAM", time: "9:11 AM", routes: ["1", "4"] },
      { name: "Jean-Talon", time: "9:18 AM", routes: ["5"] },
      { name: "Côte-Vertu", time: "9:28 AM", routes: [] },
    ],
  },
  "15": {
    number: "15",
    direction: "West",
    destination: "De Maisonneuve / No 205",
    color: "hsl(210,75%,45%)",
    etas: [5, 14, 22],
    rating: 4.2,
    crowding: 58,
    stops: [
      { name: "de Maisonneuve / Parc", time: "9:16 AM", routes: ["80"] },
      { name: "de Maisonneuve / Atwater", time: "9:24 AM", routes: ["138"] },
    ],
  },
};

const RouteDetailScreen = ({ onNavigate, selectedRoute }: RouteDetailScreenProps) => {
  const route = routeData[selectedRoute];

  return (
    <div className="flex flex-col bg-card">
      {/* Map area */}
      <div className="relative h-[260px] overflow-hidden" style={{ backgroundColor: "hsl(45,30%,92%)" }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
          <line x1="80" y1="0" x2="80" y2="260" stroke="hsl(0,0%,88%)" strokeWidth="8" />
          <line x1="160" y1="0" x2="160" y2="260" stroke="hsl(0,0%,88%)" strokeWidth="12" />
          <line x1="240" y1="0" x2="240" y2="260" stroke="hsl(0,0%,88%)" strokeWidth="8" />
          <line x1="320" y1="0" x2="320" y2="260" stroke="hsl(0,0%,88%)" strokeWidth="8" />
          <line x1="0" y1="80" x2="400" y2="80" stroke="hsl(0,0%,88%)" strokeWidth="8" />
          <line x1="0" y1="180" x2="400" y2="180" stroke="hsl(0,0%,88%)" strokeWidth="8" />
          <rect x="85" y="85" width="70" height="90" rx="4" fill="hsl(120,25%,85%)" />
          <line x1="200" y1="0" x2="190" y2="260" stroke={route.color} strokeWidth="4" strokeDasharray="8 4" />
          {route.stops.map((_, i) => (
            <circle key={i} cx={195 - i * 2} cy={60 + i * 70} r="6" fill={i === route.stops.length - 1 ? route.color : "white"} stroke={route.color} strokeWidth="2.5" />
          ))}
          <circle cx="230" cy="150" r="6" fill="hsl(210,100%,55%)" />
          <circle cx="230" cy="150" r="10" fill="hsl(210,100%,55%)" fillOpacity="0.2" />
        </svg>

        <div className="absolute top-10 left-5">
          <span className="text-[64px] font-extrabold font-display leading-none" style={{ color: route.color }}>{route.number}</span>
        </div>

        <button
          onClick={() => onNavigate("nearby")}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-destructive flex items-center justify-center"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        <div className="absolute bottom-16 right-5">
          <button className="w-8 h-8 rounded-full bg-card/80 flex items-center justify-center shadow-sm">
            <Pin className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <motion.button
          className="absolute bottom-4 right-5 rounded-2xl px-5 py-2"
          style={{ backgroundColor: route.color }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl font-extrabold text-white font-display">GO</span>
        </motion.button>

        <div className="absolute bottom-4 left-5">
          <span className="text-[11px] font-bold bg-card/60 rounded-full px-2 py-0.5" style={{ color: route.color }}>⊕ {route.direction}</span>
        </div>
      </div>

      {/* ETA Cards with live countdown */}
      <div className="flex gap-2 px-4 py-4">
        {route.etas.map((eta, i) => (
          <ETACountdown key={i} initialMinutes={eta} color={route.color} highlighted={i === 0} />
        ))}
      </div>

      {/* Rating & Crowding */}
      <div className="flex items-center gap-3 px-5 pb-3">
        <div className="flex items-center gap-1 bg-muted rounded-lg px-2.5 py-1.5">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-foreground">{route.rating}</span>
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg px-2.5 py-1.5">
          <Users className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-bold text-foreground">{route.crowding}%</span>
        </div>
      </div>

      {/* Stops list */}
      <div className="px-5 py-2 border-t border-border/50">
        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          <span className="text-[11px] font-semibold">🚶 2 minutes</span>
        </div>
        {route.stops.map((stop, i) => (
          <motion.div
            key={i}
            className="flex items-start justify-between py-2.5 border-b border-border/30 last:border-b-0 cursor-pointer"
            whileTap={{ scale: 0.98, backgroundColor: "hsl(var(--muted))" }}
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-foreground">{stop.name}</span>
              {stop.routes.length > 0 && (
                <div className="flex items-center gap-1">
                  {stop.routes.map((r) => (
                    <span key={r} className="text-[9px] font-bold text-white rounded px-1.5 py-0.5" style={{ backgroundColor: route.color }}>{r}</span>
                  ))}
                </div>
              )}
            </div>
            <span className="text-xs font-semibold text-muted-foreground">{stop.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RouteDetailScreen;
