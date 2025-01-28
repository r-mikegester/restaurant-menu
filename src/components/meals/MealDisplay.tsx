"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMealStore } from "../../shared/store/mealsStore";
import MealCard from "./MealCard";
import MealModal from "./MealModal";
import SearchBar from "../search/SearchBar";
import type { Meal } from "../../shared/store/mealsStore"; // Import the Meal type

const MealDisplay = () => {
    const { fetchRandomMeal, filterMeals } = useMealStore(); // Remove searchQuery and setSearchQuery
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

    useEffect(() => {
        fetchRandomMeal();
    }, [fetchRandomMeal]);

    // Filter meals based on search query
    const filteredMeals = filterMeals();

    return (
        <div className="h-full center w-full relative p-4">
            <h1 className="text-2xl font-bold mb-4">Search Meals</h1>

            {/* Search Bar Component */}
            <SearchBar /> {/* No need for value or onChange props here */}

            <motion.ul
                className="flex flex-col gap-4 justify-center items-center max-w-md w-full"
                layout
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {/* Render Meal Cards */}
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
                addToFavorites={useMealStore().addToFavorites}
            />
        </div>
    );
};

export default MealDisplay;
