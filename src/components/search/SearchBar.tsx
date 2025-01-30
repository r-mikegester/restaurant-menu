import React, { useRef, useState } from "react";
import { useMealStore } from "../../shared/store/mealsStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import SelectCategories from "../categories/SelectCategories";

type SearchBarProps = {
    onSearch?: (searchQuery: string) => Promise<void>; // Callback function for search
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const { searchQuery, setSearchQuery, fetchMealsByName } = useMealStore();
    const [localQuery, setLocalQuery] = useState(searchQuery); // Local input state
    const [loading, setLoading] = useState(false); // Loading state
    const [isCollapsed, setIsCollapsed] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // Search handler
    const handleSearch = async (value: string) => {
        setSearchQuery(value); // Update store's search query
        setLoading(true); // Show spinner
        await fetchMealsByName(value); // Fetch meals
        setLoading(false); // Hide spinner
        if (onSearch) {
            await onSearch(value); // Trigger parent-provided search callback
        }
    };

    // Collapse toggle
    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <div className="bg-white sticky top-0 z-10 w-full px-4 shadow-md rounded-2xl md:rounded-t-none">
            {/* Header Section */}
            <div className="flex items-center justify-between h-20 space-x-3">
                <div className="hidden font-bold text-gray-700 md:block md:text-5xl">
                    <h1>Meals</h1>
                </div>
                <div className="p-4 text-4xl font-bold text-center text-gray-700 md:hidden">
                    <h1>Meals</h1>
                </div>

                {/* Input and Buttons */}
                <div className="flex space-x-3 items-center justify-between">
                    {/* Desktop Input Field */}
                    <input
                        type="text"
                        placeholder="Search meals..."
                        value={localQuery} // Controlled by local state
                        onChange={(e) => setLocalQuery(e.target.value)} // Update local query
                        className="w-full md:w-96 hidden md:block h-12 p-4 px-4 text-left bg-gray-100 border-2 shadow-inner drop-shadow-md text-emerald-700 font-semibold rounded-xl"
                    />

                    {/* Loading Spinner */}
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <button
                                onClick={() => handleSearch(localQuery)} // Trigger search on button click
                                className="md:flex items-center bg-white border-none shadow-inner drop-shadow-md hover:bg-transparent hover:shadow-inner rounded-xl btn btn-square hidden"
                            >
                                <Icon icon="line-md:downloading-loop" className="w-8 h-8 text-2xl text-emerald-600" />
                            </button>
                        </div>
                    ) : (
                        // Desktop Search Button
                        <button
                            onClick={() => handleSearch(localQuery)} // Trigger search on button click
                            className="md:flex items-center border-2 hover:border-2 bg-gray-100 border-gray-300 border-none shadow-inner drop-shadow-md hover:bg-transparent hover:shadow-inner hover:bg-emerald-100  rounded-xl btn btn-square hidden"
                        >
                            <Icon icon="hugeicons:search-02" className="text-2xl w-8 h-8 text-gray-700 hover:text-emerald-700" />
                        </button>
                    )}

                    {/* Collapse Toggle Button */}
                    <button
                        onClick={toggleCollapse}
                        className="bg-gray-100 hidden md:flex border-none shadow-inner btn btn-square drop-shadow-md border-2 hover:bg-transparent hover:shadow-inner hover:bg-emerald-100 hover:border-2 border-gray-300"
                        aria-label="Toggle Search Collapse"
                    >
                        <Icon
                            icon={isCollapsed ? "mdi:chevron-up" : "mdi:chevron-down"}
                            className="text-2xl text-gray-700 w-9 h-9 hover:text-emerald-700"
                        />
                    </button>

                    {/* Mobile Version Search Toggle */}
                    <button
                        onClick={toggleCollapse}
                        className="bg-gray-100 md:hidden border-none shadow-inner btn btn-square drop-shadow-md hover:bg-transparent hover:shadow-inner hover:bg-emerald-100 "
                        aria-label="Toggle Search Collapse"
                    >
                        <Icon
                            icon={isCollapsed ? "mdi:chevron-up" : "hugeicons:search-02"}
                            className="text-2xl w-8 h-8 hove:text-emerald-700"
                        />
                    </button>
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
                <div className="p-4 pt-0 rounded-2xl flex flex-col justify-center items-center">
                    <div className="flex justify-between items-center space-x-3 w-full">
                        {/* Collapsible Input Field */}
                        <input
                            type="text"
                            placeholder="Search meals..."
                            value={localQuery} // Controlled by local state
                            onChange={(e) => setLocalQuery(e.target.value)}
                            className="w-full md:hidden h-12 p-4 px-4 text-left bg-gray-100 border-2 border-gray-300 shadow-inner text-emerald-950/85 rounded-xl"
                        />
                        {/* Loading Spinner */}
                        {loading ? (
                            <div className="flex items-center md:hidden justify-center">
                                <button
                                    onClick={() => handleSearch(localQuery)} // Trigger search on button click
                                    className=" items-center bg-white border-none shadow-inner drop-shadow-md hover:bg-transparent hover:shadow-inner rounded-xl btn btn-square"
                                >
                                    <Icon icon="line-md:downloading-loop" className="w-8 h-8 text-2xl text-emerald-600" />
                                </button>
                            </div>
                        ) : (
                            // Desktop Search Button
                            <button
                                onClick={() => handleSearch(localQuery)} // Trigger search on button click
                                className="md:hidden flex items-center border-2 hover:border-2 bg-gray-100 border-gray-300 border-none shadow-inner drop-shadow-md hover:bg-transparent hover:shadow-inner hover:bg-emerald-100  rounded-xl btn btn-square"
                            >
                                <Icon icon="hugeicons:search-02" className="text-2xl w-8 h-8 text-gray-700 hover:text-emerald-700" />
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
