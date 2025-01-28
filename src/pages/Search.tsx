import { useFavoritesStore } from "../shared/store/favoritesStore";
import MealDisplay from "../components/DisplayMeals";
import SearchAndFilterHeader from "../components/SearchBar";
import { Category, Meal } from "../shared/types";

interface SearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  favorites: Meal[];
  meals: Meal[];
  loading: boolean;
  categories: Category[];
  handleFavoriteChange: (mealId: string) => void;
  handleCategorySelect: (category: string) => void; // Add this line
}

const Search = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  meals,
  loading,
  categories,
}: SearchProps) => {
  const { favorites, toggleFavorite } = useFavoritesStore();

  return (
    <div className="w-full h-screen pb-20 overflow-x-hidden overflow-y-scroll">
      <div className="p-4 text-4xl font-bold text-center text-gray-700 bg-white md:hidden">
        <h1>Search</h1>
      </div>
      <div className="sticky top-0 z-10">
        <SearchAndFilterHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          categories={categories}
        />
      </div>
      <div className="w-screen p-3 h-fit">
        <MealDisplay
          meals={meals}
          favorites={favorites} // Accessed directly from the store
          loading={loading}
          onFavoriteChange={(mealId) => {
            const meal = meals.find((m) => m.idMeal === mealId);
            if (meal) toggleFavorite(meal);
          }}
          emptyMessage={
            meals.length
              ? "No meals loaded yet!"
              : "No meals found. Try another search!"
          }
        />
      </div>
    </div>
  );
};

export default Search;
