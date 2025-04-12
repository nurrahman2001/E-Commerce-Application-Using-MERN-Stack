import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const dummyCoupons = [
    { id: "COUP001", code: "SAVE10", discount: "10%", expiry: "2025-12-31", status: "Active" },
    { id: "COUP002", code: "FREESHIP", discount: "Free Shipping", expiry: "2025-06-30", status: "Active" },
    { id: "COUP003", code: "WELCOME15", discount: "15%", expiry: "2025-09-15", status: "Expired" },
    { id: "COUP004", code: "SPRING20", discount: "20%", expiry: "2025-04-10", status: "Active" },
    { id: "COUP005", code: "SUMMER25", discount: "25%", expiry: "2025-07-20", status: "Active" },
    { id: "COUP006", code: "WINTER30", discount: "30%", expiry: "2024-12-01", status: "Expired" },
];

export const CouponList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter coupons based on search query
    const filteredCoupons = dummyCoupons.filter((coupon) =>
        coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCoupons = filteredCoupons.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Coupons</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search coupons..."
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
                        <th className="p-3">Coupon Code</th>
                        <th className="p-3">Discount</th>
                        <th className="p-3">Expiry Date</th>
                        <th className="p-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCoupons.map((coupon, index) => (
                        <tr key={index} className="border-b cursor-pointer hover:bg-gray-100">
                            <td className="p-3">#{coupon.code}</td>
                            <td className="p-3">{coupon.discount}</td>
                            <td className="p-3">{coupon.expiry}</td>
                            <td className={`p-3 ${coupon.status === "Active" ? "text-green-500" : "text-red-500"}`}>
                                {coupon.status}
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
