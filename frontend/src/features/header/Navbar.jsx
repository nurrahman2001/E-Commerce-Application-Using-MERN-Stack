import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="bg-gray-300 bg-opacity-40 py-3 shadow-md relative z-10">
            <div className="container mx-auto flex px-10 space-x-6">
                {[
                    { name: "Shop All", path: "/products" },
                    { name: "Electronics", path: "/products/?category=Electronics" },
                    { name: "Clothes", path: "/products/?category=Clothes" },
                    { name: "Shoes", path: "/products/?category=Shoes" },
                    { name: "Deals", path: "/Deals" },
                ].map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className="text-black pr-7 hover:text-gray-500 transition duration-200"
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};


