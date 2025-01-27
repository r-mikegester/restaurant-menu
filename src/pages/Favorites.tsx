import { useFavoritesStore } from "../shared/store/favoritesStore";
import MealDisplay from "../components/DisplayMeals";

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavoritesStore();

  return (
    <div className="w-full pb-20 overflow-x-hidden overflow-y-auto">
      <div className="p-4 text-4xl font-bold text-center text-gray-700 bg-white">
        <h1>Favorites</h1>
      </div>
      <div className="w-screen h-screen p-3">
        {favorites.length > 0 ? (
          <MealDisplay
            meals={favorites}
            favorites={favorites}
            loading={false}
            onFavoriteChange={(mealId) => {
              const meal = favorites.find((fav) => fav.idMeal === mealId);
              if (meal) toggleFavorite(meal);
            }}
            emptyMessage="No favorite meals added yet!"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-xl font-medium text-gray-500">
            No favorite meals yet! Add some to see them here.
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
