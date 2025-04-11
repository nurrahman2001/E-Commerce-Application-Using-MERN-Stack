import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import {
  fetchProductsAsync,
  selectProducts,
  selectProductFetchStatus,
} from "../ProductSlice";

export const BestSeller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const productFetchStatus = useSelector(selectProductFetchStatus);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProductsAsync());
  }, [dispatch, products.length]);

  const bestSellers = [...products]
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, 12);

  const itemWidth = 255; // Set a fixed width 
  const gap = 16; 
  const moveDistance = itemWidth + gap; 

  const nextSlide = () => {
    if (currentIndex + 4 < bestSellers.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Swipe Handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  if (productFetchStatus === "pending") {
    return <p className="text-center text-gray-600">Loading best sellers...</p>;
  }

  if (productFetchStatus === "rejected") {
    return <p className="text-center text-red-500">Failed to load best sellers.</p>;
  }

  return (
    <div className="bg-white w-full mt-10 pb-10">
      <h2 className="text-2xl py-6 text-center">Best Sellers</h2>

      <div className="relative flex items-center justify-center px-16">
        {/* Left Button */}
        <button
          className={`absolute left-0 z-10 p-2 rounded-full ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
          }`}
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <GoChevronLeft size={24} />
        </button>

        {/* Product Slider */}
        <div {...swipeHandlers} className="overflow-hidden w-full">
          <div
            ref={sliderRef}
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * moveDistance}px)`,
            }}
          >
            {bestSellers.map((product) => (
              <div
                key={product._id}
                className="flex-shrink-0 border border-gray-300 cursor-pointer shadow-sm overflow-hidden"
                style={{ width: `${itemWidth}px` }} // 🔥 Fixed width applied here
                onClick={() => navigate(`/product-details/${product._id}`)}
              >
                <div className="transition-transform duration-300 ease-in-out hover:scale-105 overflow-hidden">
                  <img src={product.images[0]} alt={product.title} className="w-full h-50 object-cover" />
                </div>
                <div className="p-3">
                  <h3 className="text-lg text-gray-800">{product.brand}</h3>
                  <p className="text-sm text-gray-800 mb-2">{product.title}</p>

                  <span className="text-lg font-semibold text-gray-600">
                    ${(
                      product?.price * (1 - product?.discountPercentage / 100)
                    ).toFixed(0)}
                  </span>
                  <span className="text-gray-500 line-through px-2">${product?.price}</span>
                  <span className="text-green-500 ml-2">({product?.discountPercentage}% off)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Button */}
        <button
          className={`absolute right-0 z-10 p-2 rounded-full ${
            currentIndex + 4 >= bestSellers.length ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
          }`}
          onClick={nextSlide}
          disabled={currentIndex + 4 >= bestSellers.length}
        >
          <GoChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};
