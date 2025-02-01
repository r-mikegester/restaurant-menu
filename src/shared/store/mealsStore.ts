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
    progressToastId: string | number | null;
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
    progressToastId: null, // Keep track of the toast ID for progress updates

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
            console.log(`🔍 Fetching meals for category: "${category}"`);
            
            // Fetch meals by category (returns only partial meal data)
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            const data = await response.json();
    
            if (!data.meals) {
                throw new Error(`No meals found for category: ${category}`);
            }
    
            // Fetch full details for each meal using lookup.php?i=
            const detailedMeals = await Promise.all(
                data.meals.map(async (meal: { idMeal: string }) => {  // 🔹 Explicitly define type here
                    const detailsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                    const detailsData = await detailsResponse.json();
                    const fullMeal = detailsData.meals[0];
    
                    return {
                        ...fullMeal,
                        price: parseFloat((Math.random() * (30 - 10) + 10).toFixed(2)), // Add random price
                    };
                })
            );
    
            set({ meals: detailedMeals, selectedCategory: category, loading: false });
            toast.success(`Meals for ${category} fetched successfully!`);
    
        } catch (error) {
            set({ loading: false, error: `Error fetching meals for category ${category}` });
            toast.error(`Error fetching meals for category ${category}`);
        }
    },

       // Fetch meals by name with progress tracking
    fetchMealsByName: async (name) => {
    set({ loading: true, error: null });

    // Create a loading toast and store the toastId
    const progressToastId = toast.loading("Fetching meals... 0%", {
        progress: 0,
        position: "top-center",
    });
    set({ progressToastId });

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        const data = await response.json();

        if (data.meals) {
            const mealsWithPrices = data.meals.map((meal: Meal) => ({
                ...meal,
                price: parseFloat((Math.random() * (30 - 10) + 10).toFixed(2)),
            }));
            set({ meals: mealsWithPrices });

            // Simulate progress update (you can adjust this based on actual meal count)
            let progress = 10;
            const interval = setInterval(() => {
                progress += 10;
                toast.update(progressToastId, {
                    render: `Fetching meals... ${progress}%`,
                    progress: progress / 100,
                });

                if (progress >= 100) {
                    clearInterval(interval);
                    toast.update(progressToastId, {
                        render: "Meals fetched successfully!",
                        progress: 1, // Completed progress
                        type: "success",
                        autoClose: 3000,
                    });
                }
            }, 500); // Update every 500ms
        } else {
            set({ meals: [] });
            toast.info(`No meals found for "${name}"`);
            toast.update(progressToastId, {
                render: "No meals found.",
                progress: 1,
                type: "info",
                autoClose: 3000,
            });
        }
    } catch (error) {
        set({ loading: false, error: `Error fetching meals by name "${name}"` });
        toast.error(`Error fetching meals by name "${name}"`);
        toast.update(progressToastId, {
            render: "Error fetching meals.",
            progress: 1,
            type: "error",
            autoClose: 3000,
        });
    } finally {
        set({ loading: false });
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
