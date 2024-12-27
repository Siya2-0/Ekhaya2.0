"use client";

import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaSearch, FaPlus, FaHistory } from "react-icons/fa";
import TransactionHistory from "./transaction-history";
import AddOrders from "./add-orders";

const OrderDashboard = ({ transactions, categoriesData, itemsData, username }: any) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMoreOpen, setIsAddMoreOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewHistoryOrderId, setViewHistoryOrderId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const parsedOrders = transactions.map((order: any) => {
      let itemsArray = [];
      try {
        const parsedItems = JSON.parse(order.items);
        itemsArray = parsedItems?.orderItems || [];
      } catch (error) {
        console.warn(`Invalid items format for order ID ${order.id}:`, error);
      }

      return {
        ...order,
        items: itemsArray,
      };
    });
    setOrders(parsedOrders);
  }, [transactions]);

  const filteredOrders: Order[] = orders.filter(
    (order: Order) =>
      (order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.employee_username.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "all" || order.status === statusFilter)
  );

  interface OrderItem {
    name: string;
    price: number;
    quantity: number;
  }

  interface Order {
    id: number;
    employee_username: string;
    transaction_date_time: string;
    customer_name: string;
    total_price: number;
    status: string;
    items: OrderItem[];
    notes: string;
    payment_method: string;
  }

  interface OrderDetailModalProps {
    order: Order;
    onClose: () => void;
  }

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  const handleAddOrderClick = () => {
    // setSelectedOrder(order);
    setIsAddMoreOpen(true);
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };

  const handleMarkAsPaid = (orderId: number): void => {
    setOrders(
      orders.map((order: Order) =>
        order.id === orderId ? { ...order, status: "paid" } : order
      )
    );
  };

  const handleViewHistoryClick = (orderId: number) => {
    setViewHistoryOrderId(orderId);
  };

  const OrderDetailModal = ({ order, onClose }: OrderDetailModalProps) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Order Details #{order.id}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <p>
                <span className="font-semibold">Customer:</span> {order.customer_name}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {formatDateTime(order.transaction_date_time)}
              </p>
              <p>
                <span className="font-semibold">Employee:</span>{" "}
                {order.employee_username}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`${
                    order.status === "paid"
                      ? "text-green-600"
                      : "text-red-600"
                  } capitalize`}
                >
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
                        <td className="px-4 py-2 text-right">
                          R{item.price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-right">
                <span className="font-semibold">Subtotal:</span> R
                {order.total_price.toFixed(2)}
              </p>
              <p className="text-right">
                <span className="font-semibold">Tip:</span> R0.00
              </p>
              <p className="text-right text-xl font-bold">
                Total: R{(order.total_price + 0).toFixed(2)}
              </p>
            </div>

            <div className="mt-6 flex justify-between">
              <button onClick={() => handleViewHistoryClick(order.id)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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
                  <button onClick={() => handleAddOrderClick()} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.employee_username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDateTime(order.transaction_date_time)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    R{order.total_price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status === "paid" ? (
                        <FaCheck className="mr-1" />
                      ) : (
                        <FaTimes className="mr-1" />
                      )}
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
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

      {viewHistoryOrderId && (
        <TransactionHistory orderId={viewHistoryOrderId} setViewHistoryOrderId={setViewHistoryOrderId}/>
      )}
      {isAddMoreOpen && (
        <AddOrders categoriesData={categoriesData} itemsData={itemsData} username={username} setIsAddMoreOpen={setIsAddMoreOpen}/>
      )}
    </div>
  );
};

export default OrderDashboard;
