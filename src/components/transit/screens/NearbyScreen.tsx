import { useState } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import MapArea from "@/components/transit/MapArea";
import SearchBar from "@/components/transit/SearchBar";
import type { Screen, RouteId } from "@/pages/Index";
import ETACountdown from "@/components/transit/ETACountdown";

interface NearbyScreenProps {
  onNavigate: (screen: Screen, routeId?: RouteId) => void;
}

const NearbyScreen = ({ onNavigate }: NearbyScreenProps) => {
  const [mapExpanded, setMapExpanded] = useState(false);
  const controls = useAnimation();
  const y = useMotionValue(0);
  const mapHeight = useTransform(y, [0, -200], [280, 560]);

  const handleDragEnd = (_: any, info: { offset: { y: number }; velocity: { y: number } }) => {
    if (info.offset.y < -80 || info.velocity.y < -300) {
      setMapExpanded(true);
    } else {
      setMapExpanded(false);
      controls.start({ y: 0 });
    }
  };

  return (
    <div className="flex flex-col relative">
      <motion.div
        animate={{ height: mapExpanded ? 560 : 280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <MapArea />
      </motion.div>

      <motion.div
        drag={mapExpanded ? "y" : undefined}
        dragConstraints={{ top: 0, bottom: 200 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 80) setMapExpanded(false);
        }}
      >
        {mapExpanded && (
          <div className="flex justify-center py-2 bg-card">
            <button
              onClick={() => setMapExpanded(false)}
              className="w-10 h-1.5 rounded-full bg-muted-foreground/30"
            />
          </div>
        )}
      </motion.div>

      <motion.div
        drag={!mapExpanded ? "y" : undefined}
        dragConstraints={{ top: -200, bottom: 0 }}
        dragElastic={0.3}
        onDragEnd={handleDragEnd}
        style={!mapExpanded ? { y } : undefined}
        animate={controls}
      >
        <div onClick={() => onNavigate("search")} className="cursor-pointer">
          <SearchBar />
        </div>

        {/* Drag handle */}
        {!mapExpanded && (
          <div className="flex justify-center py-2 bg-card">
            <div className="w-10 h-1.5 rounded-full bg-muted-foreground/20" />
          </div>
        )}

        {/* Route cards */}
        <div className="w-full px-0 py-0">
          {/* Bus 55 - Green */}
          <motion.div
            className="w-full px-5 py-3.5 flex items-center justify-between cursor-pointer transition-opacity"
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

          {/* Metro 2 - Purple */}
          <motion.div
            className="w-full px-5 py-3.5 flex items-center justify-between cursor-pointer transition-opacity"
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

          {/* Bus 15 - Blue */}
          <motion.div
            className="w-full px-5 py-3.5 flex items-center justify-between cursor-pointer transition-opacity"
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
