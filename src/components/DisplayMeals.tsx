import { Icon } from "@iconify/react";
import MealList from "./MealList"; // Import the MealList component
import { Meal } from "../shared/types";

const MealDisplay = ({
  meals,
  favorites,
  loading,
  onFavoriteChange,
  emptyMessage,
}: {
  meals: Meal[];
  favorites: Meal[];
  loading: boolean;
  onFavoriteChange: (mealId: string) => void;
  emptyMessage: string;
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full mt-20">
        <Icon
          icon="eos-icons:bubble-loading"
          className="w-16 h-16 text-gray-600 animate-spin"
        />
      </div>
    );
  }

  if (meals.length > 0) {
    return (
      <MealList
        meals={meals}
        favorites={favorites}
        onFavoriteChange={onFavoriteChange}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full pt-20 ">
      <Icon
        icon="material-symbols:no-food-outline-rounded"
        className="w-20 h-20 text-gray-700"
      />
      <p className="p-10 pt-3 text-2xl text-center text-gray-700">
        {emptyMessage}
      </p>
    </div>
  );
};

export default MealDisplay;
