import MapArea from "@/components/transit/MapArea";
import SearchBar from "@/components/transit/SearchBar";
import type { Screen } from "@/pages/Index";

interface NearbyScreenProps {
  onNavigate: (screen: Screen) => void;
}

const NearbyScreen = ({ onNavigate }: NearbyScreenProps) => {
  return (
    <div className="flex flex-col">
      {/* Map */}
      <MapArea />

      {/* Search bar */}
      <div onClick={() => onNavigate("search")} className="cursor-pointer">
        <SearchBar />
      </div>

      {/* Route cards */}
      <div
        className="w-full px-0 py-0 cursor-pointer"
        onClick={() => onNavigate("route-detail")}
      >
        {/* Bus 55 - Green */}
        <div className="w-full px-5 py-3.5 flex items-center justify-between" style={{ backgroundColor: "hsl(152,60%,42%)" }}>
          <div className="flex flex-col gap-0.5">
            <span className="text-[44px] font-extrabold leading-none text-card-foreground font-display tracking-tight">55</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-card-foreground/90 bg-card/15 rounded-full px-2 py-0.5">⊕ North</span>
            </div>
            <span className="text-[11px] font-semibold text-card-foreground/80 mt-0.5">Station Saint-Laurent / de Maisonneuve</span>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-baseline">
              <span className="text-[30px] font-extrabold leading-none text-card-foreground font-display">3</span>
              <span className="text-[7px] font-bold text-card-foreground/70 ml-0.5 mb-3">ᐩ</span>
            </div>
            <span className="text-[10px] font-semibold text-card-foreground/75">minutes</span>
          </div>
        </div>

        {/* Metro 2 - Purple with orange bubble */}
        <div className="w-full px-5 py-3.5 flex items-center justify-between" style={{ backgroundColor: "hsl(270,45%,38%)" }}>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2" />
                <path d="M6 16L9 8H11L12 12L13 8H15L18 16" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(30,95%,55%)" }}>
                <span className="text-xs font-extrabold text-card-foreground font-display">2</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] font-bold text-card-foreground/90 bg-card/15 rounded-full px-2 py-0.5">⊕ Côte-Vertu</span>
            </div>
            <span className="text-[11px] font-semibold text-card-foreground/80 mt-0.5">Station Berri-UQAM</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[30px] font-extrabold leading-none text-card-foreground font-display">2</span>
            <span className="text-[10px] font-semibold text-card-foreground/75">minutes</span>
          </div>
        </div>

        {/* Bus 15 - Blue */}
        <div className="w-full px-5 py-3.5 flex items-center justify-between" style={{ backgroundColor: "hsl(200,85%,52%)" }}>
          <div className="flex flex-col gap-0.5">
            <span className="text-[44px] font-extrabold leading-none text-card-foreground font-display tracking-tight">15</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-card-foreground/90 bg-card/15 rounded-full px-2 py-0.5">⊕ West</span>
            </div>
            <span className="text-[11px] font-semibold text-card-foreground/80 mt-0.5">De Maisonneuve / No 205</span>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-baseline">
              <span className="text-[30px] font-extrabold leading-none text-card-foreground font-display">5</span>
              <span className="text-[7px] font-bold text-card-foreground/70 ml-0.5 mb-3">ᐩ</span>
            </div>
            <span className="text-[10px] font-semibold text-card-foreground/75">minutes</span>
          </div>
        </div>

        {/* BIXI - Red */}
        <div className="w-full px-5 py-4 flex items-center justify-between" style={{ backgroundColor: "hsl(5,75%,58%)" }}>
          <div className="flex flex-col gap-1">
            <span className="text-[26px] font-black italic text-card-foreground font-display tracking-tight leading-none">BIXI</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px]">🚲</span>
              <span className="text-[11px] font-semibold text-card-foreground/90">Sanguinet / de Maisonneuve</span>
            </div>
          </div>
          <button className="bg-card/20 rounded-lg px-3.5 py-2">
            <span className="text-[11px] font-bold text-card-foreground">Unlock a bike</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NearbyScreen;
