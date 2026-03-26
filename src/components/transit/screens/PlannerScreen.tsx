import { ArrowUpDown, Clock, MapPin, ChevronRight, ArrowRight } from "lucide-react";
import { useState } from "react";
import type { Screen } from "@/pages/Index";

interface PlannerScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface TripOption {
  id: number;
  departTime: string;
  arriveTime: string;
  duration: string;
  transfers: number;
  legs: { type: "walk" | "bus" | "metro"; label: string; color: string; duration: string }[];
}

const tripOptions: TripOption[] = [
  {
    id: 1,
    departTime: "9:08 AM",
    arriveTime: "9:34 AM",
    duration: "26 min",
    transfers: 1,
    legs: [
      { type: "walk", label: "Walk", color: "hsl(0,0%,60%)", duration: "4 min" },
      { type: "bus", label: "55", color: "hsl(158,42%,38%)", duration: "14 min" },
      { type: "walk", label: "Walk", color: "hsl(0,0%,60%)", duration: "8 min" },
    ],
  },
  {
    id: 2,
    departTime: "9:12 AM",
    arriveTime: "9:42 AM",
    duration: "30 min",
    transfers: 2,
    legs: [
      { type: "walk", label: "Walk", color: "hsl(0,0%,60%)", duration: "3 min" },
      { type: "metro", label: "2", color: "hsl(262,35%,42%)", duration: "8 min" },
      { type: "bus", label: "15", color: "hsl(205,65%,48%)", duration: "12 min" },
      { type: "walk", label: "Walk", color: "hsl(0,0%,60%)", duration: "7 min" },
    ],
  },
  {
    id: 3,
    departTime: "9:18 AM",
    arriveTime: "9:52 AM",
    duration: "34 min",
    transfers: 1,
    legs: [
      { type: "walk", label: "Walk", color: "hsl(0,0%,60%)", duration: "6 min" },
      { type: "bus", label: "15", color: "hsl(205,65%,48%)", duration: "20 min" },
      { type: "walk", label: "Walk", color: "hsl(0,0%,60%)", duration: "8 min" },
    ],
  },
];

const PlannerScreen = ({ onNavigate }: PlannerScreenProps) => {
  const [from, setFrom] = useState("Current Location");
  const [to, setTo] = useState("");

  return (
    <div className="flex flex-col bg-card min-h-full">
      {/* Header */}
      <div className="px-4 pt-6 pb-4" style={{ backgroundColor: "hsl(158,42%,38%)" }}>
        <h1 className="text-lg font-extrabold text-card-foreground font-display mb-4">Route Planner</h1>

        {/* From / To inputs */}
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-card-foreground/80" />
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="From"
                className="bg-transparent text-sm font-semibold text-card-foreground placeholder:text-card-foreground/50 outline-none flex-1 font-display"
              />
            </div>
            <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2.5">
              <MapPin className="w-3.5 h-3.5 text-card-foreground/80" />
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Where to?"
                className="bg-transparent text-sm font-semibold text-card-foreground placeholder:text-card-foreground/50 outline-none flex-1 font-display"
              />
            </div>
          </div>
          <button className="w-10 self-center flex items-center justify-center bg-white/15 rounded-xl h-10">
            <ArrowUpDown className="w-4 h-4 text-card-foreground" />
          </button>
        </div>

        {/* Time selector */}
        <div className="flex items-center gap-2 mt-3">
          <button className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5">
            <Clock className="w-3.5 h-3.5 text-card-foreground/80" />
            <span className="text-[11px] font-bold text-card-foreground">Leave now</span>
          </button>
          <button className="bg-white/15 rounded-full px-3 py-1.5">
            <span className="text-[11px] font-bold text-card-foreground">Depart at</span>
          </button>
          <button className="bg-white/15 rounded-full px-3 py-1.5">
            <span className="text-[11px] font-bold text-card-foreground">Arrive by</span>
          </button>
        </div>
      </div>

      {/* Trip options */}
      {to ? (
        <div className="flex flex-col">
          <div className="px-5 pt-4 pb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Suggested trips</span>
          </div>
          {tripOptions.map((trip) => (
            <button
              key={trip.id}
              onClick={() => onNavigate("trip-detail")}
              className="flex flex-col px-5 py-3.5 border-b border-border/30 active:bg-muted/50 transition-colors text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-extrabold text-foreground font-display">{trip.departTime}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm font-bold text-foreground font-display">{trip.arriveTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-muted-foreground">{trip.duration}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              {/* Legs bar */}
              <div className="flex items-center gap-1 w-full h-6">
                {trip.legs.map((leg, i) => (
                  <div
                    key={i}
                    className="h-5 rounded-full flex items-center justify-center px-2"
                    style={{
                      backgroundColor: leg.color,
                      flex: leg.type === "walk" ? 0.6 : 1,
                      minWidth: leg.type === "walk" ? 32 : 48,
                    }}
                  >
                    <span className="text-[9px] font-bold text-white whitespace-nowrap">
                      {leg.type === "walk" ? "🚶" : leg.label}
                    </span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-8">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <MapPin className="w-7 h-7 text-muted-foreground" />
          </div>
          <span className="text-sm font-bold text-foreground font-display text-center">Enter a destination</span>
          <span className="text-xs text-muted-foreground text-center mt-1">
            Type where you want to go and we'll find the best transit routes for you.
          </span>
        </div>
      )}
    </div>
  );
};

export default PlannerScreen;
