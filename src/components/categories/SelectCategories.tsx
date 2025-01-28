"use client";

import React, { useState, useEffect } from "react";
import { useMealStore } from "../../shared/store/mealsStore";

interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

const SelectCategories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const { fetchMealsByCategory } = useMealStore();

    // Fetch available categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "https://www.themealdb.com/api/json/v1/1/categories.php"
                );
                const data = await response.json();
                setCategories(data.categories); // Set the categories as a list of Category objects
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = async (category: string) => {
        if (category) {
            await fetchMealsByCategory(category);
        }
    };

    return (
        <div className="mb-4">
            <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
                Select a Category:
            </label>
            <select
                id="categories"
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full p-2 border rounded"
            >
                <option value="">-- Choose a Category --</option>
                {categories.map((category) => (
                    <option key={category.idCategory} value={category.strCategory}>
                        {category.strCategory}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectCategories;
