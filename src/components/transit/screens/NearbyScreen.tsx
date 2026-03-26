import { useState, useRef } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import MapArea from "@/components/transit/MapArea";
import SearchBar from "@/components/transit/SearchBar";
import type { Screen, RouteId } from "@/pages/Index";
import ETACountdown from "@/components/transit/ETACountdown";

interface NearbyScreenProps {
  onNavigate: (screen: Screen, routeId?: RouteId) => void;
}

// Snap points: 0 = default (map 280), 1 = half expanded (map 420), 2 = full map (560)
const SNAP_POINTS = [0, -140, -280];
const MAP_HEIGHTS = [280, 420, 560];

const NearbyScreen = ({ onNavigate }: NearbyScreenProps) => {
  const [snapIndex, setSnapIndex] = useState(0);
  const controls = useAnimation();

  const handleDragEnd = (_: any, info: PanInfo) => {
    const currentY = SNAP_POINTS[snapIndex];
    const projectedY = currentY + info.offset.y + info.velocity.y * 0.2;

    // Find closest snap point
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

  return (
    <div className="flex flex-col relative overflow-hidden" style={{ height: "100%" }}>
      {/* Map */}
      <motion.div
        animate={{ height: MAP_HEIGHTS[snapIndex] }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="shrink-0"
      >
        <MapArea />
      </motion.div>

      {/* Draggable bottom sheet */}
      <motion.div
        drag="y"
        dragConstraints={{ top: SNAP_POINTS[2], bottom: SNAP_POINTS[0] }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        animate={controls}
        className="flex flex-col flex-1"
        style={{ touchAction: "none" }}
      >
        {/* Search bar as drag handle */}
        <div onClick={() => onNavigate("search")} className="cursor-pointer">
          <SearchBar />
        </div>

        {/* Drag handle indicator */}
        <div className="flex justify-center py-1.5 bg-card">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/25" />
        </div>

        {/* Route cards */}
        <div className="w-full">
          <motion.div
            className="w-full px-5 py-3.5 flex items-center justify-between cursor-pointer"
            style={{ backgroundColor: "hsl(152,60%,32%)" }}
            onClick={() => onNavigate("route-detail", "55")}
            whileTap={{ scale: 0.98, opacity: 0.9 }}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[44px] font-extrabold leading-none text-white font-display tracking-tight">55</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-white/90 bg-white/15 rounded-full px-2 py-0.5">⊕ North</span>
              </div>
              <span className="text-[11px] font-semibold text-white/80 mt-0.5">Station Saint-Laurent</span>
            </div>
            <div className="w-20">
              <ETACountdown initialMinutes={3} color="hsl(152,60%,32%)" highlighted />
            </div>
          </motion.div>

          <motion.div
            className="w-full px-5 py-3.5 flex items-center justify-between cursor-pointer"
            style={{ backgroundColor: "hsl(268,50%,40%)" }}
            onClick={() => onNavigate("route-detail", "metro2")}
            whileTap={{ scale: 0.98, opacity: 0.9 }}
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2" />
                  <path d="M6 16L9 8H11L12 12L13 8H15L18 16" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(24,90%,50%)" }}>
                  <span className="text-xs font-extrabold text-white font-display">2</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] font-bold text-white/90 bg-white/15 rounded-full px-2 py-0.5">⊕ Côte-Vertu</span>
              </div>
              <span className="text-[11px] font-semibold text-white/80 mt-0.5">Station Berri-UQAM</span>
            </div>
            <div className="w-20">
              <ETACountdown initialMinutes={2} color="hsl(268,50%,40%)" highlighted />
            </div>
          </motion.div>

          <motion.div
            className="w-full px-5 py-3.5 flex items-center justify-between cursor-pointer"
            style={{ backgroundColor: "hsl(210,75%,45%)" }}
            onClick={() => onNavigate("route-detail", "15")}
            whileTap={{ scale: 0.98, opacity: 0.9 }}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[44px] font-extrabold leading-none text-white font-display tracking-tight">15</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-white/90 bg-white/15 rounded-full px-2 py-0.5">⊕ West</span>
              </div>
              <span className="text-[11px] font-semibold text-white/80 mt-0.5">De Maisonneuve / No 205</span>
            </div>
            <div className="w-20">
              <ETACountdown initialMinutes={5} color="hsl(210,75%,45%)" highlighted />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NearbyScreen;
