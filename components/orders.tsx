"use client";

import React, { useState, useEffect, useMemo } from "react";
import { FaCheck, FaTimes, FaSearch, FaPlus, FaHistory } from "react-icons/fa";
import TransactionHistory from "./transaction-history";
import AddOrderManagement from "./add-orders";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FiEdit } from "react-icons/fi";


const OrderDashboard = ({ transactions, categoriesData, itemsData, username }: any) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMoreOpen, setIsAddMoreOpen] = useState(false);
  const [editingTip, setEditingTip] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [tipInput, setTipInput] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

  const [viewHistoryOrderId, setViewHistoryOrderId] = useState<number | null>(
    null
  );

  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const supabase = createClientComponentClient();

  useEffect(() => {
    const subscription = supabase
      .channel("realtime:transactions")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Transactions",
        },
        (payload: any) => {

          if (payload.eventType === "INSERT") {
            setOrders((prev) => [...prev, payload.new]);
          }

          if (payload.eventType === "UPDATE") {
            const parsedOrders = (() => {
              let itemsArray = [];
              let tip = 0;
              try {
                const parsedItems = JSON.parse(payload.new.items); // If `items` is JSON
                itemsArray = Array.isArray(parsedItems.orderItems) ? parsedItems.orderItems : [];
                if(parsedItems.tip) {
                  tip = parsedItems.tip;
                }
              } catch (error) {
                console.warn(`Invalid items format for order ID ${payload.new.id}:`, error);
              }

          
              return {
                ...payload.new,
                items: itemsArray,
                tip: tip,
              };
            })();
            setOrders((prev) =>
              prev.map((order) =>
                order.id === payload.new.id ? parsedOrders : order
              )
            );
          }

          if (payload.eventType === "DELETE") {
            setOrders((prev) =>
              prev.filter((order) => order.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [supabase]);
  

  useEffect(() => {
    if (selectedOrder) {
      const updatedOrder = orders.find((order) => order.id === selectedOrder.id);
      if (updatedOrder) {
        setSelectedOrder(updatedOrder);
      }
    }
  }, [orders, selectedOrder]);
  

    useEffect(() => {
      const parsedOrders = transactions.map((order: any) => {
        let itemsArray = [];
        let tip = 0;
        try {
          const parsedItems = JSON.parse(order.items); // If `items` is JSON
          itemsArray = Array.isArray(parsedItems.orderItems) ? parsedItems.orderItems : [];
          if(parsedItems.tip) {
            tip = parsedItems.tip;
          }
        } catch (error) {
          console.warn(`Invalid items format for order ID ${order.id}:`, error);
        }
    
        return {
          ...order,
          items: itemsArray,
          tip: tip,
        };
      });
      setOrders(parsedOrders);
    }, [transactions]);
    

  // Filter orders based on search and status
  const filteredOrders = useMemo(
    () =>
      orders.filter(
        (order) =>
          (order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.employee_username.toLowerCase().includes(searchQuery.toLowerCase())) &&
          (statusFilter === "all" || order.status === statusFilter)
      ),
    [orders, searchQuery, statusFilter]
  );

  interface OrderItem {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
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
    tip: number;
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
  const handleAddOrderClick = (order: Order) => {
    setCurrentOrder(order);
    setIsAddMoreOpen(true);
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };

  const handleEditTransaction = async (order: Order) => {
    try {
      const response = await fetch("/api/transaction/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: order.id,
          customer_name: order.customer_name,
          employee_username: order.employee_username,
          items: {orderItems: order.items, tip: order.tip},
          total_price: order.total_price,
          payment_method: order.payment_method,
          status: order.status,
          notes: order.notes,
        }),
      });
  
      const data = await response;
      if (response.ok) {
        setLoading(false);
        return data;
      } else {
        const errorData = await response.json();
        console.error(`Error: ${errorData}`);
      }
    } catch (error) {
      console.error("Error updating Transaction:", error);
    }
  };

  const handleMarkAsPaid = (orderId: number): void => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "paid" } : order
      );
      const updatedOrder = updatedOrders.find((order) => order.id === orderId);
  
      // Update selectedOrder if it's the current one
      if (selectedOrder?.id === orderId && updatedOrder) {
        setSelectedOrder(updatedOrder);
      }
  
      if (selectedOrder) {
        handleEditTransaction({ ...selectedOrder, status: "paid" });
      }
      return updatedOrders;
    });
  };
  

  const handleViewHistoryClick = (orderId: number) => {
    setViewHistoryOrderId(orderId);
  };

  const handleUpdateTip = () => {
    if (selectedOrder && tipInput !== null) {
      setLoading(true);
      const updatedOrder = { ...selectedOrder, tip: tipInput };
      setSelectedOrder(updatedOrder);
      handleEditTransaction(updatedOrder);
      setEditingTip(false);
    }
  };
  
  // const OrderDetailModal = ({ order, onClose }: OrderDetailModalProps) => {
  //   return (
      
  //   );
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-transparent p-6 rounded-lg">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
            <h2 className="text-2xl font-bold text-white">Please wait...</h2>
          </div>
        </div>
      )}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by customer name, employee name or order number..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
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
                    P{order.total_price.toFixed(2)}
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
        // <OrderDetailModal
        //   order={selectedOrder}
        //   onClose={() => setIsModalOpen(false)}
        // />
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Order Details #{selectedOrder.id}</h2>
            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <p>
                <span className="font-semibold">Customer:</span> {selectedOrder.customer_name}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {formatDateTime(selectedOrder.transaction_date_time)}
              </p>
              <p>
                <span className="font-semibold">Employee:</span>{" "}
                {selectedOrder.employee_username}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`${
                    selectedOrder.status === "paid"
                      ? "text-green-600"
                      : "text-red-600"
                  } capitalize`}
                >
                  {selectedOrder.status}
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
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2 text-right">
                          P{item.price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-right">
                <span className="font-semibold">Subtotal:</span> P
                {selectedOrder.total_price.toFixed(2)}
              </p>
              <div className="flex items-end justify-end w-full px-0 py-4">
                <div className="flex items-end gap-2">
                  <p className="font-semibold">Tip:</p>
                  {editingTip ? (
                    <input
                      type="number"
                      className="w-20 px-2 py-0 border rounded bg-transparent text-right"
                      value={tipInput ?? ""}
                      onChange={(e) => setTipInput(parseFloat(e.target.value) || 0)}
                    />
                  ) : (
                    <span className="text-right">P {selectedOrder.tip.toFixed(2)}</span>
                  )}
                </div>

                {selectedOrder.status.toLowerCase() === "unpaid" && (
                  <div className="flex items-center gap-4 pl-4">
                    {editingTip ? (
                      <>
                        <button
                          onClick={handleUpdateTip}
                          className="text-green-600 hover:text-green-900"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTip(false)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingTip(true);
                          setTipInput(selectedOrder?.tip || 0); // Initialize with current tip value
                        }}
                        className="text-blue-600 hover:text-blue-900 mt-[-8px]"
                      >
                        <FiEdit className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <p className="text-right text-xl font-bold">
                Total: P{(selectedOrder.total_price + selectedOrder.tip).toFixed(2)}
              </p>
            </div>

            <div className="mt-6 flex justify-between">
              <button onClick={() => handleViewHistoryClick(selectedOrder.id)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <FaHistory /> View History
              </button>
              {selectedOrder.status === "unpaid" && (
                <>
                  <button
                    onClick={() => handleMarkAsPaid(selectedOrder.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <FaCheck /> Mark as Paid
                  </button>
                  <button onClick={() => handleAddOrderClick(selectedOrder)} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    <FaPlus /> Add More Items
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      )}

      {viewHistoryOrderId && (
        <TransactionHistory orderId={viewHistoryOrderId} setViewHistoryOrderId={setViewHistoryOrderId}/>
      )}
      {isAddMoreOpen && (
        <AddOrderManagement categoriesData={categoriesData} itemsData={itemsData} username={username} setIsAddMoreOpen={setIsAddMoreOpen} currentOrder={currentOrder}/>
      )}
    </div>
  );
};

export default OrderDashboard;
