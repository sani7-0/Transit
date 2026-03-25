import { X, Pin, Star, Users } from "lucide-react";
import type { Screen } from "@/pages/Index";

interface RouteDetailScreenProps {
  onNavigate: (screen: Screen) => void;
}

const RouteDetailScreen = ({ onNavigate }: RouteDetailScreenProps) => {
  return (
    <div className="flex flex-col bg-card">
      {/* Map area with route line */}
      <div className="relative h-[260px] bg-[hsl(45,30%,92%)] overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
          <line x1="80" y1="0" x2="80" y2="260" stroke="hsl(0,0%,88%)" strokeWidth="8" />
          <line x1="160" y1="0" x2="160" y2="260" stroke="hsl(0,0%,88%)" strokeWidth="12" />
          <line x1="240" y1="0" x2="240" y2="260" stroke="hsl(0,0%,88%)" strokeWidth="8" />
          <line x1="320" y1="0" x2="320" y2="260" stroke="hsl(0,0%,88%)" strokeWidth="8" />
          <line x1="0" y1="80" x2="400" y2="80" stroke="hsl(0,0%,88%)" strokeWidth="8" />
          <line x1="0" y1="180" x2="400" y2="180" stroke="hsl(0,0%,88%)" strokeWidth="8" />
          <rect x="85" y="85" width="70" height="90" rx="4" fill="hsl(120,25%,85%)" />

          {/* Purple route line */}
          <line x1="200" y1="0" x2="190" y2="260" stroke="hsl(270,45%,38%)" strokeWidth="4" strokeDasharray="8 4" />

          {/* Stops */}
          <circle cx="195" cy="60" r="6" fill="white" stroke="hsl(270,45%,38%)" strokeWidth="2.5" />
          <circle cx="193" cy="130" r="6" fill="white" stroke="hsl(270,45%,38%)" strokeWidth="2.5" />
          <circle cx="191" cy="200" r="6" fill="hsl(270,45%,38%)" stroke="hsl(270,45%,38%)" strokeWidth="2.5" />

          {/* Blue dot */}
          <circle cx="230" cy="150" r="6" fill="hsl(210,100%,55%)" />
          <circle cx="230" cy="150" r="10" fill="hsl(210,100%,55%)" fillOpacity="0.2" />

          {/* Bus icon */}
          <rect x="186" cy="44" y="44" width="14" height="14" rx="3" fill="hsl(270,45%,38%)" />
        </svg>

        {/* 4th badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-route-green rounded-full px-2 py-0.5 flex items-center gap-1">
            <span className="text-[10px]">😊</span>
            <span className="text-[10px] font-bold text-card-foreground">4th</span>
          </div>
        </div>

        {/* Route number */}
        <div className="absolute top-10 left-5">
          <span className="text-[64px] font-extrabold text-[hsl(270,45%,38%)] font-display leading-none">51</span>
        </div>

        {/* Close button */}
        <button
          onClick={() => onNavigate("nearby")}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-destructive flex items-center justify-center"
        >
          <X className="w-4 h-4 text-card-foreground" />
        </button>

        {/* Pin and GO */}
        <div className="absolute bottom-16 right-5 flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-card/80 flex items-center justify-center shadow-sm">
            <Pin className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* GO button */}
        <div className="absolute bottom-4 right-5">
          <button className="bg-route-green rounded-2xl px-5 py-2">
            <span className="text-xl font-extrabold text-card-foreground font-display">GO</span>
          </button>
        </div>

        {/* Direction */}
        <div className="absolute bottom-4 left-5">
          <span className="text-[11px] font-bold text-[hsl(270,45%,38%)] bg-card/60 rounded-full px-2 py-0.5">⊕ West</span>
        </div>
      </div>

      {/* ETA Cards */}
      <div className="flex gap-2 px-4 py-4">
        <ETACard minutes={2} isRealtime highlighted />
        <ETACard minutes={10} isRealtime />
        <ETACard minutes={18} isRealtime />
      </div>

      {/* Rating & Crowding */}
      <div className="flex items-center gap-3 px-5 pb-3">
        <div className="flex items-center gap-1 bg-muted rounded-lg px-2.5 py-1.5">
          <Star className="w-3.5 h-3.5 text-[hsl(45,90%,50%)] fill-[hsl(45,90%,50%)]" />
          <span className="text-xs font-bold text-foreground">4.7</span>
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg px-2.5 py-1.5">
          <Users className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-bold text-foreground">86%</span>
        </div>
      </div>

      {/* Stops list */}
      <div className="px-5 py-2 border-t border-border/50">
        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          <span className="text-[11px] font-semibold">🚶 2 minutes</span>
        </div>

        <StopRow
          name="Édouard-Monpetit / Woodbury"
          time="9:19 AM"
          routes={["119", "368"]}
        />
        <StopRow
          name="Station Université-de-Montréal"
          time="9:21 AM"
          routes={["119", "368"]}
        />
      </div>
    </div>
  );
};

const ETACard = ({
  minutes,
  isRealtime = false,
  highlighted = false,
}: {
  minutes: number;
  isRealtime?: boolean;
  highlighted?: boolean;
}) => (
  <div
    className={`flex-1 rounded-2xl flex flex-col items-center justify-center py-3 ${
      highlighted
        ? "bg-[hsl(270,45%,38%)]"
        : "bg-[hsl(270,30%,90%)]"
    }`}
  >
    <div className="flex items-baseline">
      <span
        className={`text-[36px] font-extrabold font-display leading-none ${
          highlighted ? "text-card-foreground" : "text-[hsl(270,45%,38%)]"
        }`}
      >
        {minutes}
      </span>
      {isRealtime && (
        <span
          className={`text-[7px] font-bold ml-0.5 mb-4 ${
            highlighted ? "text-card-foreground/60" : "text-[hsl(270,45%,38%)]/60"
          }`}
        >
          ᐩ
        </span>
      )}
    </div>
    <span
      className={`text-[10px] font-semibold ${
        highlighted ? "text-card-foreground/75" : "text-[hsl(270,45%,38%)]/75"
      }`}
    >
      minutes
    </span>
    {highlighted && (
      <div className="mt-1.5 flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-card-foreground/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-card-foreground/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-card-foreground/40" />
      </div>
    )}
  </div>
);

const StopRow = ({
  name,
  time,
  routes,
}: {
  name: string;
  time: string;
  routes: string[];
}) => (
  <div className="flex items-start justify-between py-2.5 border-b border-border/30 last:border-b-0">
    <div className="flex flex-col gap-1">
      <span className="text-sm font-bold text-foreground">{name}</span>
      <div className="flex items-center gap-1">
        {routes.map((r) => (
          <span
            key={r}
            className="text-[9px] font-bold bg-[hsl(270,45%,38%)] text-card-foreground rounded px-1.5 py-0.5"
          >
            {r}
          </span>
        ))}
      </div>
    </div>
    <span className="text-xs font-semibold text-muted-foreground">{time}</span>
  </div>
);

export default RouteDetailScreen;
