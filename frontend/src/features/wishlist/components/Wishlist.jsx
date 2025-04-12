import { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoArrowLeft } from 'react-icons/go';
import {
  fetchWishlistByUserIdAsync,
  deleteWishlistItemByIdAsync,
  resetWishlistFetchStatus,
  selectWishlistFetchStatus,
  selectWishlistItems,
  resetWishlistItemDeleteStatus,
} from '../WishlistSlice';
import {
  addToCartAsync,
  resetCartItemAddStatus,
  selectCartItemAddStatus
} from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';

export const Wishlist = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const wishlistItems = useSelector(selectWishlistItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const cartItemAddStatus = useSelector(selectCartItemAddStatus);
  const wishlistFetchStatus = useSelector(selectWishlistFetchStatus);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, []);

  // Fetch wishlist items when component mounts or user changes
  useEffect(() => {
    if (loggedInUser?._id) {
      dispatch(fetchWishlistByUserIdAsync(loggedInUser._id));
    }
  }, [dispatch, loggedInUser]);

  // Handle toast notifications


  useEffect(() => {
    if (cartItemAddStatus === 'fulfilled') {
      toast.success("Product added to cart");
    } else if (cartItemAddStatus === 'rejected') {
      toast.error('Error adding product to cart, please try again later');
    }
  }, [cartItemAddStatus]);

  useEffect(() => {
    if (wishlistFetchStatus === 'rejected') {
      toast.error("Error fetching wishlist, please try again later");
    }
  }, [wishlistFetchStatus]);

  // Cleanup function to reset all statuses when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetWishlistFetchStatus());
      dispatch(resetCartItemAddStatus());
      dispatch(resetWishlistItemDeleteStatus());
    };
  }, [dispatch]);

  const handleDeleteFromWishlist = (wishlistItemId) => {
    dispatch(deleteWishlistItemByIdAsync(wishlistItemId));
  };

  const handleAddToCart = (productId) => {
    if (!loggedInUser) {
      return Navigate('/login');
    }
    const data = { user: loggedInUser?._id, product: productId };
    dispatch(addToCartAsync(data));
  };

  return (
    <div className="container mx-auto p-8 mb-24">
      {wishlistFetchStatus === 'pending' ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Link to="/" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <GoArrowLeft className=" text-gray-700 text-2xl " />
            </Link>
            <h1 className="text-2xl ">Your Wishlist</h1>
          </div>

          {wishlistFetchStatus !== 'pending' && (!wishlistItems || wishlistItems.length === 0) ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <p className="text-lg text-gray-500">You have no items in your wishlist</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={item.product.images?.[0] || "https://via.placeholder.com/300"}
                      alt={item.product.title}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => handleDeleteFromWishlist(item._id)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-100 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="text-sm text-gray-500 capitalize">{item.product.brand}</div>
                    <h3 className="text-gray-700 text-sm font-medium line-clamp-2">{item.product.title}</h3>

                    <div className="flex items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-600">
                          ${(
                            item.product?.price * (1 - item.product?.discountPercentage / 100)
                          ).toFixed(0)}
                        </span>
                        <span className=' text-gray-500 line-through px-2'>
                          ${item.product?.price}
                        </span>
                        <span className="text-green-500 ml-2">({item.product?.discountPercentage}% off)</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item.product._id)}
                      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};