import { useState, useEffect } from "react";
import { Meal } from "../types";

export const useFilteredMeals = (meals: Meal[], searchQuery: string, selectedCategory: string) => {
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>(meals);

  useEffect(() => {
    let result = meals;

    if (selectedCategory) {
      result = result.filter((meal) => meal.strCategory === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter((meal) =>
        meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMeals(result);
  }, [meals, searchQuery, selectedCategory]);

  return filteredMeals;
};
