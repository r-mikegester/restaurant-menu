import React, { useRef, useState } from "react";
import { useMealStore } from "../../shared/store/mealsStore";
import SearchInput from "./SearchInput";
import CollapseButton from "./CollapseButton";
import SelectCategories from "../categories/SelectCategories";
import { Icon } from "@iconify/react/dist/iconify.js";

type SearchBarProps = {
    onSearch?: (searchQuery: string) => Promise<void>;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const { searchQuery, setSearchQuery, fetchMealsByName, fetchRandomMeals } = useMealStore();
    const [localQuery, setLocalQuery] = useState(searchQuery);
    const [loading, setLoading] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleSearch = async (value: string) => {
        if (!value.trim()) return; // Prevent searching empty strings
        setSearchQuery(value);  // Update the global search query state
        setLoading(true);
        try {
            await fetchMealsByName(value);  // Fetch meals based on the query
            if (onSearch) {
                await onSearch(value);
            }
        } finally {
            setLoading(false); // Ensure loading is reset after everything
        }
    };


    
    const handleClearSearch = () => {
        setLocalQuery(""); // Clear the local query input field
        setSearchQuery(""); // Clear the global search query
        fetchRandomMeals(); // Reset meals or fetch random meals
        
    };

    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <div className="sticky top-0 z-10 w-full px-4 bg-white shadow-md rounded-2xl md:rounded-t-none">
            {/* Header Section */}
            <div className="flex items-center justify-between h-20 space-x-3">
                <div className="hidden font-bold text-gray-700 md:block md:text-5xl">
                    <h1>Meals</h1>
                </div>
                <div className="p-4 text-4xl font-bold text-center text-gray-700 md:hidden">
                    <h1>Meals</h1>
                </div>

                {/* Input and Buttons */}
                <div className="flex items-center justify-between space-x-3">
                    <SearchInput
                        localQuery={localQuery}
                        setLocalQuery={setLocalQuery}
                        onSearch={() => handleSearch(localQuery)}
                        loading={loading}
                    />
                    <CollapseButton isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
                </div>
            </div>

            {/* Collapsible Search Section */}
            <div
                ref={contentRef}
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isCollapsed ? "max-h-48" : "max-h-0"
                    }`}
                style={{
                    maxHeight: isCollapsed ? `${contentRef.current?.scrollHeight}px` : "0",
                }}
            >
                <div className="flex flex-col items-center justify-center p-4 pt-0 rounded-2xl">
                    <div className="relative flex items-center justify-between w-full p-2 space-x-3">
                        <input
                            type="text"
                            placeholder="Search meals..."
                            value={localQuery}
                            onChange={(e) => setLocalQuery(e.target.value)}
                            className="w-full h-12 p-4 px-4 text-left bg-gray-100 border-2 border-gray-300 shadow-inner md:hidden text-emerald-950/85 rounded-xl"
                        />

                        {/* Search Button */}
                        <button
                            onClick={() => handleSearch(localQuery)}
                            disabled={loading} // Prevent multiple clicks
                            className={`items-center border-none shadow-inner md:hidden  drop-shadow-md rounded-xl btn btn-square ${loading
                                ? "bg-white hover:bg-transparent"
                                : "bg-gray-100 border-2 border-gray-300 hover:bg-emerald-100 hover:shadow-inner"
                                }`}
                        >
                            <Icon
                                icon={loading ? "line-md:downloading-loop" : "hugeicons:search-02"}
                                className="w-8 h-8 text-2xl text-gray-700 hover:text-emerald-700"
                            />
                        </button>

                        {/* Clear Search Button (Only shows when input is not empty) */}
                        {localQuery && (
                            <button
                                onClick={handleClearSearch}
                                className="absolute text-white bg-red-500 btn btn-sm btn-square md:hidden right-20 hover:bg-red-400"
                            >
                                <Icon icon="line-md:close-small" className="size-8" />
                            </button>
                        )}
                    </div>

                    {/* Select Categories */}
                    <SelectCategories />
                </div>
            </div>
        </div>
    );
};



export default SearchBar;
