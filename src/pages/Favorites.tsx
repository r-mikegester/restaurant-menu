import MealDisplay from "../components/DisplayMeals";
import { useFavoritesStore } from "../shared/store/favoritesStore";

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavoritesStore();

  // Use a hardcoded value for `loading` if there's no loading logic in Favorites
  const loading = false;

  return (
    <div className="w-full pb-20 overflow-x-hidden overflow-y-auto">
      <div className="sticky top-0 z-10 w-full p-4 text-5xl font-bold bg-red-100 md:text-7xl">
        <h1>Favorites</h1>
      </div>
      <div className="w-screen h-screen p-3">
        {favorites.length > 0 ? (
          <MealDisplay
            meals={favorites}
            favorites={favorites}
            loading={loading} // Pass the `loading` value
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
