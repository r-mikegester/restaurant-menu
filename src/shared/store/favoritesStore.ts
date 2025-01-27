import { create } from "zustand";
import { Meal } from "../types"; // Adjust the import based on your structure

interface FavoritesState {
  favorites: Meal[];
  toggleFavorite: (meal: Meal) => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  toggleFavorite: (meal: Meal) => 
    set((state: FavoritesState) => {
      const exists = state.favorites.some((fav: Meal) => fav.idMeal === meal.idMeal);
      const updatedFavorites = exists
        ? state.favorites.filter((fav: Meal) => fav.idMeal !== meal.idMeal)
        : [...state.favorites, meal];
      return { favorites: updatedFavorites };
    }),
}));
