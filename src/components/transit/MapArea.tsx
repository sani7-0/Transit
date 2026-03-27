import { Settings, Navigation } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { RouteId } from "@/pages/Index";

const routeIdMap: RouteId[] = ["55", "15", "metro2"];

const staticMarkers = [
  { pos: [45.5088, -73.5700] as [number, number], color: "hsl(152,60%,32%)", label: "🚌", name: "Bus 55", routeId: "55" as RouteId },
  { pos: [45.5095, -73.5650] as [number, number], color: "hsl(210,75%,45%)", label: "🚌", name: "Bus 15", routeId: "15" as RouteId },
  { pos: [45.5078, -73.5680] as [number, number], color: "hsl(268,50%,40%)", label: "Ⓜ", name: "Metro Line 2", routeId: "metro2" as RouteId },
];

const routePaths: { color: string; routeId: RouteId; path: [number, number][] }[] = [
  {
    color: "hsl(152,60%,32%)",
    routeId: "55",
    path: [
      [45.5055, -73.5720], [45.5070, -73.5710], [45.5088, -73.5700],
      [45.5105, -73.5690], [45.5120, -73.5680],
    ],
  },
  {
    color: "hsl(210,75%,45%)",
    routeId: "15",
    path: [
      [45.5095, -73.5700], [45.5095, -73.5675], [45.5095, -73.5650],
      [45.5095, -73.5625], [45.5095, -73.5600],
    ],
  },
  {
    color: "hsl(268,50%,40%)",
    routeId: "metro2",
    path: [
      [45.5060, -73.5650], [45.5070, -73.5665], [45.5078, -73.5680],
      [45.5090, -73.5695], [45.5100, -73.5710],
    ],
  },
];

const lerp = (a: [number, number], b: [number, number], t: number): [number, number] => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];

const getPositionOnPath = (path: [number, number][], progress: number): [number, number] => {
  const totalSegments = path.length - 1;
  const segment = Math.min(Math.floor(progress * totalSegments), totalSegments - 1);
  const segProgress = (progress * totalSegments) - segment;
  return lerp(path[segment], path[segment + 1], segProgress);
};

interface MapAreaProps {
  onRouteClick?: (routeId: RouteId) => void;
}

const MapArea = ({ onRouteClick }: MapAreaProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const onRouteClickRef = useRef(onRouteClick);
  onRouteClickRef.current = onRouteClick;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [45.5088, -73.5678],
      zoom: 15,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png").addTo(map);

    // Draw clickable route lines
    routePaths.forEach((route) => {
      // Invisible wide polyline for easier clicking
      const hitArea = L.polyline(route.path, {
        color: "transparent",
        weight: 20,
        opacity: 0,
      }).addTo(map);

      // Visible dashed line
      const line = L.polyline(route.path, {
        color: route.color,
        weight: 4,
        opacity: 0.5,
        dashArray: "8 6",
      }).addTo(map);

      const handleClick = () => onRouteClickRef.current?.(route.routeId);

      // Hover effects on visible line
      hitArea.on("mouseover", () => {
        line.setStyle({ weight: 7, opacity: 0.9, dashArray: undefined });
        hitArea.getElement()?.style.setProperty("cursor", "pointer");
      });
      hitArea.on("mouseout", () => {
        line.setStyle({ weight: 4, opacity: 0.5, dashArray: "8 6" });
      });
      hitArea.on("click", handleClick);
      line.on("click", handleClick);
    });

    // Static stop markers
    staticMarkers.forEach((m) => {
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:28px;height:28px;border-radius:50%;background:${m.color};display:flex;align-items:center;justify-content:center;font-size:11px;box-shadow:0 2px 6px rgba(0,0,0,.25);cursor:pointer">${m.label}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      const marker = L.marker(m.pos, { icon }).addTo(map).bindPopup(m.name);
      marker.on("click", () => onRouteClickRef.current?.(m.routeId));
    });

    // User location
    const userIcon = L.divIcon({
      className: "",
      html: `<div style="width:14px;height:14px;border-radius:50%;background:hsl(210,100%,55%);border:3px solid white;box-shadow:0 0 8px rgba(59,130,246,.4)"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
    L.marker([45.5085, -73.5670], { icon: userIcon }).addTo(map);

    // Animated bus dots
    const busMarkers = routePaths.map((route) => {
      const dotIcon = L.divIcon({
        className: "",
        html: `<div style="width:12px;height:12px;border-radius:50%;background:${route.color};border:2px solid white;box-shadow:0 0 10px ${route.color},0 2px 6px rgba(0,0,0,.3)"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });
      return L.marker(route.path[0], { icon: dotIcon, zIndexOffset: 1000 }).addTo(map);
    });

    const speeds = [0.00004, 0.00003, 0.000035];
    const offsets = [0, 0.33, 0.66];
    const startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      routePaths.forEach((route, i) => {
        const progress = ((elapsed * speeds[i] * 1000 + offsets[i]) % 1);
        const pos = getPositionOnPath(route.path, progress);
        busMarkers[i].setLatLng(pos);
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    mapRef.current = map;

    return () => {
      cancelAnimationFrame(animFrameRef.current);
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
