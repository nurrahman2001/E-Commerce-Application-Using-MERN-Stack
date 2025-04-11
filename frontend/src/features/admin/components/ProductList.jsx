import React, { useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import { AddProduct } from "./AddProduct";

const dummyProducts = [
    {
        id: "7712309",
        name: "Dog Food, Chicken & Chicken Liver Recipe",
        price: "1452.50",
        quantity: "1,638",
        image: "https://i.imgur.com/R2PN9Wq.jpeg",
    },
    {
        id: "7712310",
        name: "Grain Free Dry Dog Food | Rachael Ray® Nutrish®",
        price: "1452.50",
        quantity: "1,638",
        image: "https://i.imgur.com/IvxMPFr.jpeg",
    },
    {
        id: "7712311",
        name: "Weruva Pumpkin Patch Up! Pumpkin With Ginger...",
        price: "1452.50",
        quantity: "1,638",
        image: "https://i.imgur.com/7eW9nXP.jpeg",
    },
    {
        id: "7712312",
        name: "Premium Dog Treats - Organic Chicken Flavor",
        price: "1200.00",
        quantity: "800",
        image: "https://i.imgur.com/R2PN9Wq.jpeg",
    },
    {
        id: "7712309",
        name: "Dog Food, Chicken & Chicken Liver Recipe",
        price: "1452.50",
        quantity: "1,638",
        image: "https://i.imgur.com/R2PN9Wq.jpeg",
    },
    {
        id: "7712310",
        name: "Grain Free Dry Dog Food | Rachael Ray® Nutrish®",
        price: "1452.50",
        quantity: "1,638",
        image: "https://i.imgur.com/IvxMPFr.jpeg",
    },
    {
        id: "7712311",
        name: "Weruva Pumpkin Patch Up! Pumpkin With Ginger...",
        price: "1452.50",
        quantity: "1,638",
        image: "https://i.imgur.com/7eW9nXP.jpeg",
    },
    {
        id: "7712312",
        name: "Premium Dog Treats - Organic Chicken Flavor",
        price: "1200.00",
        quantity: "800",
        image: "https://i.imgur.com/R2PN9Wq.jpeg",
    },
    {
        id: "7712309",
        name: "Dog Food, Chicken & Chicken Liver Recipe",
        price: "1452.50",
        quantity: "1,638",
        image: "https://i.imgur.com/R2PN9Wq.jpeg",
    },
    {
        id: "7712310",
        name: "Grain Free Dry Dog Food | Rachael Ray® Nutrish®",
        price: "1452.50",
        quantity: "1,638",
        image: "https://i.imgur.com/IvxMPFr.jpeg",
    },
    {
        id: "7712311",
        name: "Weruva Pumpkin Patch Up! Pumpkin With Ginger...",
        price: "1452.50",
        quantity: "1,638",
        image: "https://i.imgur.com/7eW9nXP.jpeg",
    },
    {
        id: "7712312",
        name: "Premium Dog Treats - Organic Chicken Flavor",
        price: "1200.00",
        quantity: "800",
        image: "https://i.imgur.com/R2PN9Wq.jpeg",
    },
];

export const ProductList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [addProduct, setAddProduct] = useState(false);
    const itemsPerPage = 5;

    // Filter products based on search query
    const filteredProducts = dummyProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            {/* Toggle between Product List and AddProduct Form */}
            {addProduct ? (
                <AddProduct onClose={() => setAddProduct(false)} />
            ) : (
                <>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-semibold">Product List</h1>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="border w-70 px-4 py-2 rounded-lg pl-10"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FiSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                        <button
                            onClick={() => setAddProduct(true)}
                            className="text-blue-500 border border-indigo-500 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-500 hover:text-white transition-colors"
                        >
                            <FiPlus /> <span>Add New</span>
                        </button>
                    </div>

                    {/* Table */}
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3">Product</th>
                                <th className="p-3">Product ID</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Total Sales</th>
                            </tr>
                        </thead>
                        <tbody className="mt-5">
                            {currentProducts.map((product, index) => (
                                <tr key={index} className="border-b cursor-pointer hover:bg-gray-100">
                                    <td className="p-3 flex items-center space-x-3">
                                        <img src={product.image} alt={product.name} className="h-12 w-12 object-cover" />
                                        <span>{product.name}</span>
                                    </td>
                                    <td className="p-3">#{product.id}</td>
                                    <td className="p-3">${parseFloat(product.price).toLocaleString()}</td>
                                    <td className="p-3">{product.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="px-4 py-2 border rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="px-4 py-2 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
