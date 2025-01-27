import { useState, useEffect } from "react";
import { getRandomMeal, getMealsByName } from "../api/productsAPI";
import { Meal } from "../types";

const generateRandomPrice = (): string => (Math.random() * (50 - 10) + 10).toFixed(2);

export const useMeals = () => {
    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
        const fetchRandomMeals = async () => {
            const fetchedMeals: Meal[] = [];
            for (let i = 0; i < 10; i++) {
                const meal = await getRandomMeal();
                meal.price = generateRandomPrice();
                fetchedMeals.push(meal);
            }
            setMeals(fetchedMeals);
        };

        fetchRandomMeals();
    }, []);

    const searchMeals = async (query: string) => {
        const fetchedMeals = await getMealsByName(query);
        setMeals(fetchedMeals || []);
    };

    return { meals, setMeals, searchMeals };
};
