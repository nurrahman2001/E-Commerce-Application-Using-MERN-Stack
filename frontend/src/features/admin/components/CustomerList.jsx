import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const dummyCustomers = [
    { id: "CUST001", name: "John Doe", email: "john@example.com", phone: "123-456-7890", totalOrders: 5 },
    { id: "CUST002", name: "Alice Smith", email: "alice@example.com", phone: "987-654-3210", totalOrders: 8 },
    { id: "CUST003", name: "David Johnson", email: "david@example.com", phone: "555-666-7777", totalOrders: 3 },
    { id: "CUST004", name: "Emma Brown", email: "emma@example.com", phone: "444-555-6666", totalOrders: 6 },
    { id: "CUST005", name: "Liam Miller", email: "liam@example.com", phone: "777-888-9999", totalOrders: 2 },
    { id: "CUST006", name: "Sophia Wilson", email: "sophia@example.com", phone: "222-333-4444", totalOrders: 7 },
    { id: "CUST001", name: "John Doe", email: "john@example.com", phone: "123-456-7890", totalOrders: 5 },
    { id: "CUST002", name: "Alice Smith", email: "alice@example.com", phone: "987-654-3210", totalOrders: 8 },
    { id: "CUST003", name: "David Johnson", email: "david@example.com", phone: "555-666-7777", totalOrders: 3 },
    { id: "CUST004", name: "Emma Brown", email: "emma@example.com", phone: "444-555-6666", totalOrders: 6 },
    { id: "CUST005", name: "Liam Miller", email: "liam@example.com", phone: "777-888-9999", totalOrders: 2 },
    { id: "CUST006", name: "Sophia Wilson", email: "sophia@example.com", phone: "222-333-4444", totalOrders: 7 },
];

export const CustomerList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter customers based on search query
    const filteredCustomers = dummyCustomers.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Customers</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search customers..."
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
                        <th className="p-3">Customer ID</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Total Orders</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCustomers.map((customer, index) => (
                        <tr key={index} className="border-b cursor-pointer hover:bg-gray-100">
                            <td className="p-3">#{customer.id}</td>
                            <td className="p-3">{customer.name}</td>
                            <td className="p-3">{customer.email}</td>
                            <td className="p-3">{customer.phone}</td>
                            <td className="p-3">{customer.totalOrders}</td>
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
