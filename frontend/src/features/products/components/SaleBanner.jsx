import React from "react";
import { FaBolt } from "react-icons/fa";
import banner3 from "../../../assets/images/banner3.jpg"; 

export const SaleBanner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-white to-lime-100 p-10  md:px-16 ">
      {/* Left Section - Text */}
      <div className="text-center md:text-left md:w-1/2 space-y-4">
        <FaBolt className="text-4xl mx-auto md:mx-0 text-red-600" />
        <p className="text-sm uppercase font-medium tracking-wide text-gray-600">SALE IS ON!</p>
        <h2 className="text-5xl font-bold text-blue-800">25% OFF</h2>
        <p className="text-gray-700">25% off sitewide using <b className="text-blue-500">PHP100</b> at checkout</p>
      </div>

      {/* Right Section - Image */}
      <div className="md:w-1/2 mt-6 md:mt-0">
        <img
          src={banner3}
          alt="Sale Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

