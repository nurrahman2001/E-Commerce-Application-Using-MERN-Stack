import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"; 
import { fetchProductsAsync, selectProducts, selectProductFetchStatus } from "../ProductSlice";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { loadingAnimation } from "../../../assets";
import { GoArrowLeft } from "react-icons/go";

const ITEMS_PER_PAGE = 12;

export const Product = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const products = useSelector(selectProducts);
    const productsFetchStatus = useSelector(selectProductFetchStatus);

    const [currentPage, setCurrentPage] = useState(1);

    // Get category from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category"); 
    

    useEffect(() => {
        dispatch(fetchProductsAsync(category || "")); // If no category, fetch all products
    }, [dispatch, category]);

    // Pagination logic
    const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

    return (
        <div className="p-10 max-w-7xl mx-auto">
            {/* Back Button */}
            <div className="flex items-center gap-2 self-start mb-4">
                <motion.div whileHover={{ x: -5 }}>
                    <Link to="/">
                        <button className="p-2 rounded-full hover:bg-gray-200 transition">
                            <GoArrowLeft className=" text-gray-700 text-2xl " />
                        </button>
                    </Link>
                </motion.div>
                <h2 className="text-gray-700 text-2xl">{category ? `${category}` : "All Products"}</h2>
            </div>

            {productsFetchStatus === "pending" ? (
                <Lottie animationData={loadingAnimation} className="w-40 h-40 mx-auto" />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {currentProducts.map((product) => (
                            <div
                                key={product._id}
                                onClick={() => navigate(`/product-details/${product._id}`)}
                                className="cursor-pointer border p-4 rounded-lg shadow-lg hover:scale-105 transition"
                            >
                                <img src={product.images[0]} alt={product.title} className="w-full h-45 object-cover rounded-md" />
                                <h4  className="text-sm text-gray-500 capitalize mt-2">{product.brand}</h4>
                                <p className="text-gray-600">{product.title}</p>
                                <span className="text-lg font-semibold text-gray-600">
                                    ${(
                                        product?.price * (1 - product?.discountPercentage / 100)
                                    ).toFixed(0)}
                                </span>
                                <span className=' text-gray-500 line-through px-2'>
                                    ${product?.price}
                                </span>
                                <span className="text-green-500 ml-2">({product?.discountPercentage}% off)</span>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border rounded-l-md bg-gray-200 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 border">{currentPage} / {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border rounded-r-md bg-gray-200 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
