import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
};

type ModalProps = {
    meal: Meal | null;
    onClose: () => void;
    addToFavorites: (meal: Meal) => void;
};

const MealModal: React.FC<ModalProps> = ({ meal, onClose, addToFavorites }) => {
    return (
        <AnimatePresence>
            {meal && (
                <>
                    {/* Modal Background */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className="fixed inset-0 z-20 flex items-center justify-center"
                        layoutId={`meal-${meal.idMeal}`}
                    >
                        <div
                            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-48 rounded overflow-hidden">
                                <img
                                    src={meal.strMealThumb}
                                    alt={meal.strMeal}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <motion.h2
                                className="text-xl font-bold mt-4"
                                layoutId={`title-${meal.idMeal}`}
                            >
                                {meal.strMeal}
                            </motion.h2>
                            <button
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
                                onClick={() => {
                                    addToFavorites(meal);
                                    onClose();
                                }}
                            >
                                Add to Favorites
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MealModal;
