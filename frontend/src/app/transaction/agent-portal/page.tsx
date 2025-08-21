"use client";
import AddCustomerModal from "@/components/Modals/addCustomer/page";
import AddCustomers from "@/components/Modals/addCustomer/page";
import Link from "next/link";
import { useState } from "react";

export default function AgentModule() {
    const [activeTab, setActiveTab] = useState("myCustomers");
    const [showModal, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleAddCustomer = (data: any) => {
        console.log("Customer Data:", data);
    };

    const customers = [
        {
            code: "ZMC1026",
            title: "Mr.",
            name: "REGAN MFUNDA",
            country: "Zambia",
            stock: 4,
            shipOk: 4,
            relOk: 0,
            registered: "2/23/2024",
            updated: "2/23/2024",
            assignedTo: "Syed Muhammad Za...",
        },
        {
            code: "TZC1001",
            title: "Mr.",
            name: "Alwiy Albeity",
            country: "Tanzania",
            stock: 4,
            shipOk: 3,
            relOk: 0,
            registered: "1/4/2024",
            updated: "",
            assignedTo: "Azim Aziz",
        },
    ];

    return (
        <>
       <h1 className="text-3xl font-bold text-center mb-8 text-white">Agent Portal</h1>
        <div className="p-4 bg-white shadow-lg rounded-lg max-w-full mx-auto">
            {/* Top Section */}
            <div className="grid grid-cols-12 gap-4 mb-4">
                {/* Free Customers */}
                <div className="col-span-5 border rounded">
                    <div className="bg-gray-200 px-3 py-2 font-semibold">Free Customers</div>
                    <div className="p-2 border-b">
                        <input
                            type="text"
                            placeholder="Enter text to search ..."
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-1">Customer Code</th>
                                <th className="border px-2 py-1">Title</th>
                                <th className="border px-2 py-1">Country Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* No data placeholder */}
                            <tr>
                                <td colSpan={3} className="text-center p-2 text-gray-500">
                                    No data
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Add Customer + Stats */}
                <div className="col-span-4 border rounded p-2 flex flex-col gap-3 justify-between">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => setShowModal(true)}
                    >
                        Add Customer
                    </button>


                    <div>
                        <label className="block mb-1 text-sm">Check Existing Customer:</label>
                        <input
                            type="text"
                            placeholder="Phone / Email"
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded">
                            My Customers <span className="font-bold">(1523)</span>
                        </div>
                        <div className="bg-red-100 text-red-700 px-3 py-1 rounded">
                            My Team Customers <span className="font-bold">(0)</span>
                        </div>
                    </div>
                </div>

                {/* Messages Updates */}
                <div className="col-span-3 border rounded">
                    <div className="bg-gray-200 px-3 py-2 font-semibold flex justify-between items-center">
                        <span>Messages Updates</span>
                        <button className="text-blue-500">⟳</button>
                    </div>
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-1">Information</th>
                                <th className="border px-2 py-1">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* No data placeholder */}
                            <tr>
                                <td colSpan={2} className="text-center p-2 text-gray-500">
                                    No messages
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-2">
                <button
                    onClick={() => setActiveTab("myCustomers")}
                    className={`px-4 py-2 ${activeTab === "myCustomers" ? "bg-gray-200 font-semibold" : "bg-white"
                        } border-t border-l border-r`}
                >
                    My Customers
                </button>
                <button
                    onClick={() => setActiveTab("teamCustomers")}
                    className={`px-4 py-2 ${activeTab === "teamCustomers" ? "bg-gray-200 font-semibold" : "bg-white"
                        } border-t border-r`}
                >
                    My Team Customers
                </button>
            </div>

            {/* Main Table */}
            <div className="overflow-x-auto border rounded">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-2 py-1">Detail</th>
                            <th className="border px-2 py-1">Customer Code</th>
                            <th className="border px-2 py-1">Title</th>
                            <th className="border px-2 py-1">Name</th>
                            <th className="border px-2 py-1">Country Name</th>
                            <th className="border px-2 py-1">Stock Qty</th>
                            <th className="border px-2 py-1">Ship.OK</th>
                            <th className="border px-2 py-1">Rel.OK</th>
                            <th className="border px-2 py-1">Registered On</th>
                            <th className="border px-2 py-1">Last Update</th>
                            <th className="border px-2 py-1">AssignedTo</th>
                            <th className="border px-2 py-1">Comments</th>
                            <th className="border px-2 py-1">Free</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((c, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                                <td className="border px-2 py-1 text-blue-500 cursor-pointer">
                                    {c.code} Info
                                </td>
                                <td className="border px-2 py-1">{c.code}</td>
                                <td className="border px-2 py-1">{c.title}</td>
                                <td className="border px-2 py-1">{c.name}</td>
                                <td className="border px-2 py-1">{c.country}</td>
                                <td className="border px-2 py-1 text-center">{c.stock}</td>
                                <td className="border px-2 py-1 text-center">{c.shipOk}</td>
                                <td className="border px-2 py-1 text-center">{c.relOk}</td>
                                <td className="border px-2 py-1">{c.registered}</td>
                                <td className="border px-2 py-1">{c.updated}</td>
                                <td className="border px-2 py-1">{c.assignedTo}</td>
                                <td className="border px-2 py-1">
                                    <button className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded">
                                        Comments
                                    </button>
                                </td>
                                <td className="border px-2 py-1 text-center cursor-pointer text-red-500">
                                    X
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full sm:w-[90%] md:max-w-4xl p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
                        {/* Close button */}
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                            onClick={() => setShowModal(false)}
                        >
                            ✖
                        </button>

                        {/* AddCustomers component inside modal */}
                        <AddCustomerModal
                            onSubmit={handleAddCustomer}
                        />
                    </div>
                </div>
            )}
        </div>
         </>
    );
}
