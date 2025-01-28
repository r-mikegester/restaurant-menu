import React from "react";
import { motion } from "framer-motion";

type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
};

const MealCard: React.FC<{ meal: Meal; onClick: () => void }> = ({ meal, onClick }) => {
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
};

export default MealCard;
