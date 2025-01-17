import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const getMealsByName = async (name: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.php?s=${name}`);
    return response.data.meals;
  } catch (error) {
    console.error("Error fetching meals by name:", error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories.php`);
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getRandomMeal = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/random.php`);
      return response.data.meals[0]; // Random meal object
    } catch (error) {
      console.error("Error fetching random meal:", error);
      return null;
    }
  };
  