"use client";

import React, { useState } from "react";
import { FaCreditCard, FaMoneyBillWave, FaPrint, FaPlus, FaMinus } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import OrderSuccessModal from "./order-success-modal";

interface OrderItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

const OrderSummary = ({ pay, setShowPaymentModal, setCurrentOrders, setShowOrderSummary, newOrder, username }: any) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>(newOrder.items);
  const [loading, setLoading] = useState(false);

  const [tip, setTip] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cashTendered, setCashTendered] = useState(0);
  const [selectedTip, setSelectedTip] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [user, setUser] = useState<any>(username);

  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tip;

  const handleQuantityChange = (id: number, increment: number) => {
    setOrderItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + increment) }
          : item
      )
    );
  };

  const handleTipSelection = (percentage: number) => {
    setTip(subtotal * (percentage / 100));
    setSelectedTip(percentage);
  };

  const handleUpdateInventory = async (id: any) => {
    // setLoading(true);
    try {
      const response = await fetch("/api/item/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id
        }),
      });

      const data = await response.json();
      if (response.ok) {
        handlePrint();
      } else {
        console.log(`Error: ${data.error.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
      } else {
        console.log(`Error: ${String(error)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/transaction/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: customerName,
          employee_username: user,
          items: JSON.stringify({ orderItems, tip }),
          total_price: total.toFixed(2),
          payment_method: paymentMethod,
          status: pay ? 'paid':'unpaid',
          notes: cashTendered === 0 ? "No notes" : cashTendered
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Transaction added successfully!");
        console.log("Transaction data: ",data);
        const transactionId = data.transaction[0]?.id;

        console.log(transactionId); // Output: 71
        handleUpdateInventory(data.transaction[0]?.id);
        
      } else {
        console.log(`Error: ${data.error.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
      } else {
        console.log(`Error: ${String(error)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    console.log("Printing receipt...");
    setShowSuccessModal(true);
    setCurrentOrders([]);
    setShowPaymentModal(false);
    setShowOrderSummary(false);
  };

  const handleEmailReceipt = () => {
    console.log("Emailing receipt...");
    setShowPaymentModal(false);
    setShowOrderSummary(false);
  };

  return (
    <div className="min-h-screen bg-transparent p-6">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-transparent p-6 rounded-lg">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
            <h2 className="text-2xl font-bold text-white">Please wait...</h2>
          </div>
        </div>
      )}
      {!showSuccessModal && (
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Item</th>
                    <th className="p-3 text-center">Quantity</th>
                    <th className="p-3 text-right">Unit Price</th>
                    <th className="p-3 text-right">Total</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3 text-center">{item.quantity}</td>
                      <td className="p-3 text-right">R{item.price.toFixed(2)}</td>
                      <td className="p-3 text-right">R{(item.price * item.quantity).toFixed(2)}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                        >
                          <FaPlus />
                        </button>
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="p-1 text-red-600 hover:text-red-800 ml-2"
                        >
                          <FaMinus />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {pay && (
                  <div className="">
                    <h3 className="text-xl font-semibold">Payment Methods</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setPaymentMethod("Cash")}
                        className={`p-4 rounded-lg flex items-center justify-center gap-2 ${paymentMethod === "Cash" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                      >
                        <FaMoneyBillWave /> Cash
                      </button>
                      <button
                        onClick={() => setPaymentMethod("Credit Card")}
                        className={`p-4 rounded-lg flex items-center justify-center gap-2 ${paymentMethod === "Credit Card" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                      >
                        <FaCreditCard /> Card
                      </button>
                    </div>

                    {paymentMethod === "Cash" && (
                      <div className="space-y-2">
                        <label className="block">Cash Tendered</label>
                        <input
                          type="number"
                          value={cashTendered}
                          onChange={(e) => setCashTendered(parseFloat(e.target.value) || 0)}
                          className="w-full p-2 border rounded"
                        />
                        <div className="text-lg font-semibold">
                          Change Due: R{Math.max(0, cashTendered - total).toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-8 mb-2 capitalize">
                    Customer Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    className="pl-10 w-full p-2 border rounded-lg bg-transparent"
                    placeholder="Customer Name"
                    onChange={(e) =>
                      setCustomerName(e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Order Total</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tip:</span>
                    <span>R{tip.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t">
                    <span>Total:</span>
                    <span>R{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Suggested Tips</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 10, 15, 20].map((percentage) => (
                      <button
                        key={percentage}
                        onClick={() => handleTipSelection(percentage)}
                        className={`p-2 rounded hover:opacity-90 ${
                          selectedTip === percentage ? "bg-blue-600 text-white" : "bg-gray-100"
                        }`}
                      >
                        {percentage}% (R{(subtotal * (percentage / 100)).toFixed(2)})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleAddTransaction}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <FaPrint /> Print Receipt
              </button>
              <button
                onClick={handleEmailReceipt}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                <MdCancel /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showSuccessModal && (
        <OrderSuccessModal />
      )}
    </div>
  );
};

export default OrderSummary;