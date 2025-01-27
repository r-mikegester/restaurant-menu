import { Category, Meal } from "../shared/types"; // Assuming you have the Meal type defined
import SearchAndFilterHeader from "../components/SearchBar";
import MealDisplay from "../components/DisplayMeals";


interface SearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  meals: Meal[];
  favorites: Meal[];
  loading: boolean;
  handleFavoriteChange: (mealId: string) => void;
  categories: Category[]; // Ensure this is defined
  handleCategorySelect?: (category: string) => void; // Add this line
}

const Search = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  meals,
  favorites,
  loading,
  handleFavoriteChange,
  categories,
}: SearchProps) => {
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
          favorites={favorites}
          loading={loading}
          onFavoriteChange={handleFavoriteChange}
          emptyMessage={meals.length ? "No meals loaded yet!" : "No meals found. Try another search!"}
        />
      </div>
    </div>
  );
};

export default Search;
