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
            console.error("Error fetching random meals:", error);
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
            console.error(`Error fetching meals for category ${category}:`, error);
        }
    },

    fetchMealsByName: async (name) => {
        set({ loading: true, error: null });
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
                toast.success(`this "${name}" added to favorites`);
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
