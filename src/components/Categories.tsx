import React from "react";
import { useCategories } from "../shared/hooks/useCategories"; // Adjust the path according to your structure

interface CategoriesProps {
  categories: { idCategory: string; strCategory: string }[];
  onCategorySelect: (category: string | null) => void;
  selectedCategory: string | null;
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect, selectedCategory }) => {
  const categories = useCategories(); // Fetch categories using the hook

  return (
    <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
      {/* 'All Categories' button */}
      <button
        className={`btn btn-outline rounded-lg btn-sm ${
          selectedCategory === null ? "btn-primary text-white" : "btn-secondary"
        }`}
        onClick={() => onCategorySelect(null)} // Reset selection
      >
        All Categories
      </button>

      {/* Render dynamic category buttons */}
      {categories.map((category) => (
        <button
          key={category.idCategory}
          className={`btn btn-outline rounded-lg btn-sm ${
            selectedCategory === category.strCategory
              ? "btn-primary text-white"
              : "btn-secondary"
          }`}
          onClick={() => onCategorySelect(category.strCategory)}
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
};

export default Categories;
