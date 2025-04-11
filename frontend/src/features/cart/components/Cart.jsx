import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import {
    fetchCartByUserIdAsync,
    deleteCartItemByIdAsync,
    resetCartItemRemoveStatus,
    selectCartItems,
    selectCartStatus
} from '../CartSlice';
import { CartItem } from './CartItem';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { TAXES } from '../../../constants';

export const Cart = ({ checkout }) => {
    const items = useSelector(selectCartItems);
    const loggedInUser = useSelector(selectLoggedInUser);
    const cartFetchStatus = useSelector(selectCartStatus);
    const dispatch = useDispatch();

    // Calculate cart totals
    const subtotal = items.reduce((acc, item) => item.product.price * item.quantity + acc, 0);
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    // Check if eligible for free shipping
    const isFreeShipping = subtotal > 50;
    const SHIPPING = isFreeShipping ? 0 : 5.99;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }, []);

    // Fetch cart items when component mounts or user changes
    useEffect(() => {
        if (loggedInUser?._id) {
            dispatch(fetchCartByUserIdAsync(loggedInUser._id));
        }
    }, [dispatch, loggedInUser]);

    // Clean up on unmount
    useEffect(() => {
        return () => {
            dispatch(resetCartItemRemoveStatus());
        };
    }, [dispatch]);

    // Handle item removal
    const handleDeleteItem = (itemId) => {
        dispatch(deleteCartItemByIdAsync(itemId));
    };
    const handleUpdateQuantity = (item) => {

    }

    if (cartFetchStatus === 'pending') {
        return (
            <div className="container mx-auto px-4 py-8 h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 mb-20">
            <div className="flex items-center space-x-2">
                <Link to="/" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <GoArrowLeft className=" text-gray-700 text-2xl " />
                </Link>
                <h1 className="text-2xl">Your Cart</h1>
            </div>
            <div className="max-w-3xl mx-auto">
                {items.length > 0 ? (
                    <>
                        {/* Cart items */}
                        <div className="mb-8">
                            {items.map((item) => (
                                <CartItem
                                    key={item._id}
                                    id={item._id}
                                    title={item.product.title}
                                    brand={item.product.brand || 'Generic'}
                                    category={item.product.category?.name || 'Product'}
                                    price={(
                                        item.product?.price * (1 - item.product?.discountPercentage / 100)
                                    ).toFixed(0)}
                                    quantity={item.quantity}
                                    thumbnail={item.product.images?.[0] || item.product.category?.name}
                                    productId={item.product._id}
                                    size={item.size}
                                    onDelete={handleDeleteItem}
                                    onUpdateQuantity={handleUpdateQuantity}
                                />
                            ))}
                        </div>

                        {/* Subtotal */}
                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                            {checkout ? (
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        {isFreeShipping ? (
                                            <span className="font-medium text-green-600">FREE</span>
                                        ) : (
                                            <span className="font-medium">${SHIPPING.toFixed(2)}</span>
                                        )}
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Taxes</span>
                                        <span className="font-medium">${TAXES.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t pt-4 mt-2">
                                        <div className="flex justify-between">
                                            <span className="font-semibold">Total</span>
                                            <span className="font-semibold">${(subtotal + SHIPPING + TAXES).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-medium">Subtotal</h3>
                                        <p className="text-sm text-gray-500">Total items in cart: {totalItems}</p>
                                        {isFreeShipping ? (
                                            <p className="text-sm text-green-600 font-medium mt-1">✓ Eligible for FREE shipping</p>
                                        ) : (
                                            <p className="text-sm text-gray-500 mt-1">Add ${(50 - subtotal).toFixed(2)} more for FREE shipping</p>
                                        )}
                                        <p className="text-sm text-gray-500 mt-1">Taxes will be calculated at checkout.</p>
                                    </div>
                                    <div className="mt-4 md:mt-0">
                                        <span className="text-lg font-medium">${subtotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Checkout or continue shopping */}
                        {!checkout && (
                            <div className="flex flex-col space-y-4">
                                <Link to="/checkout" className="bg-blue-600 text-white py-3 px-4 rounded-md text-center font-medium hover:bg-blue-700 transition-colors">
                                    Proceed to Checkout
                                </Link>
                                <div className="flex justify-center">
                                    <Link to="/products" className="text-blue-600 hover:text-blue-800 text-sm border border-blue-300 rounded-md px-4 py-2 hover:bg-blue-50 transition-colors">
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                        <h2 className="text-2xl font-medium text-gray-700 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
                        <Link to="/" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};