import { create } from "zustand";

export interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

interface MealState {
    meals: Meal[];
    favorites: Meal[];
    searchQuery: string;
    fetchRandomMeal: () => void;
    fetchMealsByCategory: (category: string) => Promise<void>;
    fetchMealsByName: (name: string) => Promise<void>;
    setSearchQuery: (query: string) => void;
    addToFavorites: (meal: Meal) => void;
    removeFromFavorites: (mealId: string) => void;
    filterMeals: () => Meal[];
}

export const useMealStore = create<MealState>((set, get) => ({
    meals: [],
    favorites: [],
    searchQuery: "",

    fetchRandomMeal: async () => {
        try {
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
            const data = await response.json();
            const randomMeal = data.meals[0];
            set((state) => ({
                meals: [...state.meals, randomMeal],
            }));
        } catch (error) {
            console.error("Error fetching random meal:", error);
        }
    },

    fetchMealsByCategory: async (category) => {
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
            );
            const data = await response.json();
            set({ meals: data.meals });
        } catch (error) {
            console.error(`Error fetching meals for category ${category}:`, error);
        }
    },

    fetchMealsByName: async (name) => {
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
            );
            const data = await response.json();
            set({ meals: data.meals || [] }); // Fallback to empty array if no meals are found
        } catch (error) {
            console.error(`Error fetching meals by name "${name}":`, error);
        }
    },

    setSearchQuery: (query) => set({ searchQuery: query }),

    addToFavorites: (meal) =>
        set((state) => ({
            favorites: [...state.favorites, meal],
        })),

    removeFromFavorites: (mealId) =>
        set((state) => ({
            favorites: state.favorites.filter((meal) => meal.idMeal !== mealId),
        })),

    filterMeals: () => {
        const { meals, searchQuery } = get();
        return meals.filter((meal) =>
            meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
        );
    },
}));
