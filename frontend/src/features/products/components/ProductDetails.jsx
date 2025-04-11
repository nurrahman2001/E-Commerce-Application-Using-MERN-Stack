import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegHeart, FaHeart, FaTag, FaCheck } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { loadingAnimation } from '../../../assets';

import {
    fetchProductByIdAsync,
    selectProductFetchStatus,
    selectSelectedProduct
} from '../ProductSlice';

import {
    addToCartAsync,
    selectCartItems
} from '../../cart/CartSlice';

import {
    selectLoggedInUser
} from '../../auth/AuthSlice';

import {
    createWishlistItemAsync,
    deleteWishlistItemByIdAsync,
    selectWishlistItems
} from '../../wishlist/WishlistSlice';

const SIZESOFCLOTHS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const SIZESOFSHOES = ['5', '6', '7', '8', '9', '10', '11'];

export const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const product = useSelector(selectSelectedProduct);
    const cartItems = useSelector(selectCartItems);
    const wishlistItems = useSelector(selectWishlistItems);
    const loggedInUser = useSelector(selectLoggedInUser);
    const productFetchStatus = useSelector(selectProductFetchStatus);

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // Added state for description toggle

    const isProductInCart = cartItems.some(item => item.product._id === id);
    const isProductInWishlist = wishlistItems.some(item => item.product._id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductByIdAsync(id));
        }
    }, [id, dispatch]);

    const handleAddToCart = () => {
        if (isProductInCart) {
            navigate('/checkout');
        } else {
            dispatch(addToCartAsync({ user: loggedInUser._id, product: id, size: selectedSize }));
            toast.success('Product added to cart');
        }
    };

    const handleWishlistToggle = () => {
        if (isProductInWishlist) {
            const wishlistItem = wishlistItems.find(item => item.product._id === id);
            dispatch(deleteWishlistItemByIdAsync(wishlistItem._id));
            toast.success('Removed from wishlist');
        } else {
            dispatch(createWishlistItemAsync({ user: loggedInUser._id, product: id }));
            toast.success('Added to wishlist');
        }
    };

    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    return (
        <div className="flex flex-col items-center p-4">
            {/* Back Button */}
            <div className="flex items-center gap-2 self-start mb-5">
                <motion.div whileHover={{ x: -5 }}>
                    <Link to="/products">
                        <button className="p-2 rounded-full hover:bg-gray-100 transition">
                           <GoArrowLeft className=" text-gray-700 text-2xl " />
                        </button>
                    </Link>
                </motion.div>
            </div>

            {/* Loading Animation */}
            {productFetchStatus === "pending" ? (
                <Lottie animationData={loadingAnimation} className="w-40 h-40" />
            ) : (
                <div className="flex flex-col md:flex-row w-full max-w-7xl gap-8">
                    {/* Product Image Section */}
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                        <div className="relative w-full flex items-center justify-center">
                            {product?.images?.length > 0 && (
                                <img
                                    src={product.images[selectedImageIndex]}
                                    alt={product?.title}
                                    className="w-full max-h-96 object-contain rounded-xl shadow-md"
                                />
                            )}
                            {/* Previous & Next Buttons */}
                            {product?.images?.length > 1 && (
                                <>
                                    <button
                                        onClick={() =>
                                            setSelectedImageIndex((prev) =>
                                                prev > 0 ? prev - 1 : product.images.length - 1
                                            )
                                        }
                                        className="absolute left-2  p-2 rounded-full hover:bg-gray-600"
                                    >
                                        ❮
                                    </button>
                                    <button
                                        onClick={() =>
                                            setSelectedImageIndex((prev) =>
                                                prev < product.images.length - 1 ? prev + 1 : 0
                                            )
                                        }
                                        className="absolute right-2  p-2 rounded-full hover:bg-gray-600"
                                    >
                                        ❯
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {product?.images?.length > 1 && (
                            <div className="flex gap-2 mt-3">
                                {product.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Thumbnail ${index}`}
                                        className={`w-16 h-16 object-cover border-2 cursor-pointer rounded-lg transition-transform duration-500 ${selectedImageIndex === index
                                            ? "border-gray-800 scale-105"
                                            : "border-gray-300 hover:scale-105"
                                            }`}
                                        onClick={() => setSelectedImageIndex(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details Section */}
                    <div className="w-full md:w-1/2 p-4">
                        <h2 className="text-xl ">{product?.brand}</h2>
                        <p className="text-gray-600 text-lg mb-2">{product?.title}</p>
                        <span className="text-lg font-bold">
                            ${(
                                product?.price * (1 - product?.discountPercentage / 100)
                            ).toFixed(0)}
                        </span>
                        <span className=' text-gray-500 line-through px-2'>
                            ${product?.price}
                        </span>
                        <span className="text-green-500 ml-2">({product?.discountPercentage}% off)</span>

                        {/* Description with Toggle */}
                        <p
                            className="text-md text-gray-500 leading-relaxed mt-2 cursor-pointer"
                            onClick={toggleDescription}
                        >
                            {isDescriptionExpanded ? product?.description : `${product?.description?.slice(0, 100)}...`}
                        </p>
                        <button
                            onClick={toggleDescription}
                            className="text-blue-500 mt-2"
                        >
                            {isDescriptionExpanded ? 'Read Less' : 'Read More'}
                        </button>

                        {["Clothes", "Shoes"].includes(product?.category?.name) && (
                            <div className="mt-5">
                                <p className="text-gray-800">Select Size:</p>
                                <div className="flex gap-2 mt-2">
                                    {(product?.category?.name === "Clothes" ? SIZESOFCLOTHS : SIZESOFSHOES).map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 border rounded-md text-sm  transition ${selectedSize === size
                                                ? "bg-black text-white border-black"
                                                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={handleAddToCart}
                                className="bg-gray-800 text-white px-6 py-2 rounded-lg text-lg  shadow-md transition hover:bg-gray-700 hover:scale-105"
                            >
                                {isProductInCart ? "Go to Checkout" : "Add to Cart"}
                            </button>

                            <button
                                onClick={handleWishlistToggle}
                                className="text-red-500 text-3xl transition hover:scale-110"
                            >
                                {isProductInWishlist ? <FaHeart /> : <FaRegHeart />}
                            </button>
                        </div>
                        {product?.price >= 50 && (
                            <p className="text-green-600 font-medium mt-3"><FaCheck className='inline' /> Free Delivery Available</p>
                        )}

                        {/* Available Offers */}
                        <div className="mt-6 border-t pt-4">
                            <p className="mb-3">Available Offers</p>
                            <div className="space-y-2 text-gray-600">
                                <p className="flex items-center">
                                    <FaTag className="mr-2 text-gray-500" /> 10% Instant Discount on Mastercard Credit Card.
                                </p>
                                <p className="flex items-center">
                                    <FaTag className="mr-2 text-gray-500" /> 10% off on SBI Credit Card EMI Transactions.
                                </p>
                                <p className="flex items-center">
                                    <FaTag className="mr-2 text-gray-500" /> 5% off up to $35 on Axis Bank Credit Card.
                                </p>
                                <p className="flex items-center">
                                    <FaTag className="mr-2 text-gray-500" /> Get extra 5% off (price inclusive).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
