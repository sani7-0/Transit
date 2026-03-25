import { X, ChevronRight } from "lucide-react";
import type { Screen } from "@/pages/Index";

interface TripDetailScreenProps {
  onNavigate: (screen: Screen) => void;
}

const TripDetailScreen = ({ onNavigate }: TripDetailScreenProps) => {
  return (
    <div className="flex flex-col bg-card">
      {/* Map area */}
      <div className="relative h-[200px] bg-[hsl(45,30%,92%)] overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
          <line x1="100" y1="0" x2="100" y2="200" stroke="hsl(0,0%,88%)" strokeWidth="8" />
          <line x1="200" y1="0" x2="200" y2="200" stroke="hsl(0,0%,88%)" strokeWidth="12" />
          <line x1="300" y1="0" x2="300" y2="200" stroke="hsl(0,0%,88%)" strokeWidth="8" />
          <line x1="0" y1="100" x2="400" y2="100" stroke="hsl(0,0%,88%)" strokeWidth="8" />

          {/* Route path */}
          <path d="M120,30 L180,80 L250,140 L320,180" stroke="hsl(270,45%,38%)" strokeWidth="4" fill="none" strokeDasharray="8 4" />
          {/* Start marker */}
          <circle cx="120" cy="30" r="8" fill="hsl(5,75%,58%)" />
          {/* End marker */}
          <circle cx="320" cy="180" r="8" fill="hsl(152,60%,42%)" />
        </svg>

        {/* Close */}
        <button
          onClick={() => onNavigate("nearby")}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-destructive flex items-center justify-center"
        >
          <X className="w-4 h-4 text-card-foreground" />
        </button>
      </div>

      {/* Trip header card */}
      <div className="bg-card mx-4 -mt-6 rounded-2xl shadow-lg p-4 relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-lg font-extrabold text-foreground font-display">Leave at 16:06</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm text-muted-foreground font-semibold">Arrive at 16:26</span>
              <span className="text-sm text-muted-foreground font-semibold">21 min</span>
            </div>
          </div>
          {/* GO button */}
          <button className="bg-route-green rounded-2xl px-4 py-2">
            <span className="text-lg font-extrabold text-card-foreground font-display">GO</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-[hsl(270,45%,38%)] rounded-full" />
        </div>
      </div>

      {/* Walking */}
      <div className="px-5 py-3 flex items-center gap-2">
        <span className="text-xs text-muted-foreground font-semibold">🚶 2 minutes</span>
        <ChevronRight className="w-3 h-3 text-muted-foreground" />
      </div>

      {/* ETA Cards */}
      <div className="flex gap-2 px-4 pb-3">
        <TripETACard routeNum="67" minutes={8} highlighted />
        <TripETACard routeNum="67" minutes={15} />
        <TripETACard routeNum="467" minutes={18} />
      </div>

      {/* Rating & Cost */}
      <div className="flex items-center gap-3 px-5 pb-3">
        <div className="flex items-center gap-1 bg-[hsl(270,30%,90%)] rounded-lg px-2.5 py-1.5">
          <span className="text-[10px]">⭐</span>
          <span className="text-xs font-bold text-foreground">4.5</span>
        </div>
        <div className="flex items-center gap-1 bg-[hsl(270,30%,90%)] rounded-lg px-2.5 py-1.5">
          <span className="text-xs font-bold text-foreground">👥 75%</span>
        </div>
        <div className="flex items-center gap-1 bg-[hsl(270,30%,90%)] rounded-lg px-2.5 py-1.5">
          <span className="text-xs font-bold text-foreground">💰 $3.75</span>
        </div>
      </div>

      {/* Route detail */}
      <div className="px-5 py-3 border-t border-border/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-[hsl(270,45%,38%)] flex items-center justify-center">
            <span className="text-sm font-extrabold text-card-foreground font-display">67</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-lg font-extrabold text-foreground font-display">51</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold text-muted-foreground">⊕ East</span>
            </div>
          </div>
          <div className="ml-auto">
            <span className="text-sm font-semibold text-foreground">Édouard-Monpetit / de Stirling</span>
          </div>
          <span className="text-xs text-muted-foreground font-semibold">9:35 AM</span>
        </div>
      </div>
    </div>
  );
};

const TripETACard = ({
  routeNum,
  minutes,
  highlighted = false,
}: {
  routeNum: string;
  minutes: number;
  highlighted?: boolean;
}) => (
  <div
    className={`flex-1 rounded-2xl flex flex-col items-center justify-center py-3 relative ${
      highlighted ? "bg-[hsl(270,45%,38%)]" : "bg-[hsl(270,30%,90%)]"
    }`}
  >
    {/* Route badge */}
    <div className="absolute top-2 left-1/2 -translate-x-1/2">
      <div
        className={`rounded-full px-2 py-0.5 ${
          highlighted ? "bg-card/20" : "bg-[hsl(270,45%,38%)]"
        }`}
      >
        <span className="text-[9px] font-bold text-card-foreground">{routeNum}</span>
      </div>
    </div>
    <div className="mt-4 flex items-baseline">
      <span
        className={`text-[34px] font-extrabold font-display leading-none ${
          highlighted ? "text-card-foreground" : "text-[hsl(270,45%,38%)]"
        }`}
      >
        {minutes}
      </span>
      <span
        className={`text-[7px] font-bold ml-0.5 mb-4 ${
          highlighted ? "text-card-foreground/60" : "text-[hsl(270,45%,38%)]/60"
        }`}
      >
        ᐩ
      </span>
    </div>
    <span
      className={`text-[10px] font-semibold ${
        highlighted ? "text-card-foreground/75" : "text-[hsl(270,45%,38%)]/75"
      }`}
    >
      minutes
    </span>
  </div>
);

export default TripDetailScreen;
