"use client";

import React, { useState } from "react";
import { FaShoppingCart, FaBoxes, FaUsers, FaChartLine, FaBell, FaCog, FaClipboardList, FaPlus } from "react-icons/fa";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const POSDashboard = () => {
  const [activeTab, setActiveTab] = useState("daily");

  const salesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [3000, 4500, 3200, 5000, 4800, 6000, 5500],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
      }
    ]
  };

  const categoryData = {
    labels: ["Food", "Drinks", "Desserts", "Others"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0"
        ]
      }
    ]
  };

  const alerts = [
    { id: 1, message: "Low stock: French Fries", type: "warning" },
    { id: 2, message: "Printer offline", type: "error" },
    { id: 3, message: "New order #123 received", type: "info" }
  ];

  const recentActivity = [
    { id: 1, action: "Order #456 completed", time: "2 mins ago" },
    { id: 2, action: "Stock updated: Burger Buns", time: "15 mins ago" },
    { id: 3, action: "Employee John checked in", time: "1 hour ago" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Daily Sales</p>
              <h3 className="text-2xl font-bold">$5,670</h3>
            </div>
            <FaShoppingCart className="text-blue-500 text-2xl" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold">127</h3>
            </div>
            <FaClipboardList className="text-green-500 text-2xl" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Low Stock Items</p>
              <h3 className="text-2xl font-bold">8</h3>
            </div>
            <FaBoxes className="text-yellow-500 text-2xl" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Active Employees</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
            <FaUsers className="text-purple-500 text-2xl" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Sales Trends</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("daily")}
                className={`px-3 py-1 rounded ${activeTab === "daily" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                Daily
              </button>
              <button
                onClick={() => setActiveTab("weekly")}
                className={`px-3 py-1 rounded ${activeTab === "weekly" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                Weekly
              </button>
            </div>
          </div>
          <Line data={salesData} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Category Breakdown</h2>
          <Pie data={categoryData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded ${alert.type === "warning" ? "bg-yellow-100 text-yellow-800" : 
                  alert.type === "error" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}
              >
                <div className="flex items-center">
                  <FaBell className="mr-2" />
                  <p>{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="border-b pb-2">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <FaPlus className="mr-2" />
              New Order
            </button>
            <button className="flex items-center justify-center p-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
              <FaBoxes className="mr-2" />
              Inventory
            </button>
            <button className="flex items-center justify-center p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              <FaChartLine className="mr-2" />
              Reports
            </button>
            <button className="flex items-center justify-center p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              <FaCog className="mr-2" />
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSDashboard;