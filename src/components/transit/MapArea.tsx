import { Settings, Navigation } from "lucide-react";

const MapArea = () => {
  return (
    <div className="relative w-full h-[280px] bg-[hsl(45,30%,92%)] overflow-hidden">
      {/* Fake map grid lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice">
        {/* Street grid */}
        <line x1="80" y1="0" x2="80" y2="280" stroke="hsl(0,0%,88%)" strokeWidth="8" />
        <line x1="160" y1="0" x2="160" y2="280" stroke="hsl(0,0%,88%)" strokeWidth="12" />
        <line x1="240" y1="0" x2="240" y2="280" stroke="hsl(0,0%,88%)" strokeWidth="8" />
        <line x1="320" y1="0" x2="320" y2="280" stroke="hsl(0,0%,88%)" strokeWidth="8" />
        <line x1="0" y1="70" x2="400" y2="70" stroke="hsl(0,0%,88%)" strokeWidth="8" />
        <line x1="0" y1="140" x2="400" y2="140" stroke="hsl(0,0%,88%)" strokeWidth="8" />
        <line x1="0" y1="210" x2="400" y2="210" stroke="hsl(0,0%,88%)" strokeWidth="8" />

        {/* Transit lines */}
        <line x1="155" y1="0" x2="170" y2="280" stroke="hsl(152,60%,42%)" strokeWidth="3" />
        <line x1="230" y1="0" x2="250" y2="280" stroke="hsl(200,85%,52%)" strokeWidth="3" />
        <line x1="60" y1="130" x2="400" y2="145" stroke="hsl(30,95%,55%)" strokeWidth="3" />
        <line x1="300" y1="0" x2="310" y2="280" stroke="hsl(45,80%,55%)" strokeWidth="2.5" />

        {/* Parks / blocks */}
        <rect x="85" y="75" width="70" height="60" rx="4" fill="hsl(120,25%,85%)" />
        <rect x="245" y="145" width="70" height="60" rx="4" fill="hsl(120,25%,85%)" />

        {/* Blue dot - user location */}
        <circle cx="210" cy="150" r="7" fill="hsl(210,100%,55%)" />
        <circle cx="210" cy="150" r="12" fill="hsl(210,100%,55%)" fillOpacity="0.2" />
      </svg>

      {/* Map markers */}
      <div className="absolute" style={{ top: 30, left: 60 }}>
        <div className="w-7 h-7 rounded-full bg-route-green flex items-center justify-center shadow-md">
          <span className="text-[10px] font-extrabold text-card-foreground">😎</span>
        </div>
      </div>
      <div className="absolute" style={{ top: 55, left: 140 }}>
        <MapPin color="hsl(152,60%,42%)" label="🚌" />
      </div>
      <div className="absolute" style={{ top: 90, left: 200 }}>
        <MapPin color="hsl(5,75%,58%)" label="🚲" />
      </div>
      <div className="absolute" style={{ top: 40, left: 280 }}>
        <MapPin color="hsl(200,85%,52%)" label="🚌" />
      </div>
      <div className="absolute" style={{ top: 120, left: 100 }}>
        <MapPin color="hsl(270,50%,40%)" label="Ⓜ" />
      </div>
      <div className="absolute" style={{ top: 70, left: 320 }}>
        <MapPin color="hsl(5,75%,58%)" label="🚲" />
      </div>

      {/* Settings gear */}
      <button className="absolute top-4 left-4 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
        <Settings className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Navigation button */}
      <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
        <Navigation className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Neighborhood label */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
        <span className="text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase">
          Quartier des Spectacles
        </span>
      </div>
    </div>
  );
};

const MapPin = ({ color, label }: { color: string; label: string }) => (
  <div className="flex flex-col items-center">
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center shadow-md text-[9px]"
      style={{ backgroundColor: color }}
    >
      <span className="text-card-foreground">{label}</span>
    </div>
    <div
      className="w-0 h-0 -mt-[2px]"
      style={{
        borderLeft: "4px solid transparent",
        borderRight: "4px solid transparent",
        borderTop: `5px solid ${color}`,
      }}
    />
  </div>
);

export default MapArea;
