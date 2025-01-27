import { useState, useEffect } from "react";
import { Meal } from "../types/index";

export const useFavorites = (meals: Meal[]) => {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  useEffect(() => {
    const savedFavorites: Meal[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (mealId: string) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((meal) => meal.idMeal === mealId);
      if (isFavorite) {
        return prevFavorites.filter((meal) => meal.idMeal !== mealId);
      } else {
        const mealToAdd = meals.find((meal) => meal.idMeal === mealId);
        if (mealToAdd) {
          return [...prevFavorites, mealToAdd];
        }
        return prevFavorites;
      }
    });
  };

  return { favorites, toggleFavorite };
};
