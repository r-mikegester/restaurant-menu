import React, { useRef, useState } from "react";
import { useMealStore } from "../../shared/store/mealsStore";
import SearchInput from "./SearchInput"; // Import SearchInput
import CollapseButton from "./CollapseButton"; // Import CollapseButton
import SelectCategories from "../categories/SelectCategories";

type SearchBarProps = {
    onSearch?: (searchQuery: string) => Promise<void>;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const { searchQuery, setSearchQuery, fetchMealsByName } = useMealStore();
    const [localQuery, setLocalQuery] = useState(searchQuery);
    const [loading, setLoading] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleSearch = async (value: string) => {
        setSearchQuery(value);
        setLoading(true);
        await fetchMealsByName(value);
        setLoading(false);
        if (onSearch) {
            await onSearch(value);
        }
    };

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
                <div className="p-4 pt-0 rounded-2xl flex flex-col justify-center items-center">
                    <div className="flex justify-between items-center space-x-3 w-full">
                        <input
                            type="text"
                            placeholder="Search meals..."
                            value={localQuery}
                            onChange={(e) => setLocalQuery(e.target.value)}
                            className="w-full md:hidden h-12 p-4 px-4 text-left bg-gray-100 border-2 border-gray-300 shadow-inner text-emerald-950/85 rounded-xl"
                        />
                    </div>
                    {/* Select Categories */}
                    <SelectCategories />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
