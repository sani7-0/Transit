import MapArea from "@/components/transit/MapArea";
import SearchBar from "@/components/transit/SearchBar";
import RouteCard from "@/components/transit/RouteCard";
import MetroRouteCard from "@/components/transit/MetroRouteCard";
import BikeCard from "@/components/transit/BikeCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-start justify-center">
      {/* Phone frame */}
      <div className="w-full max-w-[390px] min-h-screen md:min-h-0 md:my-8 md:rounded-[2.5rem] md:overflow-hidden md:shadow-2xl md:border md:border-border bg-card">
        {/* Map */}
        <MapArea />

        {/* Search bar */}
        <SearchBar />

        {/* Route cards */}
        <div className="flex flex-col">
          <RouteCard
            routeNumber="55"
            direction="North"
            stopName="Station Saint-Laurent / de Maisonneuve"
            etaMinutes={3}
            color="hsl(152,60%,42%)"
          />

          <MetroRouteCard
            lineNumber="2"
            direction="Côte-Vertu"
            stationName="Station Berri-UQAM"
            etaMinutes={2}
            lineColor="hsl(30,95%,55%)"
            cardColor="hsl(270,45%,38%)"
          />

          <RouteCard
            routeNumber="15"
            direction="West"
            stopName="De Maisonneuve / No 205"
            etaMinutes={5}
            color="hsl(200,85%,52%)"
          />

          <BikeCard />
        </div>

        {/* Bottom safe area */}
        <div className="h-8 bg-[hsl(5,75%,58%)]" />
      </div>
    </div>
  );
};

export default Index;
