import { useState, useEffect } from "react";
import { getCategories } from "../api/productsAPI";
import { Category } from "../types";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  return categories;
};
