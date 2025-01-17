import React, { useState, useEffect } from "react";
import { getMealsByName, getCategories, getRandomMeal } from "../data/productsAPI";
import { Icon } from "@iconify/react/dist/iconify.js";

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  price: string;
}

export interface Category {
  idCategory: string;
  strCategory: string;
}

interface ProductListProps {
  onFavoriteChange: (mealId: string) => void; // Add this prop
}

const ProductList: React.FC<ProductListProps> = ({ onFavoriteChange }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const generateRandomPrice = (): string => {
    return (Math.random() * (50 - 10) + 10).toFixed(2);
  };

  useEffect(() => {
    const fetchRandomMeals = async (count: number): Promise<Meal[]> => {
      const mealsBatch: Meal[] = [];
      for (let i = 0; i < count; i++) {
        const meal = await getRandomMeal();
        meal.price = generateRandomPrice();
        mealsBatch.push(meal);
      }
      return mealsBatch;
    };

    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();

    const loadRandomMeals = async () => {
      const randomMeals = await fetchRandomMeals(10);
      setMeals(randomMeals);
    };

    loadRandomMeals();
  }, []);

  const handleSearch = async () => {
    const fetchedMeals = await getMealsByName(searchQuery);
    setMeals(fetchedMeals || []);
  };

  return (
    <div className="">
      {/* Search Bar */}
      <div className="w-full h-auto">
        <div className="h-20 w-full pb-0 flex justify-between space-x-3 items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a meal"
            className="bg-slate-200 border-2 border-gray-300 text-emerald-950/85 h-14 rounded-2xl w-full text-left p-4 px-4"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-2xl ml-2"
          >
            <Icon icon="hugeicons:search-02"  className="w-10 h-10 "/>
          </button>
        </div>
      </div>
      <div className="mb-4"></div>

      {categories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Categories</h2>
          <ul className="flex flex-wrap gap-4 mt-2">
            {categories.map((category) => (
              <li
                key={category.idCategory}
                className="border p-2 rounded bg-gray-100"
              >
                {category.strCategory}
              </li>
            ))}
          </ul>
        </div>
      )}

      {meals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="border p-4 rounded shadow-md bg-white"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full rounded mb-2"
              />
              <h3 className="font-semibold text-lg">{meal.strMeal}</h3>
              <p>{meal.strInstructions.slice(0, 100)}...</p>
              <p className="text-green-600 font-bold">Price: ${meal.price}</p>
              <button
                onClick={() => onFavoriteChange(meal.idMeal)}
                className="mt-2 bg-emerald-500 text-white px-4 py-2 rounded"
              >
                Toggle Favorite
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No meals found. Try searching for something else!</p>
      )}
    </div>
  );
};

export default ProductList;
