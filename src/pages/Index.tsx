import { useState } from "react";
import NearbyScreen from "@/components/transit/screens/NearbyScreen";
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

const Index = () => {
  const [screen, setScreen] = useState<Screen>("nearby");
  const [selectedRoute, setSelectedRoute] = useState<RouteId>("55");

  const handleNavigate = (s: Screen, routeId?: RouteId) => {
    setScreen(s);
    if (routeId) setSelectedRoute(routeId);
  };

  const renderScreen = () => {
    switch (screen) {
      case "nearby":
        return <NearbyScreen onNavigate={handleNavigate} />;
      case "route-detail":
        return <RouteDetailScreen onNavigate={handleNavigate} selectedRoute={selectedRoute} />;
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

  return (
    <div className="min-h-screen bg-muted flex items-start justify-center">
      <div className="w-full max-w-[390px] h-[844px] md:my-6 md:rounded-[2.5rem] md:overflow-hidden md:shadow-2xl bg-card relative flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {renderScreen()}
        </div>
        <BottomNav currentScreen={screen} onNavigate={handleNavigate} />
      </div>
    </div>
  );
};

export default Index;
