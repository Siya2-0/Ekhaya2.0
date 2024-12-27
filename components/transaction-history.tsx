import React, { useState, useEffect } from "react";
import { FaCalendar, FaCreditCard, FaEye, FaTimes, FaUser } from "react-icons/fa";

const TransactionHistory = ({ orderId, setViewHistoryOrderId }: any) => {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderHistoryData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/transaction/fetchHistory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: orderId }),
        });

        if (response.ok) {
          const data = await response.json();
          setHistoryData(data.items);
          console.log("History fetched successfully!", data.items);
        } else {
          const errorData = await response.json();
          setError(`Error: ${errorData.message || "Failed to fetch history"}`);
          console.error("Error fetching history:", errorData);
        }
      } catch (error) {
        setError("An unexpected error occurred.");
        console.error("Error fetching history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrderHistoryData();
    }
  }, [orderId]);

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };

  const OrderCard = ({ order }: { order: any }) => {
    let orderItems = [];
    let totalPrice = 0;

    try {
      // Parse `transaction_data` and extract `orderItems`
      const transactionData = JSON.parse(order.transaction_data);
      const items = JSON.parse(transactionData.items);
      orderItems = items.orderItems || [];
      totalPrice = transactionData.total_price || 0;
    } catch (error) {
      console.error("Error parsing transaction_data:", error);
    }

    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Order #{order.transaction_id}</h3>
          <button className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
            <FaEye className="text-lg" />
            <span>View Details</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FaCalendar className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-medium">{formatDateTime(order.changed_at)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaUser className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Employee</p>
              <p className="font-medium">{order.employee_username}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaCreditCard className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium">{JSON.parse(order.transaction_data).payment_method || "N/A"}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-xl font-bold text-blue-600">
              R{totalPrice ? totalPrice.toFixed(2) : "N/A"}
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Order Items</h4>
          <div className="space-y-2">
            {orderItems.length > 0 ? (
              orderItems.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">R{item.price.toFixed(2)}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No items found in this order.</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 pt-0 max-w-[70%] max-h-[80%] overflow-auto w-full mx-4">
        {isLoading ? (
          <p>Loading history...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : historyData.length > 0 ? (
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-8">Order History</h1>
              <button onClick={() => setViewHistoryOrderId(null)} className="text-gray-500 hover:text-gray-700">
                <FaTimes size={24} />
              </button>
            </div>
            <div className="space-y-6">
              {historyData.map((order: any) => (
                <OrderCard key={order.transaction_id} order={order} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
