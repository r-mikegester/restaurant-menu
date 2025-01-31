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
    selectedCategory: string | null;
    loading: boolean;
    error: string | null;
    fetchRandomMeals: () => void;
    fetchMealsByCategory: (category: string) => Promise<void>;
    fetchMealsByName: (name: string) => Promise<void>;
    setSearchQuery: (query: string) => void;
    addToFavorites: (meal: Meal) => void;
    removeFromFavorites: (mealId: string) => void;
    filterMeals: () => Meal[];
    resetCategory: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useMealStore = create<MealState>((set, get) => ({
    meals: [],
    favorites: [],
    searchQuery: "",
    selectedCategory: null,
    loading: false,
    error: null,

    fetchRandomMeals: async () => {
        set({ loading: true, error: null });
        try {
            const mealsArray: Meal[] = [];
            for (let i = 0; i < 20; i++) {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
                const data = await response.json();
                const randomMeal = data.meals[0];
                randomMeal.price = parseFloat((Math.random() * (30 - 10) + 10).toFixed(2));
                mealsArray.push(randomMeal);
            }
            set({ meals: mealsArray, loading: false });
        } catch (error) {
            set({ loading: false, error: "Error fetching random meals." });
            toast.error("Error fetching random meals.");
        }
    },

    fetchMealsByCategory: async (category) => {
        set({ loading: true, error: null });
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
            toast.error(`Error fetching meals for category ${category}`);
        }
    },

    fetchMealsByName: async (name) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
            const data = await response.json();
            if (data.meals) {
                const mealsWithPrices = data.meals.map((meal: Meal) => ({
                    ...meal,
                    price: parseFloat((Math.random() * (30 - 10) + 10).toFixed(2)),
                }));
                set({ meals: mealsWithPrices, loading: false });
            } else {
                set({ meals: [], loading: false });
                toast.info(`No meals found for "${name}"`);
            }
        } catch (error) {
            set({ loading: false, error: `Error fetching meals by name "${name}"` });
            toast.error(`Error fetching meals by name "${name}"`);
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
            const mealToRemove = state.favorites.find((meal) => meal.idMeal === mealId);
            const updatedFavorites = state.favorites.filter((meal) => meal.idMeal !== mealId);

            if (!mealToRemove) {
                toast.error("This meal was not found in favorites!");
            } else {
                toast.success(`"${mealToRemove.strMeal}" removed from favorites!`);
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
        set({ selectedCategory: null, meals: [] });
        await get().fetchRandomMeals();
        toast.success("Category reset successfully!");
    },

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error }),
}));
