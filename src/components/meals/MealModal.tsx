"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Meal } from "../../shared/store/mealsStore";

const MealModal = ({ meal, onClose, addToFavorites }: { meal: Meal | null; onClose: () => void; addToFavorites: (meal: Meal) => void; }) => {
    return (
        <AnimatePresence>
            {meal && (
                <>
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center z-0 bg-secondary/50"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onClick={onClose}
                    />
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
};

export default MealModal;
