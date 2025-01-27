import React from "react";
import { useSwipeable } from "react-swipeable";
import BottomNav from "../../components/BottomNav";
import { useCategories } from "../../shared/hooks/useCategories";
import { useFavorites } from "../../shared/hooks/useFavorites";
import { useGreeting } from "../../shared/hooks/useGreetings";
import { useMeals } from "../../shared/hooks/useMeals";
import { showInfoToast, showSuccessToast } from "../../shared/libs/toast";
import Favorites from "../Favorites";
import Misc from "../Misc";
import Search from "../Search";
import Home from "../Home";
import useTabStore from "../../shared/store/tabStore";
import SwipeableViews from "../../components/SwipeableViews";
import ErrorBoundary from "../../components/ErrorBoundary"; // Import the ErrorBoundary
import ToastNotifications from "../../components/ToastNotifications";

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    const { activeTab, prevTab, isAnimating, setActiveTab, setAnimating } = useTabStore();

    const greeting = useGreeting();
    const { meals, searchMeals } = useMeals();
    const categories = useCategories();
    const [searchQuery, setSearchQuery] = React.useState("");
    const { favorites, toggleFavorite } = useFavorites(meals);
    const [loading, setLoading] = React.useState(false);

    const views = [
        { name: "Home", component: <Home key="home" greeting={greeting} /> },
        {
            name: "Search",
            component: (
                <Search
                    key="search"
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={() => {
                        setLoading(true);
                        setTimeout(() => {
                            searchMeals(searchQuery);
                            setLoading(false);
                            showInfoToast(`Search completed.`);
                        }, 1500);
                    }}
                    meals={meals}
                    favorites={favorites}
                    loading={loading}
                    handleFavoriteChange={(mealId: string) => {
                        toggleFavorite(mealId);
                        const isFavorited = favorites.some((fav) => fav.id === mealId);
                        showSuccessToast(
                            isFavorited ? "Meal removed from favorites!" : "Meal added to favorites!"
                        );
                    }}
                    categories={categories}
                    handleCategorySelect={(category: string) => {
                        setLoading(true);
                        setTimeout(() => {
                            setLoading(false);
                            showInfoToast(`Category selected: ${category}`);
                        }, 1500);
                    }}
                />
            ),
        },
        {
            name: "Favorites",
            component: (
                <Favorites />
            ),
        },
        { name: "Credits", component: <Misc key="misc" /> },
    ];

    const handleSwipe = (delta: number) => {
        if (isAnimating) return;

        const nextTab = activeTab + delta;
        if (nextTab >= 0 && nextTab < views.length) {
            setAnimating(true);
            setActiveTab(nextTab);
            setTimeout(() => setAnimating(false), 300);
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe(1),
        onSwipedRight: () => handleSwipe(-1),
        preventScrollOnSwipe: true,
    });

    return (
        <ErrorBoundary>
            <div {...handlers} className="flex flex-col h-screen overflow-hidden bg-gray-100 root-layout">
                {/* Swipeable Views */}
                <SwipeableViews activeTab={activeTab} prevTab={prevTab} views={views} />

                {/* Main content will be injected here */}
                <main className="">{children}</main>

                <ToastNotifications />

                <div className="z-20">
                    <BottomNav />
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default RootLayout;
