import React from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import RootLayout from "./pages/layout/RootLayout";
import ToastNotifications from "./components/ToastNotifications";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import Misc from "./pages/Misc";
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import { useGreeting } from "./shared/hooks/useGreetings";
import { useFavorites } from "./shared/hooks/useFavorites";
import { useMeals } from "./shared/hooks/useMeals";
import { useCategories } from "./shared/hooks/useCategories";

const App = () => {
  // Greeting
  const greeting = useGreeting();

  // Meals and search functionality
  const { meals, setMeals, searchMeals } = useMeals();
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const handleSearch = () => {
    searchMeals(searchQuery);
  };

  // Favorites
  const { favorites, toggleFavorite } = useFavorites(meals);

  // Categories
  const categories = useCategories();
  const handleCategorySelect = (category: string | null) => {
    if (category) {
      const filteredMeals = meals.filter(
        (meal) => meal.strCategory === category
      );
      setMeals(filteredMeals); // Assuming you expose a `setMeals` function from `useMeals`
    } else {
      searchMeals(""); // Reset to all meals when category is deselected
    }
  };
  // Loading state (if applicable)
  const loading = false; // Replace with your actual loading logic

  return (
    <ErrorBoundary>
      <ToastNotifications />
      <Routes>
        <Route element={<RootLayout children={undefined} />}>
          {/* Home Route */}
          <Route path="/" element={<Home greeting={greeting} />} />

          {/* Favorites Route */}
          <Route
            path="/favorites"
            element={
              <Favorites />
            }
          />

          {/* Search Route */}
          <Route
            path="/search"
            element={
              <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                meals={meals}
                favorites={favorites}
                loading={loading}
                handleFavoriteChange={toggleFavorite}
                categories={categories}
                handleCategorySelect={handleCategorySelect}
              />
            }
          />

          {/* Other Routes */}
          <Route path="/misc" element={<Misc />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/splash" element={<SplashScreen />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
