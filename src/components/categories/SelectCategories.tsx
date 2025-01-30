"use client";

import React, { useState, useEffect } from "react";
import { useMealStore } from "../../shared/store/mealsStore";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

// Icons for each category
const categoryIcons: Record<string, string> = {
    "Beef": "mdi:cow",
    "Chicken": "fluent-emoji-high-contrast:chicken",
    "Dessert": "mdi:cake",
    "Vegetarian": "carbon:fruit-bowl",
    "Seafood": "streamline:shrimp",
    "Pasta": "icon-park-outline:noodles",
    "Salad": "fluent:bowl-salad-24-regular",
    "Breakfast": "fluent-mdl2:breakfast",
    "Starter": "lucide-lab:bowl-chopsticks",
    "Lamb": "tabler:meat",
    "Goat": "fluent-emoji-high-contrast:goat",
    "Pork": "streamline:pork-meat",
    "Miscellaneous": "fluent:food-24-regular",
    "Side": "mingcute:dish-cover-line",
    "Vegan": "akar-icons:radish",
};

const SelectCategories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const { fetchMealsByCategory, resetCategory, selectedCategory } = useMealStore();

    // Fetch available categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "https://www.themealdb.com/api/json/v1/1/categories.php"
                );
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = async (category: string) => {
        await fetchMealsByCategory(category);
    };

    return (
        <div className="mb-4 flex flex-col p-4 md:flex-row justify-between items-center w-full">
            <label htmlFor="categories" className="block text-3xl text-gray-700 my-5 font-semibold">
                Select a Meal <br className="hidden md:block" /> Category:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 justify-center items-center">
                {loading
                    ? Array.from({ length: 15 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center gap-4 px-3 w-40 bg-emerald-100 rounded-lg animate-pulse btn-sm"
                        >
                            <div className=" ">
                                <Icon icon="eos-icons:three-dots-loading" className="text-2xl text-emerald-700" />
                            </div>
                        </div>
                    ))
                    : categories.map((category) => (
                        <button
                            key={category.idCategory}
                            onClick={() => handleCategoryChange(category.strCategory)}
                            className={`btn btn-sm bg-emerald-100 glass text-emerald-700 rounded-lg hover:bg-emerald-700 hover:text-white transition-all w-40 flex flex-col items-center justify-center ${selectedCategory === category.strCategory ? "bg-emerald-700 text-white" : ""
                                }`}
                        >
                            <Icon
                                icon={categoryIcons[category.strCategory] || "mdi:fast-food"}
                                className="text-2xl mb-1"
                            />
                            <span>{category.strCategory}</span>
                        </button>
                    ))}
                {selectedCategory && (
                    <button
                        onClick={resetCategory}
                        className="btn btn-sm bg-emerald-100 glass text-emerald-700 rounded-lg hover:bg-emerald-700 hover:text-white transition-all w-40 flex flex-col items-center justify-center"
                    >
                        <Icon icon="mdi:refresh" className="text-2xl mb-1" />
                        <span>Reset Category</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default SelectCategories;
