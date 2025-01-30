export interface Meal {
    [x: string]: string;
    category: string;
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    strCategory: string;
    price: string;
    strArea: string;
    strDrinkAlternate: string;
}

export interface Category {
    idCategory: string;
    strCategory: string;
}