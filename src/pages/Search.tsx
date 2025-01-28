"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMealStore } from "../shared/store/mealsStore";

type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
};

const Search = () => {
    const {
        fetchRandomMeal,
        searchQuery,
        setSearchQuery,
        filterMeals,
        addToFavorites,
    } = useMealStore();

    const filteredMeals: Meal[] = filterMeals();
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

    useEffect(() => {
        fetchRandomMeal();
    }, [fetchRandomMeal]);

    return (
        <div className="h-full center w-full relative p-4">
            <h1 className="text-2xl font-bold mb-4">Search Meals</h1>
            <input
                type="text"
                placeholder="Search meals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            />
            <motion.ul
                className="flex flex-col gap-4 justify-center items-center max-w-md w-full"
                layout
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {filteredMeals.map((meal) => (
                    <Card
                        key={meal.idMeal}
                        meal={meal}
                        onClick={() => setSelectedMeal(meal)}
                    />
                ))}
            </motion.ul>
            <Modal
                meal={selectedMeal}
                onClose={() => setSelectedMeal(null)}
                addToFavorites={addToFavorites}
            />
        </div>
    );
};

function Card({ meal, onClick }: { meal: Meal; onClick: () => void }) {
    return (
        <motion.li
            key={meal.idMeal}
            className="w-full text-primary-foreground cursor-pointer"
            layoutId={`meal-${meal.idMeal}`}
            onClick={onClick}
        >
            <div className="flex gap-6 h-20">
                <div className="min-w-20 h-20 rounded-3xl w-20 relative overflow-hidden">
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="border-b h-full items-start justify-center flex flex-col flex-1 dark:border-neutral-800 border-neutral-200">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <motion.h2
                                className="font-semibold text-xl text-secondary-foreground"
                                layoutId={`title-${meal.idMeal}`}
                            >
                                {meal.strMeal}
                            </motion.h2>
                        </div>
                        <button className="py-1 px-3 rounded-full bg-blue-50 text-blue-500 text-sm font-semibold">
                            View
                        </button>
                    </div>
                </div>
            </div>
            <motion.span layoutId={`description-${meal.idMeal}`} />
        </motion.li>
    );
}

function Modal({
    meal,
    onClose,
    addToFavorites,
}: {
    meal: Meal | null;
    onClose: () => void;
    addToFavorites: (meal: Meal) => void;
}) {
    return (
        <AnimatePresence>
            {meal && (
                <>
                    {/* Modal Background */}
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center z-0 bg-secondary/50"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className="fixed inset-0 z-10 flex flex-col justify-center items-center"
                        onClick={onClose}
                    >
                        <motion.div
                            className="p-4 w-fit relative overflow-hidden flex items-center justify-center flex-col bg-background rounded-3xl"
                            layoutId={`meal-${meal.idMeal}`}
                        >
                            <div className="max-w-xl mx-auto flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <div className="min-w-20 h-20 rounded-3xl w-20 relative overflow-hidden">
                                        <img
                                            src={meal.strMealThumb}
                                            alt={meal.strMeal}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="h-full items-start justify-center flex flex-col flex-1">
                                        <div className="flex items-center justify-between w-full">
                                            <div>
                                                <motion.h2
                                                    className="font-semibold text-xl text-secondary-foreground"
                                                    layoutId={`title-${meal.idMeal}`}
                                                >
                                                    {meal.strMeal}
                                                </motion.h2>
                                            </div>
                                            <button
                                                className="py-1 px-3 rounded-full bg-blue-50 text-blue-500 text-sm font-semibold"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToFavorites(meal);
                                                    onClose();
                                                }}
                                            >
                                                Add to Favorites
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default Search;
