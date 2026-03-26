import { useState } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import MapArea from "@/components/transit/MapArea";
import SearchBar from "@/components/transit/SearchBar";
import type { Screen, RouteId } from "@/pages/Index";
import ETACountdown from "@/components/transit/ETACountdown";

interface NearbyScreenProps {
  onNavigate: (screen: Screen, routeId?: RouteId) => void;
}

const SNAP_POINTS = [0, -140, -280];
const MAP_HEIGHTS = [280, 420, 560];

const NearbyScreen = ({ onNavigate }: NearbyScreenProps) => {
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
        className="flex flex-col flex-1 rounded-t-3xl -mt-4 relative z-10 bg-card"
        style={{
          touchAction: "none",
          boxShadow: isLifted
            ? "var(--sheet-shadow-lifted)"
            : "var(--sheet-shadow)",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <motion.div
            className="w-10 h-1 rounded-full bg-muted-foreground/30"
            animate={{ width: isLifted ? 40 : 28, opacity: isLifted ? 1 : 0.5 }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Search bar as tap target */}
        <div onClick={() => onNavigate("search")} className="cursor-pointer px-1">
          <SearchBar />
        </div>

        {/* Route cards */}
        <div className="w-full mt-1">
          <motion.div
            className="w-full px-5 py-3.5 flex items-center justify-between cursor-pointer border-b border-border/10"
            style={{ backgroundColor: "hsl(var(--route-green))" }}
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
              <ETACountdown initialMinutes={3} color="hsl(var(--route-green))" highlighted />
            </div>
          </motion.div>

          <motion.div
            className="w-full px-5 py-3.5 flex items-center justify-between cursor-pointer border-b border-border/10"
            style={{ backgroundColor: "hsl(var(--route-purple))" }}
            onClick={() => onNavigate("route-detail", "metro2")}
            whileTap={{ scale: 0.98, opacity: 0.9 }}
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2" />
                  <path d="M6 16L9 8H11L12 12L13 8H15L18 16" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="w-7 h-7 rounded-full flex items-center justify-center bg-route-orange">
                  <span className="text-xs font-extrabold text-white font-display">2</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] font-bold text-white/90 bg-white/15 rounded-full px-2 py-0.5">⊕ Côte-Vertu</span>
              </div>
              <span className="text-[11px] font-semibold text-white/80 mt-0.5">Station Berri-UQAM</span>
            </div>
            <div className="w-20">
              <ETACountdown initialMinutes={2} color="hsl(var(--route-purple))" highlighted />
            </div>
          </motion.div>

          <motion.div
            className="w-full px-5 py-3.5 flex items-center justify-between cursor-pointer"
            style={{ backgroundColor: "hsl(var(--route-blue))" }}
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
              <ETACountdown initialMinutes={5} color="hsl(var(--route-blue))" highlighted />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NearbyScreen;
