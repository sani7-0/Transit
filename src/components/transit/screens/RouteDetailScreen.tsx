import { X, Pin, Navigation, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Screen, RouteId } from "@/pages/Index";
import ETACountdown from "@/components/transit/ETACountdown";
import { useRoute, useRouteStops, formatRouteColor } from "@/hooks/useApi";

interface RouteDetailScreenProps {
  onNavigate: (screen: Screen) => void;
  selectedRoute: RouteId;
}

const RouteDetailScreen = ({ onNavigate, selectedRoute }: RouteDetailScreenProps) => {
  const { data: routeData, isLoading: routeLoading } = useRoute(selectedRoute);
  const { data: stopsData, isLoading: stopsLoading } = useRouteStops(selectedRoute);

  const etas = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 15) + 5, Math.floor(Math.random() * 20) + 10];
  const crowding = Math.floor(Math.random() * 100);

  const color = formatRouteColor(routeData?.route_color) || '#1B5E20';

  const stops = stopsData?.stops?.slice(0, 10).map((stop, index) => ({
    name: stop.stop_name,
    time: `${9 + Math.floor(index / 3)}:${(index % 3) * 10} AM`,
    isTransfer: index % 3 === 0
  })) || [];

  if (routeLoading || stopsLoading) {
    return (
      <div className="flex flex-col bg-card min-h-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-sm text-muted-foreground mt-4">Loading route details...</p>
      </div>
    );
  }

  if (!routeData) {
    return (
      <div className="flex flex-col bg-card min-h-full items-center justify-center p-4">
        <p className="text-muted-foreground">Route not found</p>
        <button onClick={() => onNavigate("nearby")} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
          Go Back
        </button>
      </div>
    );
  }

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
              {routeData.route_short_name || 'N/A'}
            </motion.span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-bold text-white/90 bg-white/20 rounded-full px-2.5 py-0.5 truncate max-w-[250px]">
                {routeData.route_long_name?.slice(0, 40) || 'Addis Transit'}
              </span>
            </div>
            <span className="text-sm font-semibold text-white/80 mt-1 block">
              {routeData.route_long_name || 'Addis Ababa Transit Route'}
            </span>
          </div>
          <button
            onClick={() => onNavigate("nearby")}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-white" />
          </button>
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
        {etas.map((eta, i) => (
          <ETACountdown key={i} initialMinutes={eta} color={color} highlighted={i === 0} />
        ))}
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-2 px-5 pb-4">
        <div className="flex items-center gap-1.5 bg-muted rounded-xl px-3 py-2">
          <Navigation className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-bold text-foreground">Live</span>
        </div>
        <div className="flex items-center gap-1.5 bg-muted rounded-xl px-3 py-2">
          <Pin className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-bold text-foreground">{stops.length} stops</span>
        </div>
      </div>

      {/* Stops timeline */}
      <div className="px-5 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Stops</span>
          <span className="text-[11px] text-muted-foreground">• {stops.length} stops on this route</span>
        </div>

        <div className="relative">
          <div
            className="absolute left-[15px] top-3 bottom-3 w-0.5 rounded-full"
            style={{ backgroundColor: color, opacity: 0.3 }}
          />

          {stops.map((stop, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3 py-2.5 cursor-pointer relative"
              whileTap={{ scale: 0.98, x: 4 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
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
                  {stop.isTransfer && (
                    <span className="text-[9px] font-semibold text-muted-foreground">Transfer stop</span>
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
