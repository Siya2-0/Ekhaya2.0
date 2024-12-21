"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const OrderDashboard = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      status: "paid",
      items: [
        { id: 1, drink: { name: "Mojito" }, size: { name: "Large" }, total: 20 },
        { id: 2, drink: { name: "Beer" }, size: { name: "Medium" }, total: 12 }
      ],
      total: 32
    },
    {
      id: 2,
      status: "unpaid",
      items: [
        { id: 3, drink: { name: "Margarita" }, size: { name: "Small" }, total: 11 },
        { id: 4, drink: { name: "Old Fashioned" }, size: { name: "Large" }, total: 24 }
      ],
      total: 35
    }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<{
    id: number;
    status: string;
    items: { id: number; drink: { name: string }; size: { name: string }; total: number }[];
    total: number;
  } | null>(null);

  const OrderDetailsModal = () => {
    if (!selectedOrder) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-2xl font-bold mb-4">Order Details</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold">Items:</h3>
              {selectedOrder.items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.drink.name} ({item.size.name})</span>
                  <span>R{item.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>R{selectedOrder.total.toFixed(2)}</span>
            </div>
            {selectedOrder.status === "unpaid" && (
              <button
                onClick={() => {
                  setOrders(orders.map(order =>
                    order.id === selectedOrder.id
                      ? { ...order, status: "paid" }
                      : order
                  ));
                  setShowOrderDetails(false);
                }}
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
              >
                Mark as Paid
              </button>
            )}
            <button
              onClick={() => setShowOrderDetails(false)}
              className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Orders</h2>
            <div className="flex gap-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-10 p-2 border rounded w-64"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="p-2 border rounded bg-white"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Orders</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {orders
              .filter(order =>
                (filterStatus === "all" || order.status === filterStatus) &&
                order.id.toString().includes(searchTerm)
              )
              .map(order => (
                <div
                  key={order.id}
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowOrderDetails(true);
                  }}
                  className={`p-4 rounded-lg cursor-pointer transform transition-all hover:scale-101 ${order.status === "paid" ? "bg-green-100" : "bg-yellow-100"}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold">Order #{order.id}</span>
                      <p className="text-sm text-gray-600 mt-1">
                        {order.items.length} items - Total: R{order.total.toFixed(2)}
                      </p>
                    </div>
                    <span className={`px-4 py-2 rounded-full ${order.status === "paid" ? "bg-green-500" : "bg-yellow-500"} text-white text-sm font-medium`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      {showOrderDetails && <OrderDetailsModal />}
    </div>
  );
};

export default OrderDashboard;