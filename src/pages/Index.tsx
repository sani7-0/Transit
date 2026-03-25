import { useState } from "react";
import NearbyScreen from "@/components/transit/screens/NearbyScreen";
import RouteDetailScreen from "@/components/transit/screens/RouteDetailScreen";
import TripDetailScreen from "@/components/transit/screens/TripDetailScreen";
import SearchScreen from "@/components/transit/screens/SearchScreen";
import ScheduleScreen from "@/components/transit/screens/ScheduleScreen";
import BottomNav from "@/components/transit/BottomNav";

export type Screen =
  | "nearby"
  | "route-detail"
  | "trip-detail"
  | "search"
  | "schedule";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("nearby");

  const renderScreen = () => {
    switch (screen) {
      case "nearby":
        return <NearbyScreen onNavigate={setScreen} />;
      case "route-detail":
        return <RouteDetailScreen onNavigate={setScreen} />;
      case "trip-detail":
        return <TripDetailScreen onNavigate={setScreen} />;
      case "search":
        return <SearchScreen onNavigate={setScreen} />;
      case "schedule":
        return <ScheduleScreen onNavigate={setScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-start justify-center">
      {/* Phone frame */}
      <div className="w-full max-w-[390px] h-[844px] md:my-6 md:rounded-[2.5rem] md:overflow-hidden md:shadow-2xl bg-card relative flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {renderScreen()}
        </div>
        <BottomNav currentScreen={screen} onNavigate={setScreen} />
      </div>
    </div>
  );
};

export default Index;
