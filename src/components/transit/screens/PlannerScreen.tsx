import { ArrowUpDown, Clock, MapPin, ChevronRight, ArrowRight, Search, X, Navigation } from "lucide-react";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { Screen, RouteId } from "@/pages/Index";
import { useStops, useTripPlan, formatRouteColor } from "@/hooks/useApi";
import type { Stop } from "@/lib/api";

interface PlannerScreenProps {
  onNavigate: (screen: Screen, routeId?: RouteId) => void;
}

interface StopOption {
  stop_id: string;
  stop_name: string;
  stop_lat: number;
  stop_lon: number;
}

const PlannerScreen = ({ onNavigate }: PlannerScreenProps) => {
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [fromStop, setFromStop] = useState<StopOption | null>(null);
  const [toStop, setToStop] = useState<StopOption | null>(null);
  const [showFromResults, setShowFromResults] = useState(false);
  const [showToResults, setShowToResults] = useState(false);

  const { data: stopsData } = useStops();
  
  const { data: tripData, isLoading: tripLoading } = useTripPlan(
    fromStop?.stop_id || null,
    toStop?.stop_id || null
  );

  const allStops = useMemo(() => {
    if (!stopsData?.stops) return [];
    return stopsData.stops.map((s: Stop) => ({
      stop_id: s.stop_id,
      stop_name: s.stop_name,
      stop_lat: parseFloat(s.stop_lat),
      stop_lon: parseFloat(s.stop_lon),
    }));
  }, [stopsData]);

  const filteredFromStops = useMemo(() => {
    if (!fromQuery || fromQuery.length < 2) return allStops.slice(0, 10);
    const q = fromQuery.toLowerCase();
    return allStops
      .filter(s => s.stop_name.toLowerCase().includes(q))
      .slice(0, 10);
  }, [allStops, fromQuery]);

  const filteredToStops = useMemo(() => {
    if (!toQuery || toQuery.length < 2) return allStops.slice(0, 10);
    const q = toQuery.toLowerCase();
    return allStops
      .filter(s => s.stop_name.toLowerCase().includes(q))
      .slice(0, 10);
  }, [allStops, toQuery]);

  const handleFromSelect = (stop: StopOption) => {
    setFromStop(stop);
    setFromQuery(stop.stop_name);
    setShowFromResults(false);
  };

  const handleToSelect = (stop: StopOption) => {
    setToStop(stop);
    setToQuery(stop.stop_name);
    setShowToResults(false);
  };

  const handleSwap = () => {
    const tempStop = fromStop;
    const tempQuery = fromQuery;
    setFromStop(toStop);
    setFromQuery(toQuery);
    setToStop(tempStop);
    setToQuery(tempQuery);
  };

  const handleTripSelect = (routeId?: string) => {
    if (routeId) {
      onNavigate("route-detail", routeId);
    }
  };

  return (
    <div className="flex flex-col bg-card min-h-full">
      {/* Header */}
      <div className="px-4 pt-6 pb-4" style={{ backgroundColor: "hsl(158,42%,38%)" }}>
        <h1 className="text-lg font-extrabold text-card-foreground font-display mb-4">Route Planner</h1>

        <div className="flex gap-2">
          <div className="flex flex-col gap-2 flex-1 relative">
            {/* From input */}
            <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <input
                value={fromQuery}
                onChange={(e) => {
                  setFromQuery(e.target.value);
                  setFromStop(null);
                  setShowFromResults(true);
                }}
                onFocus={() => setShowFromResults(true)}
                placeholder="From"
                className="bg-transparent text-sm font-semibold text-card-foreground placeholder:text-card-foreground/50 outline-none flex-1 font-display"
              />
              {fromQuery && (
                <button onClick={() => { setFromQuery(""); setFromStop(null); }}>
                  <X className="w-3 h-3 text-card-foreground/50" />
                </button>
              )}
            </div>
            
            {showFromResults && filteredFromStops.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                {filteredFromStops.map((stop) => (
                  <button
                    key={stop.stop_id}
                    onClick={() => handleFromSelect(stop)}
                    className="w-full px-4 py-2.5 text-left hover:bg-muted/50 border-b border-border/20 last:border-0"
                  >
                    <span className="text-sm font-medium text-foreground">{stop.stop_name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* To input */}
            <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <input
                value={toQuery}
                onChange={(e) => {
                  setToQuery(e.target.value);
                  setToStop(null);
                  setShowToResults(true);
                }}
                onFocus={() => setShowToResults(true)}
                placeholder="Where to?"
                className="bg-transparent text-sm font-semibold text-card-foreground placeholder:text-card-foreground/50 outline-none flex-1 font-display"
              />
              {toQuery && (
                <button onClick={() => { setToQuery(""); setToStop(null); }}>
                  <X className="w-3 h-3 text-card-foreground/50" />
                </button>
              )}
            </div>

            {showToResults && filteredToStops.length > 0 && (
              <div className="absolute top-[68px] left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                {filteredToStops.map((stop) => (
                  <button
                    key={stop.stop_id}
                    onClick={() => handleToSelect(stop)}
                    className="w-full px-4 py-2.5 text-left hover:bg-muted/50 border-b border-border/20 last:border-0"
                  >
                    <span className="text-sm font-medium text-foreground">{stop.stop_name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button 
            onClick={handleSwap}
            className="w-10 self-center flex items-center justify-center bg-white/15 rounded-xl h-10"
          >
            <ArrowUpDown className="w-4 h-4 text-card-foreground" />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <button className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5">
            <Clock className="w-3.5 h-3.5 text-card-foreground/80" />
            <span className="text-[11px] font-bold text-card-foreground">Leave now</span>
          </button>
        </div>
      </div>

      {/* Results */}
      {fromStop && toStop ? (
        <div className="flex flex-col flex-1">
          <div className="px-5 pt-4 pb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {tripData?.from_stop_name} → {tripData?.to_stop_name}
            </span>
            {tripLoading && <span className="text-xs text-muted-foreground">Loading...</span>}
          </div>
          
          {tripData?.options && tripData.options.length > 0 ? (
            <div className="flex-1 overflow-y-auto">
              {tripData.options.map((trip, idx) => (
                <motion.button
                  key={trip.id}
                  onClick={() => handleTripSelect(trip.route_id)}
                  className="w-full flex flex-col px-5 py-4 border-b border-border/30 active:bg-muted/50 transition-colors text-left"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-3">
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

                  <div className="flex items-center gap-1 w-full h-8">
                    {trip.legs.map((leg, i) => (
                      <div
                        key={i}
                        className="h-7 rounded-full flex items-center justify-center px-3"
                        style={{
                          backgroundColor: leg.color.startsWith('#') ? leg.color : formatRouteColor(leg.color),
                          flex: 1,
                        }}
                      >
                        <span className="text-[10px] font-bold text-white whitespace-nowrap">
                          {leg.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                    <Navigation className="w-3 h-3" />
                    <span>Direct • {trip.legs[0]?.from_stop} → {trip.legs[0]?.to_stop}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground text-center">No direct routes found</span>
              <span className="text-xs text-muted-foreground/60 mt-1 text-center">Try different stops</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center py-16 px-8">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <MapPin className="w-7 h-7 text-muted-foreground" />
          </div>
          <span className="text-sm font-bold text-foreground font-display text-center">
            {fromStop ? "Select a destination" : "Plan your trip"}
          </span>
          <span className="text-xs text-muted-foreground text-center mt-1">
            {fromStop 
              ? `Find buses from ${fromStop.stop_name}`
              : "Search for stops to find available routes"}
          </span>
        </div>
      )}
    </div>
  );
};

export default PlannerScreen;
