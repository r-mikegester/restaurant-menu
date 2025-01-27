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
import { useMeals } from "./shared/hooks/useMeals";
import { useCategories } from "./shared/hooks/useCategories";

const App = () => {
  // Greeting
  const greeting = useGreeting();

  // Meals and search functionality
  const { meals, searchMeals } = useMeals();
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const handleSearch = () => {
    searchMeals(searchQuery);
  };

  // Categories
  const categories = useCategories();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

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
          <Route path="/favorites" element={<Favorites />} />

          {/* Search Route */}
          <Route
            path="/search"
            element={
              <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                meals={meals}
                loading={loading}
                categories={categories}
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
