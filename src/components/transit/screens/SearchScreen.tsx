import { useState } from "react";
import { Search, ArrowUpRight, MapPin, Home, Briefcase, ChevronRight, MoreHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Screen } from "@/pages/Index";

interface SearchScreenProps {
  onNavigate: (screen: Screen) => void;
}

const savedPlaces = [
  { icon: Home, title: "Home", subtitle: "22 Chapel St", filled: true },
  { icon: Briefcase, title: "Studio", subtitle: "7 Silver St", filled: true },
  { icon: MapPin, title: "Tiltyard", subtitle: "Whitehall Pl", filled: true },
];

const recentPlaces = [
  { title: "Botanical Garden", subtitle: "Montreal" },
  { title: "Cinéma Beaubien", subtitle: "Montreal" },
  { title: "Jean-Talon Market", subtitle: "Montreal" },
  { title: "Parc La Fontaine", subtitle: "Montreal" },
];

const allPlaces = [
  ...savedPlaces.map((p) => p.title),
  ...recentPlaces.map((p) => p.title),
  "Mont-Royal Station",
  "McGill University",
  "Old Port",
  "Place des Arts",
  "Berri-UQAM Station",
];

const SearchScreen = ({ onNavigate }: SearchScreenProps) => {
  const [query, setQuery] = useState("");
  const filtered = query.trim()
    ? allPlaces.filter((p) => p.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="flex flex-col bg-card min-h-full">
      {/* Green header with functional search */}
      <div className="bg-primary px-4 pt-6 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2.5 bg-primary-foreground/15 rounded-full px-4 py-3">
            <Search className="w-4 h-4 text-primary-foreground/70" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Line or destination"
              className="bg-transparent text-sm font-semibold text-primary-foreground placeholder:text-primary-foreground/50 outline-none flex-1 font-display"
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <X className="w-4 h-4 text-primary-foreground/70" />
              </button>
            )}
          </div>
          <button
            onClick={() => onNavigate("nearby")}
            className="w-10 h-10 rounded-full bg-primary-foreground/15 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>

      {/* Search results */}
      <AnimatePresence mode="wait">
        {query.trim() ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col"
          >
            {filtered.length > 0 ? (
              filtered.map((place) => (
                <motion.button
                  key={place}
                  className="flex items-center gap-3 px-5 py-3.5 border-b border-border/20 text-left active:bg-muted/50 transition-colors"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate("planner")}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-foreground">{place}</span>
                </motion.button>
              ))
            ) : (
              <div className="flex flex-col items-center py-12 px-6">
                <Search className="w-8 h-8 text-muted-foreground mb-3" />
                <span className="text-sm font-bold text-foreground">No results</span>
                <span className="text-xs text-muted-foreground mt-1">Try a different search term</span>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Choose on map */}
            <button
              onClick={() => onNavigate("nearby")}
              className="flex items-center justify-between px-5 py-4 border-b border-border/30 w-full active:bg-muted/50 transition-colors"
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
            {savedPlaces.map((item) => (
              <SearchItem
                key={item.title}
                icon={<item.icon className="w-4 h-4" />}
                title={item.title}
                subtitle={item.subtitle}
                filled
                onTap={() => onNavigate("planner")}
              />
            ))}

            {/* Recent header */}
            <div className="px-5 pt-5 pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent</span>
            </div>

            {/* Recent places */}
            {recentPlaces.map((item) => (
              <SearchItem
                key={item.title}
                icon={<MapPin className="w-4 h-4" />}
                title={item.title}
                subtitle={item.subtitle}
                filled={false}
                onTap={() => onNavigate("planner")}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SearchItem = ({
  icon,
  title,
  subtitle,
  filled = true,
  onTap,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  filled?: boolean;
  onTap?: () => void;
}) => (
  <motion.div
    className="flex items-center justify-between px-5 py-3.5 border-b border-border/20 cursor-pointer active:bg-muted/50 transition-colors"
    whileTap={{ scale: 0.98 }}
    onClick={onTap}
  >
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
    <button className="p-1" onClick={(e) => e.stopPropagation()}>
      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
    </button>
  </motion.div>
);

export default SearchScreen;
