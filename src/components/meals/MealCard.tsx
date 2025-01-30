"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMealStore, Meal } from "../../shared/store/mealsStore";

const MealCard = ({
    meal,
    onClick,
    removeFromFavorites,
    addToFavorites, 
}: {
    meal: Meal;
    onClick: () => void;
    removeFromFavorites?: (mealId: string) => void; // <-- Make it optional\
    addToFavorites?: (meal: Meal) => void;
}) => {
    const { favorites} = useMealStore();
    const isFavorite = favorites.some((fav) => fav.idMeal === meal.idMeal);

    return (
        <motion.li
            key={meal.idMeal}
            className="w-full text-primary-foreground cursor-pointer"
            layoutId={`meal-${meal.idMeal}`}
            onClick={onClick}
        >
            <div className="flex items-center gap-6 h-fit border-2 border-gray-300 btn hover:bg-emerald-100 hover:border-emerald-700 shadow-md bg-white rounded-2xl p-2">
                <div className="min-w-20 h-20 rounded-xl w-20 relative overflow-hidden">
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="h-full items-start justify-center flex flex-col flex-1">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col text-left">
                            <motion.h2
                                className="font-semibold text-xl text-gray-700 w-52 truncate"
                                layoutId={`title-${meal.idMeal}`}
                            >
                                {meal.strMeal}
                            </motion.h2>
                            <motion.p className="text-lg font-semibold text-gray-500">
                                Price: <span className="text-green-700">${(meal.price || Math.random() * 10 + 5).toFixed(2)}</span>
                            </motion.p>
                        </div>

                        {/* Favorite Button */}
                        <button
                            className={`btn btn-circle rounded-full border-transparent transition-all 
                                ${isFavorite ? "bg-red-100 text-red-700" : "bg-transparent hover:bg-emerald-100 hover:text-emerald-700"}
                            `}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!isFavorite) {
                                    addToFavorites?.(meal);
                                }
                            }}
                            disabled={isFavorite}
                        >
                            <Icon
                                icon={isFavorite ? "solar:heart-bold" : "solar:heart-angle-linear"}
                                className="w-10 h-10"
                            />
                        </button>

                        {/* Remove Button (Only in Favorites Page) */}
                        {removeFromFavorites && (
                            <button
                                className="btn btn-circle text-red-600 bg-red-100 hover:bg-red-700 hover:text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromFavorites(meal.idMeal);
                                }}
                            >
                                <Icon icon="mdi:trash-can" className="size-7" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <motion.span layoutId={`description-${meal.idMeal}`} />
        </motion.li>
    );
};

export default MealCard;
