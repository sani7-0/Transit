import { useState } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { Heart } from "lucide-react";
import MapArea from "@/components/transit/MapArea";
import SearchBar from "@/components/transit/SearchBar";
import type { Screen, RouteId } from "@/pages/Index";
import ETACountdown from "@/components/transit/ETACountdown";

interface NearbyScreenProps {
  onNavigate: (screen: Screen, routeId?: RouteId) => void;
  favorites: RouteId[];
  onToggleFavorite: (routeId: RouteId) => void;
}

const SNAP_POINTS = [0, -140, -280];
const MAP_HEIGHTS = [280, 420, 560];

type RouteCardData = {
  id: RouteId;
  number: string;
  direction: string;
  destination: string;
  colorVar: string;
  eta: number;
  isMetro?: boolean;
};

const allRoutes: RouteCardData[] = [
  { id: "55", number: "55", direction: "North", destination: "Station Saint-Laurent", colorVar: "--route-green", eta: 3 },
  { id: "metro2", number: "2", direction: "Côte-Vertu", destination: "Station Berri-UQAM", colorVar: "--route-purple", eta: 2, isMetro: true },
  { id: "15", number: "15", direction: "West", destination: "De Maisonneuve / No 205", colorVar: "--route-blue", eta: 5 },
];

const NearbyScreen = ({ onNavigate, favorites, onToggleFavorite }: NearbyScreenProps) => {
  const [snapIndex, setSnapIndex] = useState(0);
  const controls = useAnimation();

  const handleDragEnd = (_: any, info: PanInfo) => {
    const currentY = SNAP_POINTS[snapIndex];
    const projectedY = currentY + info.offset.y + info.velocity.y * 0.2;

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

  const isLifted = snapIndex === 0;

  // Sort: favorites first
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
        className={`w-full px-5 py-3.5 flex items-center justify-between cursor-pointer ${!isLast ? "border-b border-border/10" : ""}`}
        style={{ backgroundColor: color }}
        onClick={() => onNavigate("route-detail", route.id)}
        whileTap={{ scale: 0.98, opacity: 0.9 }}
      >
        <div className="flex flex-col gap-0.5 flex-1">
          {route.isMetro ? (
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2" />
                <path d="M6 16L9 8H11L12 12L13 8H15L18 16" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="w-7 h-7 rounded-full flex items-center justify-center bg-route-orange">
                <span className="text-xs font-extrabold text-white font-display">{route.number}</span>
              </div>
            </div>
          ) : (
            <span className="text-[44px] font-extrabold leading-none text-white font-display tracking-tight">{route.number}</span>
          )}
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[11px] font-bold text-white/90 bg-white/15 rounded-full px-2 py-0.5">⊕ {route.direction}</span>
          </div>
          <span className="text-[11px] font-semibold text-white/80 mt-0.5">{route.destination}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-20">
            <ETACountdown initialMinutes={route.eta} color={color} highlighted />
          </div>
          <motion.button
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: isFav ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)" }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(route.id);
            }}
            whileTap={{ scale: 0.8 }}
            animate={isFav ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className="w-4 h-4"
              fill={isFav ? "white" : "none"}
              stroke="white"
              strokeWidth={2}
            />
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col relative overflow-hidden" style={{ height: "100%" }}>
      <motion.div
        animate={{ height: MAP_HEIGHTS[snapIndex] }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="shrink-0"
      >
        <MapArea />
      </motion.div>

      <motion.div
        drag="y"
        dragConstraints={{ top: SNAP_POINTS[2], bottom: SNAP_POINTS[0] }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        animate={controls}
        className="flex flex-col flex-1 rounded-t-3xl -mt-4 relative z-10 bg-card"
        style={{
          touchAction: "none",
          boxShadow: isLifted ? "var(--sheet-shadow-lifted)" : "var(--sheet-shadow)",
        }}
      >
        <div className="flex justify-center pt-3 pb-1">
          <motion.div
            className="w-10 h-1 rounded-full bg-muted-foreground/30"
            animate={{ width: isLifted ? 40 : 28, opacity: isLifted ? 1 : 0.5 }}
            transition={{ duration: 0.2 }}
          />
        </div>

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

        <div className="w-full mt-1">
          {sortedRoutes.map((route, i) => renderRouteCard(route, i === sortedRoutes.length - 1))}
        </div>
      </motion.div>
    </div>
  );
};

export default NearbyScreen;
