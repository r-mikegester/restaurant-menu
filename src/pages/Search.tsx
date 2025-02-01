import { useEffect, useState } from "react";
import { Meal, useMealStore } from "../shared/store/mealsStore";
import SearchBar from "../components/search/SearchBar";
import MealCard from "../components/meals/MealCard";
import MealModal from "../components/meals/MealModal";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";

const Search = () => {
    const { fetchRandomMeals, filterMeals, addToFavorites, loading, error, setLoading } = useMealStore();
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
    const filteredMeals = filterMeals();

    useEffect(() => {
        const fetchInitialMeal = async () => {
            setLoading(true);
            await fetchRandomMeals();
            setLoading(false);
        };

        fetchInitialMeal();
    }, [fetchRandomMeals, setLoading]);

    const triggerSearch = async () => {
        setLoading(true);
        await fetchRandomMeals();
        setLoading(false);
    };

    return (
        <div className="w-full h-screen pb-20 overflow-x-hidden overflow-y-scroll">
            {/* SearchBar and Category Selection */}
            <SearchBar onSearch={triggerSearch} />

            {/* Loading Skeleton */}
            {loading && (
                <div className="grid items-center justify-center w-full max-w-full grid-cols-1 gap-4 p-3 md:grid-cols-3 animate-pulse">
                    {Array.from({ length: 50 }, (_, index) => (
                        <div
                            key={index}
                            className="w-full h-20 bg-gray-400 rounded-2xl animate-pulse"
                        ></div>
                    ))}
                </div>
            )}

            {/* Meal Cards */}
            {!loading && (
                <motion.ul
                    className="grid items-center justify-center w-full max-w-full grid-cols-1 gap-4 p-3 grid-flow-dense md:grid-cols-3"
                    layout
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {filteredMeals.length > 0 ? (
                        filteredMeals.map((meal, index) => (
                            <MealCard
                                key={`${meal.idMeal}-${index}`}
                                meal={meal}
                                onClick={() => setSelectedMeal(meal)}
                                addToFavorites={addToFavorites}
                            />
                        ))
                    ) : error ? (
                        <div className="flex items-center justify-center w-screen px-10 py-20 h-fit">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <Icon icon="material-symbols:no-food-outline-rounded" className="w-40 h-40" />
                                <h1 className="text-3xl font-normal text-center">
                                    {error}
                                </h1>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-screen px-10 py-20 h-fit">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <Icon icon="material-symbols:no-food-outline-rounded" className="w-40 h-40" />
                                <h1 className="text-3xl font-normal text-center">
                                    No meals have been found, try searching again.
                                </h1>
                            </div>
                        </div>
                    )}
                </motion.ul>
            )}

            {/* Meal Modal */}
            <MealModal
                meal={selectedMeal}
                onClose={() => setSelectedMeal(null)}
                addToFavorites={addToFavorites}
            />
        </div>
    );
};

export default Search;
