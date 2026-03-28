import { useState, useCallback } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { Heart, RefreshCw, Users } from "lucide-react";
import MapArea from "@/components/transit/MapArea";
import SearchBar from "@/components/transit/SearchBar";
import type { Screen, RouteId } from "@/pages/Index";
import ETACountdown from "@/components/transit/ETACountdown";

interface NearbyScreenProps {
  onNavigate: (screen: Screen, routeId?: RouteId) => void;
  favorites: RouteId[];
  onToggleFavorite: (routeId: RouteId) => void;
}

const SNAP_POINTS = [200, 0, -200];
const MAP_HEIGHTS = [180, 380, 600];

type RouteCardData = {
  id: RouteId;
  number: string;
  direction: string;
  destination: string;
  colorVar: string;
  eta: number;
  nextEtas: number[];
  crowding: number;
  isMetro?: boolean;
};

const allRoutes: RouteCardData[] = [
  { id: "55", number: "55", direction: "North", destination: "Station Saint-Laurent", colorVar: "--route-green", eta: 3, nextEtas: [12, 19], crowding: 72 },
  { id: "metro2", number: "2", direction: "Côte-Vertu", destination: "Station Berri-UQAM", colorVar: "--route-purple", eta: 2, nextEtas: [6, 10], crowding: 86, isMetro: true },
  { id: "15", number: "15", direction: "West", destination: "De Maisonneuve / No 205", colorVar: "--route-blue", eta: 5, nextEtas: [14, 22], crowding: 58 },
];

const NearbyScreen = ({ onNavigate, favorites, onToggleFavorite }: NearbyScreenProps) => {
  const [snapIndex, setSnapIndex] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [etaKey, setEtaKey] = useState(0);
  const controls = useAnimation();

  const handleDragEnd = (_: any, info: PanInfo) => {
    const currentY = SNAP_POINTS[snapIndex];
    const projectedY = currentY + info.offset.y + info.velocity.y * 0.2;

    if (snapIndex === 0 && info.offset.y > 60) {
      triggerRefresh();
    }

    let closest = 0;
    let minDist = Infinity;
    SNAP_POINTS.forEach((point, i) => {
      const dist = Math.abs(projectedY - point);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    setSnapIndex(closest);
    controls.start({ y: SNAP_POINTS[closest], transition: { type: "spring", stiffness: 400, damping: 35 } });
  };

  const triggerRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setEtaKey((k) => k + 1);
      setIsRefreshing(false);
    }, 1200);
  }, []);

  const handleRouteClick = useCallback((routeId: RouteId) => {
    onNavigate("route-detail", routeId);
  }, [onNavigate]);

  const isSheetUp = snapIndex === 0;
  const isSheetDown = snapIndex === 2;

  const sortedRoutes = [...allRoutes].sort((a, b) => {
    const aFav = favorites.includes(a.id) ? 0 : 1;
    const bFav = favorites.includes(b.id) ? 0 : 1;
    return aFav - bFav;
  });

  const renderRouteCard = (route: RouteCardData, isLast: boolean) => {
    const isFav = favorites.includes(route.id);
    const color = `hsl(var(${route.colorVar}))`;

    return (
      <motion.div
        key={route.id}
        layout
        className={`w-full px-5 py-4 flex items-stretch gap-4 cursor-pointer ${!isLast ? "border-b border-border/5" : ""}`}
        style={{ backgroundColor: color }}
        onClick={() => onNavigate("route-detail", route.id)}
        whileTap={{ scale: 0.98, opacity: 0.9 }}
      >
        {/* Left: route number + info */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              {route.isMetro ? (
                <div className="flex items-center gap-2">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2" />
                    <path d="M6 16L9 8H11L12 12L13 8H15L18 16" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-route-orange">
                    <span className="text-sm font-extrabold text-white font-display">{route.number}</span>
                  </div>
                </div>
              ) : (
                <span className="text-[72px] font-extrabold leading-none text-white font-display tracking-tighter">{route.number}</span>
              )}
            </div>
            <motion.button
              className="w-9 h-9 rounded-full flex items-center justify-center mt-1"
              style={{ backgroundColor: isFav ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)" }}
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(route.id); }}
              whileTap={{ scale: 0.8 }}
              animate={isFav ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart className="w-4 h-4" fill={isFav ? "white" : "none"} stroke="white" strokeWidth={2} />
            </motion.button>
          </div>

          <div className="mt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-white/90 bg-white/15 rounded-full px-2 py-0.5">⊕ {route.direction}</span>
              <div className="flex items-center gap-1 ml-1">
                <Users className="w-3 h-3 text-white/60" />
                <div className="w-10 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-white/70" style={{ width: `${route.crowding}%` }} />
                </div>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-white/70 mt-0.5 block truncate">{route.destination}</span>
          </div>
        </div>

        {/* Right: ETA tiles */}
        <div className="flex flex-col gap-1.5 w-24 shrink-0">
          <div className="flex-1">
            <ETACountdown key={`${route.id}-${etaKey}`} initialMinutes={route.eta} color={color} highlighted size="md" />
          </div>
          <div className="flex gap-1">
            {route.nextEtas.map((eta, i) => (
              <div key={i} className="flex-1 bg-white/12 rounded-lg flex items-center justify-center py-1">
                <span className="text-[13px] font-extrabold text-white/80 font-display tabular-nums">{eta}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col relative overflow-hidden" style={{ height: "100%" }}>
      {/* Pull-to-refresh indicator */}
      <motion.div
        className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-primary/90 rounded-full px-3 py-1.5"
        initial={{ opacity: 0, y: -30 }}
        animate={isRefreshing ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div animate={isRefreshing ? { rotate: 360 } : {}} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>
          <RefreshCw className="w-3.5 h-3.5 text-primary-foreground" />
        </motion.div>
        <span className="text-[11px] font-bold text-primary-foreground">Refreshing ETAs…</span>
      </motion.div>

      {/* Map */}
      <motion.div
        animate={{ height: MAP_HEIGHTS[snapIndex] }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="shrink-0"
      >
        <MapArea onRouteClick={handleRouteClick} />
      </motion.div>

      {/* Draggable bottom sheet */}
      <motion.div
        drag="y"
        dragConstraints={{ top: SNAP_POINTS[2], bottom: SNAP_POINTS[0] + 80 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ y: SNAP_POINTS[1] }}
        className="flex flex-col flex-1 rounded-t-3xl -mt-4 relative z-10 bg-card"
        style={{
          touchAction: "none",
          boxShadow: isSheetUp ? "var(--sheet-shadow-lifted)" : "var(--sheet-shadow)",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <motion.div
            className="w-10 h-1 rounded-full bg-muted-foreground/30"
            animate={{ width: isSheetDown ? 28 : 40, opacity: isSheetDown ? 0.4 : 1 }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Search bar */}
        <div onClick={() => onNavigate("search")} className="cursor-pointer px-1">
          <SearchBar />
        </div>

        {/* Favorites label */}
        {favorites.length > 0 && (
          <div className="px-5 pt-2 pb-1 flex items-center gap-1.5">
            <Heart className="w-3 h-3 text-destructive fill-destructive" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Favorites</span>
          </div>
        )}

        {/* Route cards */}
        <motion.div
          className="w-full mt-1"
          animate={{ opacity: isSheetDown ? 0.3 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {sortedRoutes.map((route, i) => renderRouteCard(route, i === sortedRoutes.length - 1))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NearbyScreen;
