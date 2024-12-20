"use client";

import React, { useState } from "react";
import { FaTimes, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";

const Orders = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showOrders, setShowOrders] = useState(false);
  interface OrderItem {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    quantity: number;
  }

  const [currentOrders, setCurrentOrders] = useState<OrderItem[]>([]);

  const categories = [
    "All",
    "Brandy",
    "Tequila",
    "Vodka",
    "Whisky",
    "Rum",
    "Gin",
    "Liqueurs"
  ];

  const liquorItems = [
    {
      id: 1,
      name: "Premium Whisky",
      category: "Whisky",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b"
    },
    {
      id: 2,
      name: "Silver Tequila",
      category: "Tequila",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b"
    },
    {
      id: 3,
      name: "Smooth Vodka",
      category: "Vodka",
      price: 32.99,
      image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b"
    }
  ];

  const filteredItems = activeCategory === "All"
    ? liquorItems
    : liquorItems.filter(item => item.category === activeCategory);

  const addToOrders = (item: any) => {
    const existingItem = currentOrders.find(order => order.id === item.id);
    if (existingItem) {
      setCurrentOrders(currentOrders.map(order =>
        order.id === item.id
          ? { ...order, quantity: order.quantity + 1 }
          : order
      ));
    } else {
      setCurrentOrders([...currentOrders, { ...item, quantity: 1 }]);
    }
  };

  const removeFromOrders = (itemId: any) => {
    setCurrentOrders(currentOrders.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: any, action: any) => {
    setCurrentOrders(currentOrders.map(item => {
          if (item.id === itemId) {
            const newQuantity = action === "increment" ? item.quantity + 1 : item.quantity - 1;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        }).filter((item): item is OrderItem => item !== null));
  };

  const calculateTotal = () => {
    const subtotal = currentOrders.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#303030]">Ekhaya Bar Lounge</h1>
          <button
            onClick={() => setShowOrders(!showOrders)}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <FaShoppingCart />
            Current Orders
          </button>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg ${activeCategory === category ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:bg-orange-100"}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.category}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold">R{item.price}</span>
                  <button
                    onClick={() => addToOrders(item)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Add to Orders
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-white shadow-lg transform transition-transform duration-300 ${showOrders ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Current Orders</h2>
            <button
              onClick={() => setShowOrders(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {currentOrders.map(item => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.category}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, "decrement")}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, "increment")}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-bold">R{(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => removeFromOrders(item.id)}
                      className="text-red-500 hover:text-red-700 mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>R{calculateTotal().subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (8%)</span>
              <span>R{calculateTotal().tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>R{calculateTotal().total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;