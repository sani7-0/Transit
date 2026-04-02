import { useQuery, useMutation } from '@tanstack/react-query';
import { getRoutes, getStops, getRouteStops, getStopEtas, getRoute, getStop, getNearbyRoutes, getVehicles, getRouteShape, planTrip, Route, Stop, StopEta, Vehicle, RouteShape, TripPlanResponse } from '@/lib/api';

// Hook to get all routes
export const useRoutes = () => {
  return useQuery({
    queryKey: ['routes'],
    queryFn: getRoutes,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get all stops
export const useStops = () => {
  return useQuery({
    queryKey: ['stops'],
    queryFn: getStops,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get nearby routes based on location
export const useNearbyRoutes = (lat: number, lon: number, radius?: number) => {
  // Round coordinates to reduce cache misses
  const roundedLat = Math.round(lat * 100) / 100;
  const roundedLon = Math.round(lon * 100) / 100;
  
  return useQuery({
    queryKey: ['nearbyRoutes', roundedLat, roundedLon, radius],
    queryFn: () => getNearbyRoutes(roundedLat, roundedLon, radius),
    enabled: roundedLat !== 0 && roundedLon !== 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
};

// Hook to get all vehicles (including simulated)
export const useVehicles = () => {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehicles,
    refetchInterval: 10 * 1000, // Refetch every 10 seconds
    staleTime: 10 * 1000, // 10 seconds
  });
};

// Hook to get stops for a specific route
export const useRouteStops = (routeId: string) => {
  return useQuery({
    queryKey: ['routeStops', routeId],
    queryFn: () => getRouteStops(routeId),
    enabled: !!routeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get stop ETAs
export const useStopEtas = (stopId: string) => {
  return useQuery({
    queryKey: ['stopEtas', stopId],
    queryFn: () => getStopEtas(stopId),
    enabled: !!stopId,
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
    staleTime: 30 * 1000, // 30 seconds
  });
};

// Hook to get route details
export const useRoute = (routeId: string) => {
  return useQuery({
    queryKey: ['route', routeId],
    queryFn: () => getRoute(routeId),
    enabled: !!routeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get stop details
export const useStop = (stopId: string) => {
  return useQuery({
    queryKey: ['stop', stopId],
    queryFn: () => getStop(stopId),
    enabled: !!stopId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get route shape for map (cached for longer since shapes don't change)
export const useRouteShape = (routeId: string) => {
  return useQuery({
    queryKey: ['routeShape', routeId],
    queryFn: () => getRouteShape(routeId),
    enabled: !!routeId,
    staleTime: 30 * 60 * 1000, // 30 minutes - shapes rarely change
    gcTime: 60 * 60 * 1000, // Keep in cache for 1 hour
  });
};

// Hook to plan trip between stops
export const useTripPlan = (fromStopId: string | null, toStopId: string | null) => {
  return useQuery({
    queryKey: ['tripPlan', fromStopId, toStopId],
    queryFn: () => planTrip(fromStopId!, toStopId!),
    enabled: !!fromStopId && !!toStopId && fromStopId !== toStopId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Helper to format route color
export const formatRouteColor = (color: string | undefined): string => {
  if (!color) return '#1B5E20'; // Default green
  return color.startsWith('#') ? color : `#${color}`;
};

// Helper to format stop coordinates
export const formatStopCoordinates = (stop: Stop): [number, number] => {
  if (stop.geom && stop.geom.coordinates) {
    return [stop.geom.coordinates[1], stop.geom.coordinates[0]]; // lat, lng
  }
  return [parseFloat(stop.stop_lat), parseFloat(stop.stop_lon)];
};