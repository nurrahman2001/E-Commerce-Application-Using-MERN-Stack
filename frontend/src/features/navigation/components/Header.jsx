import React, { useState, useCallback, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../user/UserSlice";
import { selectCartItems } from "../../cart/CartSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { selectWishlistItems } from "../../wishlist/WishlistSlice";
import Logo from "../../../assets/images/logo.png";
import { CgShoppingCart, CgHeart, CgSearch } from "react-icons/cg";
import { AiOutlineShop } from "react-icons/ai";

export const Header = ({ isProductList = false }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const userMenuRef = useRef(null);

  const userInfo = useSelector(selectUserInfo);
  const cartItems = useSelector(selectCartItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const wishlistItems = useSelector(selectWishlistItems);

  const navigate = useNavigate();

  const navigateToCart = useCallback(() => {
    navigate("/cart");
  }, [navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const settings = [
    { name: "Home", to: "/" },
    { name: "Profile", to: "/profile" },
    { name: "My Orders", to: "/orders" },
    { name: "Logout", to: "/logout" },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm py-1 px-9 sticky top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="NeoBuy Logo" className="h-16 w-20" />
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative hidden md:flex items-center w-1/3">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-3 text-gray-600 hover:text-gray-900" aria-label="Search">
            <CgSearch size={18} />
          </button>
        </form>

        {/* User & Actions */}

        <div className="flex items-center space-x-8">
          {
            loggedInUser ? (<div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="focus:outline-none w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-semibold text-lg uppercase"
                aria-label="User Menu"
              >
                {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : "U"}
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {settings.map(({ name, to }) => (
                    <Link key={name} to={to} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      {name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            ) : (
              <Link
                to="/login"
                className="relative group hidden md:inline-block text-gray-700 text-lg hover:text-black"
              >
                Login
                <span
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 flex flex-col items-center
                   bg-blue-600 text-white text-sm px-4 py-2 group-hover:hidden transition ease-in-out duration-300"
                >
                  Login
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 
                     border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-blue-600">
                  </span>
                </span>
              </Link>



            )
          }


          {/* Cart, Wishlist Icons */}
          <div className="flex items-center space-x-6">
            {/* Cart Icon */}
            <button onClick={navigateToCart} className="relative text-gray-700 hover:text-gray-900" aria-label="Cart">
              <CgShoppingCart size={22} />
              {cartItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Wishlist Button */}

            <Link to="/wishlist" className="relative text-gray-700 hover:text-gray-900" aria-label="Wishlist">
              <CgHeart size={22} />
              {wishlistItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link to="/admin/login" target="_blank" className="relative text-gray-700 hover:text-gray-900" aria-label="AiOutlineShop">
              <AiOutlineShop className="inline" size={22} />
              <span className="text-gray-700 text-md px-1.5 py-0.5 rounded-full">
                Become a Seller
              </span>

            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
};
