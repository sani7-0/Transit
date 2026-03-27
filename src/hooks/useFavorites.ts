import { useState, useCallback } from "react";
import type { RouteId } from "@/pages/Index";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<RouteId[]>(() => {
    try {
      const stored = localStorage.getItem("transit-favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = useCallback((routeId: RouteId) => {
    setFavorites((prev) => {
      const next = prev.includes(routeId)
        ? prev.filter((id) => id !== routeId)
        : [...prev, routeId];
      localStorage.setItem("transit-favorites", JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (routeId: RouteId) => favorites.includes(routeId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
};
