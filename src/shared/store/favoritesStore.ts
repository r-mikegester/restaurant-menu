import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Meal } from "../types";

interface FavoritesState {
  favorites: Meal[];
  toggleFavorite: (meal: Meal) => void;
  isFavorite: (mealId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (meal) => {
        const { favorites } = get();
        const isAlreadyFavorite = favorites.some((fav) => fav.idMeal === meal.idMeal);

        set({
          favorites: isAlreadyFavorite
            ? favorites.filter((fav) => fav.idMeal !== meal.idMeal)
            : [...favorites, meal],
        });
      },
      isFavorite: (mealId) => get().favorites.some((fav) => fav.idMeal === mealId),
    }),
    { name: "favorites-storage" } // Key for localStorage
  )
);
