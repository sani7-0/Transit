import { Settings, Navigation } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const createIcon = (color: string, label: string) =>
  L.divIcon({
    className: "",
    html: `<div style="width:28px;height:28px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;font-size:11px;box-shadow:0 2px 6px rgba(0,0,0,.3)">${label}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

const markers = [
  { pos: [45.5088, -73.5700] as [number, number], color: "hsl(152,60%,42%)", label: "🚌", name: "Bus 55" },
  { pos: [45.5095, -73.5650] as [number, number], color: "hsl(200,85%,52%)", label: "🚌", name: "Bus 15" },
  { pos: [45.5078, -73.5680] as [number, number], color: "hsl(270,50%,40%)", label: "Ⓜ", name: "Metro" },
  { pos: [45.5070, -73.5630] as [number, number], color: "hsl(5,75%,58%)", label: "🚲", name: "BIXI" },
  { pos: [45.5100, -73.5720] as [number, number], color: "hsl(5,75%,58%)", label: "🚲", name: "BIXI" },
];

const MapArea = () => {
  return (
    <div className="relative w-full h-[280px] overflow-hidden">
      <MapContainer
        center={[45.5088, -73.5678]}
        zoom={15}
        zoomControl={false}
        attributionControl={false}
        className="w-full h-full z-0"
        style={{ background: "hsl(45,30%,92%)" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        {markers.map((m, i) => (
          <Marker key={i} position={m.pos} icon={createIcon(m.color, m.label)}>
            <Popup>{m.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Settings gear */}
      <button className="absolute top-4 left-4 z-[1000] w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
        <Settings className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Navigation button */}
      <button className="absolute top-4 right-4 z-[1000] w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
        <Navigation className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Neighborhood label */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[1000]">
        <span className="text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase bg-card/60 backdrop-blur-sm px-2 py-0.5 rounded">
          Quartier des Spectacles
        </span>
      </div>
    </div>
  );
};

export default MapArea;
