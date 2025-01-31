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
                <div className="grid grid-cols-1 md:grid-cols-3 p-3 gap-4 justify-center items-center max-w-full w-full animate-pulse">
                    {Array.from({ length: 15 }, (_, index) => (
                        <div
                            key={index}
                            className="h-20 w-full rounded-2xl bg-gray-400 animate-pulse"
                        ></div>
                    ))}
                </div>
            )}

            {/* Meal Cards */}
            {!loading && (
                <motion.ul
                    className="grid grid-cols-1 grid-flow-dense md:grid-cols-3 p-3 gap-4 justify-center items-center max-w-full w-full"
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
                        <div className="w-screen h-fit py-20 px-10 flex justify-center items-center">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <Icon icon="material-symbols:no-food-outline-rounded" className="w-40 h-40" />
                                <h1 className="text-3xl font-normal text-center">
                                    {error}
                                </h1>
                            </div>
                        </div>
                    ) : (
                        <div className="w-screen h-fit py-20 px-10 flex justify-center items-center">
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
