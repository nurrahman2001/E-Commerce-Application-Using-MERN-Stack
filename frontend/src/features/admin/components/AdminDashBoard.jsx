import { useState } from "react";
import { Statistics } from "./Statistics";
import { ProductList } from "./ProductList";
import { OrderList } from "./OrderList";
import { CustomerList } from "./CustomerList";
import { CouponList } from "./CouponList";

import {
  FiBox,
  FiUsers,
  FiTag,
  FiShoppingCart,
  FiGift,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";


export const AdminDashBoard = () => {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <FiBox />, component: <Statistics /> },
    { name: "Products", icon: <FiTag />, component: <ProductList /> },
    { name: "Orders", icon: <FiShoppingCart />, component: <OrderList /> },
    { name: "Customers", icon: <FiUsers />, component: <CustomerList /> },
    { name: "Coupons", icon: <FiGift />, component: <CouponList /> },
    { name: "Settings", icon: <FiSettings />, path: "/admin/settings" },
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "admin/login";
  }
  return (
    <div className="bg-gray-200 flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white shadow-lg p-5 fixed left-0 top-0 h-screen">
        <Link to="/" className="flex items-center gap-3 mb-6">
          <img src={Logo} alt="NeoBuy Logo" className="h-12 w-20" />
        </Link>
        <ul className="mt-6 space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition ${active === item.name ? "bg-blue-100" : ""
                }`}
              onClick={() => setActive(item.name)}
            >
              {item.path ? (
                <Link to={item.path} className="flex items-center gap-3 w-full">
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ) : (
                <div className="flex items-center gap-3 w-full">
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="absolute bottom-5 w[80%]">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-100 rounded-lg">
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-[20%]">
        {menuItems.find((item) => item.name === active)?.component || (
          <h2 className="text-2xl font-semibold">Select a menu option</h2>
        )}
      </main>
    </div>
  );
};
