import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const dummyOrders = [
    { id: "ORD001", customer: "John Doe", date: "2025-03-25", total: "$120.00", status: "Pending" },
    { id: "ORD002", customer: "Alice Smith", date: "2025-03-24", total: "$85.50", status: "Shipped" },
    { id: "ORD003", customer: "David Johnson", date: "2025-03-23", total: "$150.75", status: "Delivered" },
    { id: "ORD004", customer: "Emma Brown", date: "2025-03-22", total: "$95.30", status: "Pending" },
    { id: "ORD005", customer: "Liam Miller", date: "2025-03-21", total: "$210.00", status: "Shipped" },
    { id: "ORD006", customer: "Sophia Wilson", date: "2025-03-20", total: "$180.20", status: "Delivered" },
    { id: "ORD001", customer: "John Doe", date: "2025-03-25", total: "$120.00", status: "Pending" },
    { id: "ORD002", customer: "Alice Smith", date: "2025-03-24", total: "$85.50", status: "Shipped" },
    { id: "ORD003", customer: "David Johnson", date: "2025-03-23", total: "$150.75", status: "Delivered" },
    { id: "ORD004", customer: "Emma Brown", date: "2025-03-22", total: "$95.30", status: "Pending" },
    { id: "ORD005", customer: "Liam Miller", date: "2025-03-21", total: "$210.00", status: "Shipped" },
    { id: "ORD006", customer: "Sophia Wilson", date: "2025-03-20", total: "$180.20", status: "Delivered" },
    { id: "ORD001", customer: "John Doe", date: "2025-03-25", total: "$120.00", status: "Pending" },
    { id: "ORD002", customer: "Alice Smith", date: "2025-03-24", total: "$85.50", status: "Shipped" },
    { id: "ORD003", customer: "David Johnson", date: "2025-03-23", total: "$150.75", status: "Delivered" },
    { id: "ORD004", customer: "Emma Brown", date: "2025-03-22", total: "$95.30", status: "Pending" },
    { id: "ORD005", customer: "Liam Miller", date: "2025-03-21", total: "$210.00", status: "Shipped" },
    { id: "ORD006", customer: "Sophia Wilson", date: "2025-03-20", total: "$180.20", status: "Delivered" },
];

export const OrderList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Filter orders based on search query
    const filteredOrders = dummyOrders.filter((order) =>
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Orders</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="border px-4 py-2 rounded-lg pl-10"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            {/* Table */}
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Total</th>
                        <th className="p-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map((order, index) => (
                        <tr key={index} className="border-b cursor-pointer hover:bg-gray-100">
                            <td className="p-3">#{order.id}</td>
                            <td className="p-3">{order.customer}</td>
                            <td className="p-3">{order.date}</td>
                            <td className="p-3">{order.total}</td>
                            <td className="p-3">
                                <span className={`px-3 py-1 rounded-full text-white 
                                    ${order.status === "Pending" ? "bg-yellow-500" :
                                        order.status === "Shipped" ? "bg-blue-500" :
                                            "bg-green-500"}`}>
                                    {order.status}
                                </span>
                            </td>
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
        </div>
    );
};
