import React, { useState } from "react";
import { useMealStore, Meal } from "../shared/store/mealsStore";
import MealCard from "../components/meals/MealCard";
import MealModal from "../components/meals/MealModal";

const Favorites: React.FC = () => {
    const { favorites, removeFromFavorites } = useMealStore();
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

    return (
        <div className="w-full h-screen pb-20 overflow-x-hidden overflow-y-scroll">
            
            <div className="bg-white sticky top-0 z-10 w-full px-4 shadow-md rounded-2xl md:rounded-t-none">
                <div className="flex items-center justify-between h-20 space-x-3">
                    <h1 className="md:text-5xl text-3xl font-bold text-gray-700">Favorite Meals</h1>
                </div>
            </div>
            {favorites.length === 0 ? (
                <div className="w-full h-full flex flex-col justify-center items-center text-center">
                    <p className="text-gray-500 text-lg">No favorites yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-flow-dense md:grid-cols-3 p-3 gap-4 justify-center items-center max-w-full w-full">
                    {favorites.map((meal, index) => (
                        <MealCard
                            key={`${meal.idMeal}-${index}`} // Ensuring unique key with index as fallback
                            meal={meal}
                            onClick={() => setSelectedMeal(meal)} // Opens the modal for the meal
                            removeFromFavorites={removeFromFavorites} // 🔥 Pass the remove function
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
