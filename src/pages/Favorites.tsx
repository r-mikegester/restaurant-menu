import React from "react";
import { useMealStore } from "../shared/store/mealsStore";

const Favorites: React.FC = () => {
    const { favorites, removeFromFavorites } = useMealStore();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Favorite Meals</h1>
            {favorites.length === 0 ? (
                <p className="text-gray-500">No favorites yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {favorites.map((meal) => (
                        <div
                            key={meal.idMeal}
                            className="border rounded shadow p-2 flex flex-col items-center"
                        >
                            <img
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                className="w-full h-32 object-cover rounded"
                            />
                            <h2 className="text-lg font-semibold mt-2">{meal.strMeal}</h2>
                            <button
                                onClick={() => removeFromFavorites(meal.idMeal)}
                                className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
