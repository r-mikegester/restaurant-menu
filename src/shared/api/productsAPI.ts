import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Helper to handle API errors and show a toast
const handleApiError = (error: unknown, defaultMessage: string) => {
    console.error(defaultMessage, error);
    const message =
        axios.isAxiosError(error) && error.response?.data
            ? error.response.data.message || defaultMessage
            : defaultMessage;
    toast.error(message); // Show toast notification
    return null; // Fallback for failed API calls
};

export const getMealsByName = async (name: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/search.php?s=${name}`);
        return response.data.meals;
    } catch (error) {
        return handleApiError(error, "Error fetching meals by name.");
    }
};

export const getCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories.php`);
        return response.data.categories;
    } catch (error) {
        return handleApiError(error, "Error fetching categories.");
    }
};

export const getRandomMeal = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/random.php`);
        return response.data.meals[0]; // Random meal object
    } catch (error) {
        return handleApiError(error, "Error fetching random meal.");
    }
};
