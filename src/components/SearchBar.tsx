import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import Categories from "./Categories";
import "react-toastify/dist/ReactToastify.css";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (category?: string | null) => void;
  categories: { idCategory: string; strCategory: string }[];
}

const SearchAndFilterHeader: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  categories,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Updated type
  

  const contentRef = useRef<HTMLDivElement>(null);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleCategorySelect = (category: string | null) => {
    const newCategory = selectedCategory === category ? null : category; // Toggle selection
    setSelectedCategory(newCategory); // Updated to accept null
    onSearch(newCategory); // Pass category (can be null)

    const message = newCategory
      ? `Selected category: ${newCategory}`
      : "Reset to all categories";
    toast.info(message, { position: "top-center", autoClose: 3000 });
  };

  return (
    <div className="sticky top-0 z-20 w-full px-4 bg-white shadow-md rounded-2xl md:rounded-t-none">
      <div className="flex items-center justify-between h-20 space-x-3">
        {/* Search Input */}
        <div className="hidden font-bold text-gray-700 md:block md:text-5xl">
          <h1>Search</h1>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a meal"
          className="w-full h-12 p-4 px-4 text-left bg-gray-100 border-2 border-gray-300 shadow-inner drop-shadow-md text-emerald-950/85 rounded-xl"
        />
        <button
          onClick={() => onSearch(selectedCategory)}
          className="flex items-center bg-white border-none shadow-inner drop-shadow-md hover:bg-transparent hover:shadow-inner rounded-xl btn btn-square"
        >
          <Icon icon="hugeicons:search-02" className="size-8" />
        </button>
        <button
          onClick={toggleCollapse}
          className="bg-white border-none shadow-inner btn btn-square drop-shadow-md hover:bg-transparent hover:shadow-inner"
          aria-label="Toggle Search Collapse"
        >
          <Icon
            icon={isCollapsed ? "mdi:chevron-up" : "mdi:chevron-down"}
            className="size-8"
          />
        </button>
      </div>

      {/* Collapsible Content */}
      <div
        ref={contentRef}
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isCollapsed ? "max-h-40" : "max-h-0"
        }`}
        style={{
          maxHeight: isCollapsed ? `${contentRef.current?.scrollHeight}px` : "0",
        }}
      >
        <div className="p-4 pt-0 rounded-lg shadow-lg">
          <Categories
            categories={categories}
            onCategorySelect={handleCategorySelect} // Updated to match type
            selectedCategory={selectedCategory} // Updated type
          />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilterHeader;
