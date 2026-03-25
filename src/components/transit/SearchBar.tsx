import { Search, Home } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 bg-route-green">
      {/* Search input */}
      <div className="flex-1 flex items-center gap-2.5 bg-[hsl(152,50%,30%)] rounded-full px-4 py-2.5">
        <Search className="w-4 h-4 text-card-foreground/70" />
        <span className="text-sm font-semibold text-card-foreground/70 font-display">
          Where to?
        </span>
      </div>

      {/* Home button */}
      <div className="flex flex-col items-center gap-0.5">
        <div className="w-9 h-9 rounded-xl bg-card/20 flex items-center justify-center">
          <Home className="w-5 h-5 text-card-foreground" />
        </div>
        <span className="text-[9px] font-bold text-card-foreground/80">12 min</span>
      </div>
    </div>
  );
};

export default SearchBar;
