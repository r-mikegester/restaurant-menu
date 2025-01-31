import React from "react";
import { useMealStore } from "../../shared/store/mealsStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import useCategories from "../../shared/hooks/useCategories"; // Custom hook for fetching categories
import { categoryIcons } from "../../shared/utils/categoryIcons"; // Category icons mapping

const SelectCategories: React.FC = () => {
    const { fetchMealsByCategory, resetCategory, selectedCategory } = useMealStore();
    const { categories, loading } = useCategories(); // Using the custom hook

    const handleCategoryChange = async (category: string) => {
        await fetchMealsByCategory(category);
    };

    return (
        <div className="mb-4 flex flex-col p-4 md:flex-row justify-between items-center w-full">
            <label htmlFor="categories" className="block text-2xl md:text-3xl text-gray-700 my-5 font-semibold">
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
                            aria-label={`Select ${category.strCategory} category`}
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
                        aria-label="Reset selected category"
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
