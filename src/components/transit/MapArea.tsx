import { Settings, Navigation } from "lucide-react";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markers = [
  { pos: [45.5088, -73.5700] as [number, number], color: "hsl(152,60%,32%)", label: "🚌", name: "Bus 55" },
  { pos: [45.5095, -73.5650] as [number, number], color: "hsl(210,75%,45%)", label: "🚌", name: "Bus 15" },
  { pos: [45.5078, -73.5680] as [number, number], color: "hsl(268,50%,40%)", label: "Ⓜ", name: "Metro Line 2" },
];

const MapArea = () => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [45.5088, -73.5678],
      zoom: 15,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png").addTo(map);

    markers.forEach((m) => {
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:28px;height:28px;border-radius:50%;background:${m.color};display:flex;align-items:center;justify-content:center;font-size:11px;box-shadow:0 2px 6px rgba(0,0,0,.25);cursor:pointer">${m.label}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      L.marker(m.pos, { icon }).addTo(map).bindPopup(m.name);
    });

    const userIcon = L.divIcon({
      className: "",
      html: `<div style="width:14px;height:14px;border-radius:50%;background:hsl(210,100%,55%);border:3px solid white;box-shadow:0 0 8px rgba(59,130,246,.4)"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
    L.marker([45.5085, -73.5670], { icon: userIcon }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[280px] overflow-hidden">
      <div ref={containerRef} className="w-full h-full z-0" />

      <button className="absolute top-4 left-4 z-[1000] w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
        <Settings className="w-4 h-4 text-muted-foreground" />
      </button>

      <button className="absolute top-4 right-4 z-[1000] w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
        <Navigation className="w-4 h-4 text-muted-foreground" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000]">
        <span className="text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase bg-card/60 backdrop-blur-sm px-2 py-0.5 rounded">
          Quartier des Spectacles
        </span>
      </div>
    </div>
  );
};

export default MapArea;
