import { Search, ArrowUpRight, MapPin, Home, Briefcase, ChevronRight, MoreHorizontal } from "lucide-react";
import type { Screen } from "@/pages/Index";

interface SearchScreenProps {
  onNavigate: (screen: Screen) => void;
}

const SearchScreen = ({ onNavigate }: SearchScreenProps) => {
  return (
    <div className="flex flex-col bg-card">
      {/* Green header with search */}
      <div className="bg-route-green px-4 pt-6 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2.5 bg-[hsl(152,50%,30%)] rounded-full px-4 py-3">
            <Search className="w-4 h-4 text-card-foreground/70" />
            <span className="text-sm font-semibold text-card-foreground/70 font-display">
              Line or destination
            </span>
          </div>
          <button className="w-10 h-10 rounded-full bg-[hsl(152,50%,30%)] flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5 text-card-foreground" />
          </button>
        </div>
      </div>

      {/* Choose on map */}
      <button
        onClick={() => onNavigate("nearby")}
        className="flex items-center justify-between px-5 py-4 border-b border-border/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
            <MapPin className="w-4 h-4 text-card" />
          </div>
          <span className="text-sm font-bold text-foreground">Choose on map</span>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Saved places */}
      <SearchItem icon={<Home className="w-4 h-4" />} title="Home" subtitle="22 Chapel St" />
      <SearchItem icon={<Briefcase className="w-4 h-4" />} title="Studio" subtitle="7 Silver St" />
      <SearchItem icon={<MapPin className="w-4 h-4" />} title="Tiltyard" subtitle="Whitehall Pl" />

      {/* Recent header */}
      <div className="px-5 pt-5 pb-2">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent</span>
      </div>

      {/* Recent places */}
      <SearchItem icon={<MapPin className="w-4 h-4" />} title="Botanical Garden" subtitle="Montreal" filled={false} />
      <SearchItem icon={<MapPin className="w-4 h-4" />} title="Cinéma Beaubien" subtitle="Montreal" filled={false} />
      <SearchItem icon={<MapPin className="w-4 h-4" />} title="Jean-Talon Market" subtitle="Montreal" filled={false} />
    </div>
  );
};

const SearchItem = ({
  icon,
  title,
  subtitle,
  filled = true,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  filled?: boolean;
}) => (
  <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/20">
    <div className="flex items-center gap-3">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          filled ? "bg-foreground text-card" : "bg-muted text-muted-foreground"
        }`}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-foreground">{title}</span>
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      </div>
    </div>
    <button className="p-1">
      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
    </button>
  </div>
);

export default SearchScreen;
