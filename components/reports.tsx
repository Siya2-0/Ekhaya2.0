"use client";

import React, { useState } from "react";
import { FaUsers, FaShoppingCart, FaBoxes, FaDollarSign } from "react-icons/fa";
import { format } from "date-fns";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ReportsManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateFilter, setDateFilter] = useState("today");

  const kpiData = {
    totalSales: 15789.50,
    totalCustomers: 342,
    itemsSold: 867,
    avgTransaction: 46.17
  };

  const salesData = [
    { date: "2024-01-15", totalSales: 2456.78, transactions: 52, avgSale: 47.24 },
    { date: "2024-01-14", totalSales: 3123.45, transactions: 67, avgSale: 46.62 },
    { date: "2024-01-13", totalSales: 2789.90, transactions: 58, avgSale: 48.10 }
  ];

  const inventoryData = [
    { name: "Premium Vodka", quantity: 15, sold: 45, reorderLevel: 20 },
    { name: "Craft Beer", quantity: 8, sold: 92, reorderLevel: 24 },
    { name: "Red Wine", quantity: 25, sold: 38, reorderLevel: 18 }
  ];

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales Trend",
        data: [1500, 2300, 1800, 2700, 3200, 4500, 3800],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
      }
    ]
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Sales</p>
            <p className="text-2xl font-bold">R{kpiData.totalSales.toFixed(2)}</p>
          </div>
          <FaDollarSign className="text-3xl text-green-500" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Customers</p>
            <p className="text-2xl font-bold">{kpiData.totalCustomers}</p>
          </div>
          <FaUsers className="text-3xl text-blue-500" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Items Sold</p>
            <p className="text-2xl font-bold">{kpiData.itemsSold}</p>
          </div>
          <FaShoppingCart className="text-3xl text-purple-500" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Avg Transaction</p>
            <p className="text-2xl font-bold">R{kpiData.avgTransaction.toFixed(2)}</p>
          </div>
          <FaBoxes className="text-3xl text-orange-500" />
        </div>
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Weekly Sales Trend</h3>
          <Line data={chartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );

  const renderSales = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between mb-6">
        <h3 className="text-lg font-semibold">Sales Report</h3>
        <div className="space-x-2">
          <button
            onClick={() => setDateFilter("today")}
            className={`px-4 py-2 rounded ${dateFilter === "today" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Today
          </button>
          <button
            onClick={() => setDateFilter("week")}
            className={`px-4 py-2 rounded ${dateFilter === "week" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            This Week
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Sale</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salesData.map((sale, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{format(new Date(sale.date), "MMM dd, yyyy")}</td>
                <td className="px-6 py-4 whitespace-nowrap">R{sale.totalSales.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sale.transactions}</td>
                <td className="px-6 py-4 whitespace-nowrap">R{sale.avgSale.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-6">Inventory Status</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sold</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventoryData.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.sold}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.quantity < item.reorderLevel ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                  >
                    {item.quantity < item.reorderLevel ? "Low Stock" : "In Stock"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-3xl font-bold text-gray-900 mb-8">Bar Lounge Reports</h1> */}
        
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "overview" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500"}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("sales")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "sales" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500"}`}
              >
                Sales Reports
              </button>
              <button
                onClick={() => setActiveTab("inventory")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "inventory" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500"}`}
              >
                Inventory Reports
              </button>
            </nav>
          </div>
        </div>

        <div className="mt-6">
          {activeTab === "overview" && renderOverview()}
          {activeTab === "sales" && renderSales()}
          {activeTab === "inventory" && renderInventory()}
        </div>
      </div>
    </div>
  );
};

export default ReportsManagement;