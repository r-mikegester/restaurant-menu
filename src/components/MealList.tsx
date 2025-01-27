import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Meal } from "../shared/types";
import { Icon } from "@iconify/react/dist/iconify.js";

interface MealListProps {
  meals: Meal[];
  favorites: Meal[];
  onFavoriteChange: (mealId: string) => void;
}

const MealList: React.FC<MealListProps> = ({ meals, favorites, onFavoriteChange }) => {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  return (
    <div className="relative w-full h-full">
      {/* Meal Cards */}
      <motion.ul
        className="z-10 grid items-center justify-center w-full max-w-full grid-cols-1 gap-1 px-1 pt-3 pb-5 md:grid-cols-2"
        layout
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {meals.map((meal, index) => (
          <MealCard
            key={`${meal.idMeal}-${index}`} // Ensure unique key
            meal={meal}
            isFavorite={favorites.some((fav) => fav.idMeal === meal.idMeal)}
            onClick={() => setSelectedMeal(meal)}
            onFavoriteChange={onFavoriteChange}
            
          />
        ))}
      </motion.ul>

      {/* Modal for Selected Meal */}
      <MealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
    </div>
  );
};

function MealCard({
  meal,
  isFavorite,
  onClick,
  onFavoriteChange,
}: {
  meal: Meal;
  isFavorite: boolean;
  onClick: () => void;
  onFavoriteChange: (mealId: string) => void;
}) {
  return (
    <motion.li
      className="w-full cursor-pointer text-primary-foreground"
      layoutId={`meal-${meal.idMeal}`} // Unique layoutId per meal
      onClick={onClick}
    >
      <div className="flex w-full h-32 gap-4 p-4 duration-150 ease-in bg-white border-2 shadow-md hover:bg-gray-200 hover:border-2 hover:border-gray-700 rounded-2xl">
        <div className="relative overflow-hidden min-w-20 rounded-3xl">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col items-start justify-center flex-1 h-full">
          <div className="flex items-center justify-between w-full">
            <div>
              <motion.h2
                className="w-48 text-xl font-semibold text-gray-800 truncate md:w-96"
                layoutId={`title-${meal.idMeal}`}
              >
                {meal.strMeal}
              </motion.h2>
              <motion.p
                className="text-emerald-600"
                layoutId={`price-${meal.idMeal}`}
              >
                Price: ${meal.price}
              </motion.p>
            </div>
            {/* Favorite button */}
            <button
              className={`btn btn-circle border-2 border-transparent flex items-center justify-center rounded-full ${isFavorite ? "bg-red-500 border-transparent text-white hover:text-red-700" : "bg-transparent text-gray-800 hover:text-red-500 hover:bg-transparent hover:border-2 hover:border-red-500"
                }`}
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteChange(meal.idMeal);
              }}
            >
              <Icon
                icon={isFavorite ? "solar:heart-angle-bold" : "solar:heart-angle-broken"}
                className="w-10 h-10"
              />
            </button>
          </div>
        </div>
      </div>
      <motion.span layoutId={`description-${meal.idMeal}`} />
    </motion.li>
  );
}

function MealModal({
  meal,
  onClose,
}: {
  meal: Meal | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {!!meal && (
        <motion.div
          className="fixed inset-0 z-30 flex items-center justify-center p-4 bg-base-300/70"
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={onClose}
        >
          <motion.div
            className="relative flex flex-col items-center justify-center max-h-full p-3 overflow-y-auto bg-gray-100 w-fit md:flex-row rounded-3xl"
            layoutId={`meal-${meal.idMeal}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute bg-white border-2 border-gray-300 shadow-md btn btn-square top-3 right-3 hover:bg-red-500 hover:text-white rounded-2xl"
              onClick={onClose}
            >
              <Icon icon="material-symbols:close" className="w-8 h-8" />
            </button>

            <div className="flex flex-col gap-4 p-4 mx-auto overflow-auto max-w-96 md:max-w-3xl h-fit">
              <div className="flex gap-4">
                <div className="relative w-20 h-20 overflow-hidden min-w-20 rounded-3xl">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col items-start justify-center flex-1 h-full">
                  <motion.h2
                    className="text-xl font-bold text-gray-900"
                    layoutId={`title-${meal.idMeal}`}
                  >
                    {meal.strMeal}
                  </motion.h2>
                  <motion.p
                    className="text-emerald-600"
                    layoutId={`price-${meal.idMeal}`}
                  >
                    Price: ${meal.price}
                  </motion.p>
                </div>
              </div>
              <motion.p
                className="text-gray-900 font-medium text-[15px]"
                layoutId={`description-${meal.idMeal}`}
              >
              </motion.p>

              <motion.div
                tabIndex={0}
                className="bg-white border-2 border-gray-300 shadow-inner collapse collapse-arrow drop-shadow-md"
              >
                <input type="checkbox" />
                <div className="text-xl font-medium text-gray-700 bg-gray-200 collapse-title">Description</div>
                <div className="overflow-y-auto text-gray-600 bg-gray-50 collapse-content">
                  <div className="h-auto py-3 max-h-96">{meal.strInstructions}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MealList;
