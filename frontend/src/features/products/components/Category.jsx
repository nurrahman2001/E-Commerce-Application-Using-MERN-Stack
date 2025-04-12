import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, selectProducts } from "../ProductSlice";
import { useNavigate } from "react-router-dom";

// Function to extract unique categories from products
const extractUniqueCategories = (products) => {
  const uniqueCategories = [
    ...new Set(products.map((product) => JSON.stringify(product.category))),
  ]
    .map((category) => JSON.parse(category))
    .filter((category) => category && category.name); // Filter out invalid or incomplete categories

  return uniqueCategories;
};

export const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  // Extract unique categories from products
  const categories = extractUniqueCategories(products);

  const setCategory = (category) => {
    // Navigate to the category filter using the category name
    navigate(`products/?category=${encodeURIComponent(category.name)}`);
  };

  return (
    <div className="bg-white mt-10">
      <h2 className="text-2xl py-6 text-center">Shop by Category</h2>
      <div className="flex justify-center gap-10 pb-10 flex-wrap">
        {categories.map((category, index) => (
          <div
            key={index}
            className="p-2 rounded-md relative w-70 h-70 flex flex-col items-center justify-center "
            onClick={() => setCategory(category)} // Add onClick to navigate to the filtered category
          >
            <div className="w-40 h-40  flex items-center justify-center overflow-hidden rounded-full border border-gray-300">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover  cursor-pointer transform transition-transform duration-700 ease-in-out hover:scale-105" // Adjusted for responsive image size
              />
            </div>
            <p className="mt-2 text-center ">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
