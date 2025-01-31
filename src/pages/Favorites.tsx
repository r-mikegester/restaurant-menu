import React, { useState } from "react";
import { useMealStore, Meal } from "../shared/store/mealsStore";
import MealCard from "../components/meals/MealCard";
import MealModal from "../components/meals/MealModal";
import { Icon } from "@iconify/react/dist/iconify.js";

const Favorites: React.FC = () => {
    const { favorites, removeFromFavorites } = useMealStore();
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

    return (
        <div className="w-full h-svh pb-20 overflow-x-hidden overflow-y-auto">

            <div className="bg-white sticky top-0 z-10 w-full px-4 shadow-md rounded-2xl md:rounded-t-none">
                <div className="flex items-center justify-between h-20 w-full space-x-3">
                    <h1 className="md:text-5xl text-center md:text-left text-3xl font-bold text-gray-700">Favorite Meals</h1>
                </div>
            </div>
            {favorites.length === 0 ? (
                <div className="w-full h-full flex flex-col justify-center items-center text-center">
                    <div className="flex flex-col items-center justify-start space-y-4">
                        <Icon icon="material-symbols:no-food-outline-rounded" className="w-36 h-36" />
                        <h1 className="text-2xl font-normal text-center">
                            No meals added to favorites yet.
                        </h1>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-flow-dense md:grid-cols-3 p-3 gap-4 justify-center items-center max-w-full w-full">
                    {favorites.map((meal, index) => (
                        <MealCard
                            key={`${meal.idMeal}-${index}`} 
                            meal={meal}
                            onClick={() => setSelectedMeal(meal)} 
                            removeFromFavorites={removeFromFavorites} 
                        />
                    ))}
                </div>
            )}

            {/* Meal Modal */}
            <MealModal
                meal={selectedMeal}
                onClose={() => setSelectedMeal(null)}
                removeFromFavorites={removeFromFavorites}
            />
            
        </div>
    );
};

export default Favorites;
