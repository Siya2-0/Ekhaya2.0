"use client";

import React, { useState } from "react";
import { FaCheck, FaTimes, FaSearch, FaPlus, FaHistory } from "react-icons/fa";

const OrderDashboard = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      employeeName: "John Smith",
      date: "2024-01-20",
      orderNo: "ORD001",
      customerName: "Alice Johnson",
      price: 150.00,
      status: "paid",
      items: [
        { name: "Mojito", price: 45.00, quantity: 2 },
        { name: "Nachos", price: 60.00, quantity: 1 }
      ],
      tip: 15.00
    },
    {
      id: 2,
      employeeName: "Sarah Davis",
      date: "2024-01-20",
      orderNo: "ORD002",
      customerName: "Bob Wilson",
      price: 85.00,
      status: "unpaid",
      items: [
        { name: "Beer", price: 35.00, quantity: 1 },
        { name: "Wings", price: 50.00, quantity: 1 }
      ],
      tip: 0
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Added new state for status filter
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter(order =>
    (order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    // Added employee name search
    order.employeeName.toLowerCase().includes(searchQuery.toLowerCase())) &&
    // Added status filtering
    (statusFilter === "all" || order.status === statusFilter)
  );

  interface OrderItem {
    name: string;
    price: number;
    quantity: number;
  }

  interface Order {
    id: number;
    employeeName: string;
    date: string;
    orderNo: string;
    customerName: string;
    price: number;
    status: string;
    items: OrderItem[];
    tip: number;
  }

  interface OrderDetailModalProps {
    order: Order;
    onClose: () => void;
  }

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleMarkAsPaid = (orderId: number): void => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: "paid" } : order
    ));
  };

  const OrderDetailModal = ({ order, onClose }: OrderDetailModalProps) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Order Details #{order.orderNo}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <p><span className="font-semibold">Customer:</span> {order.customerName}</p>
              <p><span className="font-semibold">Date:</span> {order.date}</p>
              <p><span className="font-semibold">Employee:</span> {order.employeeName}</p>
              <p><span className="font-semibold">Status:</span> 
                <span className={`${order.status === "paid" ? "text-green-600" : "text-red-600"} capitalize`}>
                  {order.status}
                </span>
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Ordered Items</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Item</th>
                      <th className="px-4 py-2 text-left">Quantity</th>
                      <th className="px-4 py-2 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2 text-right">${item.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-right"><span className="font-semibold">Subtotal:</span> ${order.price.toFixed(2)}</p>
              <p className="text-right"><span className="font-semibold">Tip:</span> ${order.tip.toFixed(2)}</p>
              <p className="text-right text-xl font-bold">Total: ${(order.price + order.tip).toFixed(2)}</p>
            </div>

            <div className="mt-6 flex justify-between">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <FaHistory /> View History
              </button>
              {order.status === "unpaid" && (
                <>
                  <button 
                    onClick={() => handleMarkAsPaid(order.id)} 
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <FaCheck /> Mark as Paid
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    <FaPlus /> Add More Items
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold mb-8">Orders</h1> */}

      <div className="mb-6 space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by customer name, employee name or order number..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{order.employeeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.orderNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${order.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === "paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {order.status === "paid" ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrderDashboard;