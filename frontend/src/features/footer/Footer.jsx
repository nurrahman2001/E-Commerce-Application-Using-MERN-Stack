import React from "react";
import { Link } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="bg-white text-gray-800 py-12 px-4 md:px-12 flex flex-col gap-20">
      {/* upper section */}
      <div className="flex flex-wrap justify-around gap-8">
        <div className="flex flex-col gap-4 p-4">
          <h6 className="text-xl font-semibold">Exclusive</h6>
          <h6 className="text-lg font-semibold">Subscribe</h6>
          <p className="text-sm font-light">Get 10% off your first order</p>
          <div className="flex border border-gray-400 rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent text-white px-2 py-1 outline-none w-full placeholder-gray-400"
            />
            <button className="px-3 py-2 bg-blue-500 text-white">
              <FaPaperPlane />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <h6 className="text-lg font-semibold">Support</h6>
          <a
            href="https://www.google.com/maps?q=11th+Street,+Christian+Basti,+Guwahati,+Assam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-light hover:text-blue-400"
          >
            11th Street, Christian Basti, Guwahati, Assam.
          </a>
          <p className="text-sm font-light">support.nuebuy@gmail.com</p>
          <p className="text-sm font-light">+91-9365282550</p>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <h6 className="text-lg font-semibold">Account</h6>
          <Link to="/account" className="text-sm font-light hover:text-gray-100">
            My Account
          </Link>
          <Link to="/cart" className="text-sm font-light hover:text-gray-100">
            Cart
          </Link>
          <Link to="/wishlist" className="text-sm font-light hover:text-gray-100">
            Wishlist
          </Link>
          <Link to="/products" className="text-sm font-light hover:text-gray-100">
            Shop
          </Link>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <h6 className="text-lg font-semibold">Quick Links</h6>
          <Link to="/privacy-policy" className="text-sm font-light hover:text-gray-100">
            Privacy Policy
          </Link>
          <Link to="/terms-of-use" className="text-sm font-light hover:text-gray-100">
            Terms Of Use
          </Link>
          <Link to="/faq" className="text-sm font-light hover:text-gray-100">
            FAQ
          </Link>
          <Link to="/admin/login" target="blank" className="text-sm font-light hover:text-gray-100">
            Become a Seller
          </Link>
        </div>
      </div>

      {/* lower section */}
      <div className="text-gray-500 text-center">
        &copy; NeoBuy {new Date().getFullYear()}. All rights reserved.
      </div>
    </div>
  );
};
