"use client";

import React from "react";
import { useMealStore } from "../../shared/store/mealsStore";

const SearchBar: React.FC = () => {
    const { searchQuery, setSearchQuery, fetchMealsByName } = useMealStore();

    const handleSearch = async (value: string) => {
        setSearchQuery(value); // Update the search query
        await fetchMealsByName(value); // Trigger the search action
    };

    return (
        <input
            type="text"
            placeholder="Search meals..."
            value={searchQuery} // Controlled value from the store
            onChange={(e) => handleSearch(e.target.value)} // Handle the search action
            className="w-full p-2 border rounded mb-4"
        />
    );
};

export default SearchBar;
