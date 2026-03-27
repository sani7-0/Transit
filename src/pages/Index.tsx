import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NearbyScreen from "@/components/transit/screens/NearbyScreen";
import { useFavorites } from "@/hooks/useFavorites";
import RouteDetailScreen from "@/components/transit/screens/RouteDetailScreen";
import TripDetailScreen from "@/components/transit/screens/TripDetailScreen";
import SearchScreen from "@/components/transit/screens/SearchScreen";
import ScheduleScreen from "@/components/transit/screens/ScheduleScreen";
import PlannerScreen from "@/components/transit/screens/PlannerScreen";
import BottomNav from "@/components/transit/BottomNav";

export type Screen =
  | "nearby"
  | "route-detail"
  | "trip-detail"
  | "search"
  | "schedule"
  | "planner";

export type RouteId = "55" | "metro2" | "15";

const screenOrder: Record<Screen, number> = {
  nearby: 0,
  search: 1,
  planner: 2,
  schedule: 3,
  "route-detail": 4,
  "trip-detail": 5,
};

const Index = () => {
  const [screen, setScreen] = useState<Screen>("nearby");
  const [selectedRoute, setSelectedRoute] = useState<RouteId>("55");
  const [direction, setDirection] = useState(1);
  const [isDark, setIsDark] = useState(false);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const handleNavigate = (s: Screen, routeId?: RouteId) => {
    setDirection(screenOrder[s] > screenOrder[screen] ? 1 : -1);
    setScreen(s);
    if (routeId) setSelectedRoute(routeId);
  };

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const renderScreen = () => {
    switch (screen) {
      case "nearby":
        return <NearbyScreen onNavigate={handleNavigate} favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case "route-detail":
        return <RouteDetailScreen onNavigate={handleNavigate} selectedRoute={selectedRoute} isFavorite={isFavorite(selectedRoute)} onToggleFavorite={toggleFavorite} />;
      case "trip-detail":
        return <TripDetailScreen onNavigate={handleNavigate} />;
      case "search":
        return <SearchScreen onNavigate={handleNavigate} />;
      case "schedule":
        return <ScheduleScreen onNavigate={handleNavigate} />;
      case "planner":
        return <PlannerScreen onNavigate={handleNavigate} />;
    }
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "30%" : "-30%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-30%" : "30%",
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-background flex items-start justify-center">
      <div className="w-full max-w-[390px] h-[844px] md:my-6 md:rounded-[2.5rem] md:overflow-hidden md:shadow-2xl bg-card relative flex flex-col overflow-hidden">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDark}
          className="absolute top-2 right-2 z-50 w-7 h-7 rounded-full bg-muted/80 flex items-center justify-center text-xs"
        >
          {isDark ? "☀️" : "🌙"}
        </button>

        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={screen}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="min-h-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>
        <BottomNav currentScreen={screen} onNavigate={handleNavigate} />
      </div>
    </div>
  );
};

export default Index;
