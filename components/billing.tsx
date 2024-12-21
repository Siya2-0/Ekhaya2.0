"use client";

import React, { useState } from "react";
import { FaCreditCard, FaMoneyBillWave, FaMobile, FaGift, FaPrint, FaEnvelope, FaPlus, FaMinus } from "react-icons/fa";

const Payments = () => {
  const [orderItems, setOrderItems] = useState([
    { id: 1, name: "Classic Martini", quantity: 2, price: 12.99 },
    { id: 2, name: "Craft Beer", quantity: 3, price: 8.99 },
    { id: 3, name: "Wine Bottle", quantity: 1, price: 45.99 }
  ]);

  const [tip, setTip] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cashTendered, setCashTendered] = useState(0);

  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax + tip - discount;

  const handleQuantityChange = (id: any, increment: any) => {
    setOrderItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + increment) }
          : item
      )
    );
  };

  const handleTipSelection = (percentage: any) => {
    setTip(subtotal * (percentage / 100));
  };

  const handlePrint = () => {
    console.log("Printing receipt...");
  };

  const handleEmailReceipt = () => {
    console.log("Emailing receipt...");
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] p-6">
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
              <h3 className="text-xl font-semibold">Payment Methods</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`p-4 rounded-lg flex items-center justify-center gap-2 ${paymentMethod === "cash" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                >
                  <FaMoneyBillWave /> Cash
                </button>
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-lg flex items-center justify-center gap-2 ${paymentMethod === "card" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                >
                  <FaCreditCard /> Card
                </button>
                <button
                  onClick={() => setPaymentMethod("mobile")}
                  className={`p-4 rounded-lg flex items-center justify-center gap-2 ${paymentMethod === "mobile" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                >
                  <FaMobile /> Mobile Pay
                </button>
                <button
                  onClick={() => setPaymentMethod("gift")}
                  className={`p-4 rounded-lg flex items-center justify-center gap-2 ${paymentMethod === "gift" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                >
                  <FaGift /> Gift Card
                </button>
              </div>

              {paymentMethod === "cash" && (
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

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Order Total</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%):</span>
                  <span>R{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tip:</span>
                  <span>R{tip.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span>R{discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t">
                  <span>Total:</span>
                  <span>R{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Suggested Tips</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 15, 20].map((percentage) => (
                    <button
                      key={percentage}
                      onClick={() => handleTipSelection(percentage)}
                      className="p-2 bg-gray-100 rounded hover:bg-gray-200"
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
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <FaPrint /> Print Receipt
            </button>
            <button
              onClick={handleEmailReceipt}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <FaEnvelope /> Email Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;