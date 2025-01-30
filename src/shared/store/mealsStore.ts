import { toast } from "react-toastify";
import { create } from "zustand";

export interface Meal {
    strSource: string;
    strVideo: string;
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
    strArea?: string;
    strTags?: string;
    strInstructions?: string;
    price?: number;
}

interface MealState {
    meals: Meal[];
    favorites: Meal[];
    searchQuery: string;
    selectedCategory: string | null;  // Track selected category
    loading: boolean;  // Add loading state
    error: string | null;  // Add error state
    fetchRandomMeals: () => void;
    fetchMealsByCategory: (category: string) => Promise<void>;
    fetchMealsByName: (name: string) => Promise<void>;
    setSearchQuery: (query: string) => void;
    addToFavorites: (meal: Meal) => void;
    removeFromFavorites: (mealId: string) => void;
    filterMeals: () => Meal[];
    resetCategory: () => void;  // Method to reset category and fetch random meals
    setLoading: (loading: boolean) => void;  // Set loading state
    setError: (error: string | null) => void;  // Set error state
}

export const useMealStore = create<MealState>((set, get) => ({
    meals: [],
    favorites: [],
    searchQuery: "",
    selectedCategory: null,  // Initial state for selectedCategory
    loading: false,  // Default loading state
    error: null,  // Default error state

    fetchRandomMeals: async () => {
        set({ loading: true, error: null });  // Set loading to true and reset error
        try {
            const mealsArray: Meal[] = []; // Array to hold the 20 random meals

            // Fetch 20 random meals
            for (let i = 0; i < 20; i++) {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
                const data = await response.json();
                const randomMeal = data.meals[0];

                // Assign random price to the meal
                randomMeal.price = parseFloat((Math.random() * (30 - 10) + 10).toFixed(2));

                mealsArray.push(randomMeal);
            }

            // Update the state with the 20 fetched meals
            set({ meals: mealsArray, loading: false });
        } catch (error) {
            set({ loading: false, error: "Error fetching random meals." });
            console.error("Error fetching random meals:", error);
        }
    },

    fetchMealsByCategory: async (category) => {
        set({ loading: true, error: null });  // Set loading to true and reset error
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            const data = await response.json();

            const mealsWithPrices = data.meals.map((meal: Meal) => ({
                ...meal,
                price: parseFloat((Math.random() * (30 - 10) + 10).toFixed(2)),
            }));

            set({ meals: mealsWithPrices, selectedCategory: category, loading: false });
        } catch (error) {
            set({ loading: false, error: `Error fetching meals for category ${category}` });
            console.error(`Error fetching meals for category ${category}:`, error);
        }
    },

    fetchMealsByName: async (name) => {
        set({ loading: true, error: null });  // Set loading to true and reset error
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
            const data = await response.json();

            const mealsWithPrices = (data.meals || []).map((meal: Meal) => ({
                ...meal,
                price: parseFloat((Math.random() * (30 - 10) + 10).toFixed(2)),
            }));

            set({ meals: mealsWithPrices, loading: false });
        } catch (error) {
            set({ loading: false, error: `Error fetching meals by name "${name}"` });
            console.error(`Error fetching meals by name "${name}":`, error);
        }
    },

    setSearchQuery: (query) => set({ searchQuery: query }),

    addToFavorites: (meal) =>
        set((state) => {
            const isAlreadyFavorite = state.favorites.some(
                (favorite) => favorite.idMeal === meal.idMeal
            );

            if (!isAlreadyFavorite) {
                toast.success("Added to favorites");
                return {
                    favorites: [...state.favorites, meal],
                };
            }
            toast.info("This meal is already in your favorites");
            return state;
        }),

    removeFromFavorites: (mealId) =>
        set((state) => {
            const updatedFavorites = state.favorites.filter((meal) => meal.idMeal !== mealId);
            
            if (updatedFavorites.length === state.favorites.length) {
                toast.error("This meal was not found in favorites!");
            } else {
                toast.success("Removed from favorites");
            }

            return {
                favorites: updatedFavorites,
            };
        }),

    filterMeals: () => {
        const { meals, searchQuery } = get();
        return meals.filter((meal) =>
            meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
        );
    },

    resetCategory: async () => {
        set({ selectedCategory: null, meals: [] });  // Reset selectedCategory and meals
        await get().fetchRandomMeals();  // Fetch random meals after reset
        toast.success("Category reset successfully!");
    },

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error }),
}));
