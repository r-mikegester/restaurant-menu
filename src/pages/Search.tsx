"use client";

import { useEffect, useState } from "react";
import { Meal, useMealStore } from "../shared/store/mealsStore";
import SearchBar from "../components/search/SearchBar";  
import SelectCategories from "../components/categories/SelectCategories";  
import MealCard from "../components/meals/MealCard";  
import MealModal from "../components/meals/MealModal";  
import { motion } from "framer-motion";

const Search = () => {
    const { fetchRandomMeal, filterMeals, addToFavorites } = useMealStore();
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
    const filteredMeals = filterMeals();

    useEffect(() => {
        fetchRandomMeal();
    }, [fetchRandomMeal]);

    return (
        <div className="h-full center w-full relative p-4">
            <h1 className="text-2xl font-bold mb-4">Search Meals</h1>

            {/* SearchBar and Category Select Components */}
            <SearchBar />
            <SelectCategories />

            {/* Meal Cards */}
            <motion.ul
                className="flex flex-col gap-4 justify-center items-center max-w-md w-full"
                layout
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {filteredMeals.length > 0 ? (
                    filteredMeals.map((meal) => (
                        <MealCard 
                            key={meal.idMeal} 
                            meal={meal} 
                            onClick={() => setSelectedMeal(meal)} 
                        />
                    ))
                ) : (
                    <li>No meals found for your search</li>
                )}
            </motion.ul>

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
