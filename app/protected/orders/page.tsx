"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { RxCross2 } from 'react-icons/rx';

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
    },
    {
      id: 4,
      name: "Premium Whisky",
      category: "Whisky",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b"
    },
    {
      id: 5,
      name: "Silver Tequila",
      category: "Tequila",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b"
    },
    {
      id: 6,
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
    setShowOrders(true);
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
    <div className="min-h-screen bg-[#F2F2F2]">
      <header className="bg-[#F2F2F2] shadow-md p-4 sticky">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#303030]">E&nbsp;k&nbsp;h&nbsp;a&nbsp;y&nbsp;a&nbsp;&nbsp;&nbsp;&nbsp;B&nbsp;a&nbsp;r&nbsp;&nbsp;&nbsp;&nbsp;L&nbsp;o&nbsp;u&nbsp;n&nbsp;g&nbsp;e</h1>

          <button
            onClick={() => setShowOrders(!showOrders)}
            className="flex items-center gap-2 bg-[#D62929] text-white px-4 py-2 rounded-lg hover:placeholder-opacity-90 transition-opacity"
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
              className={`px-4 py-2 rounded-lg ${activeCategory === category ? "bg-[#D62929] text-white" : "bg-white text-gray-700 hover:bg-orange-100"}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-[#f2f2f2] rounded-lg shadow-md overflow-hidden">
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
                    className="bg-[#D62929] text-[#f2f2f2] px-4 py-2 rounded-lg hover:placeholder-opacity-90 transition-opacity"
                  >
                    Add to Orders
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`fixed top-0 right-0 h-full w-full md:w-[700px] bg-[#f2f2f2] shadow-lg transform transition-transform duration-300 ${showOrders ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-0 h-full flex flex-col">
          {/* <div className="flex justify-between items-center mb-4">
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
          </div> */}
          <React.Fragment>
                <div className='h-full w-full bg-[#f2f2f2] text-[#212322]'>
                  <div className='absolute top-0 w-full md:justify-center md:items-center md:text-center'>
                    <h2 className='sm:text-5xl text-4xl font-bold md:mt-8 mt-4 ml-4'>Current Orders</h2>
                    <button
                      onClick={() => setShowOrders(false)}
                      className="text-gray-500 hover:text-gray-700 top-2 right-2 absolute"
                    >
                      <FaTimes size={48} />
                    </button>
                    {/* <hr className='text-[#898989] md:mt-12'/> */}
                  </div>
                  
                  <div className='absolute w-full top-28 md:bottom-[280px] bottom-[200px] overflow-y-auto'>
                    {currentOrders.map(item => (
                        <React.Fragment key={item.id}>
                                  <div className='mb-2' key={item.id}>
                                    <hr />
                                    <div className='flex items-center sm:space-x-4 w-full'>
                                        <Image src={item.image} alt='' width={100} height={100} className='sm:w-36 sm:h-36'style={{objectFit:"cover"}} unoptimized />
                                        <div className='w-full pl-2'>
                                            <p className='font-bold sm:text-2xl text-1xl'>{item.name}</p>
                                            <p className='text-sm'>{item.category}</p>
                                            {/* <p className='text-sm'>Size: {sale.selectedSize}</p> */}
                                        </div>
                                        <div className='hidden sm:block min-w-[100px]'>
                                        <div className="py-2 px-3 inline-block bg-[#f2f2f2]" data-hs-input-number>
                                          <div className="flex items-center gap-x-1.5">
                                          <button onClick={() => updateQuantity(item.id, "decrement")} className="text-red mr-[0px] hover:before:bg-redborder-black relative rounded-full h-[32px] w-[32px] overflow-hidden bg-[#f2f2f2] px-3 text-[#000000] shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#D62929] before:transition-all before:duration-500 hover:text-white hover:shadow-[#D62929] hover:before:left-0 hover:before:w-full">
                                            <span className="relative z-10"><FaMinus className='w-[10px] h-[10px]'/></span>
                                          </button>
                                            <input className="p-0 w-4 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-[#D62929]" type="text" value={item.quantity} data-hs-input-number-input readOnly/>
                                            <button onClick={() =>  updateQuantity(item.id, "increment")} className="text-red mr-[0px] hover:before:bg-redborder-[#D62929] relative rounded-full h-[32px] w-[32px] overflow-hidden bg-[#f2f2f2] px-3 text-[#000000] shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#D62929] before:transition-all before:duration-500 hover:text-white hover:shadow-[#D62929] hover:before:left-0 hover:before:w-full">
                                              <span className="relative z-10"><FaPlus className='w-[10px] h-[10px]'/></span>
                                            </button>
                                          </div>
                                        </div>
                                        </div>
                                        <div>
                                        <div className='sm:hidden block min-w-[100px]'>
                                        <div className="py-2 px-3 inline-block bg-[#f2f2f2]" data-hs-input-number>
                                          <div className="flex items-center gap-x-1.5">
                                          <button onClick={() => updateQuantity(item.id, "decrement")} className="text-red mr-[0px] hover:before:bg-redborder-black relative rounded-full h-[32px] w-[32px] overflow-hidden bg-[#f2f2f2] px-3 text-[#D62929] shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#D62929] before:transition-all before:duration-500 hover:text-white hover:shadow-[#D62929] hover:before:left-0 hover:before:w-full">
                                            <span className="relative z-10"><FaMinus className='w-[10px] h-[10px]'/></span>
                                          </button>
                                            <input className="p-0 w-4 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-[#D62929]" type="text" value={item.quantity} data-hs-input-number-input readOnly/>
                                            <button onClick={() =>  updateQuantity(item.id, "increment")} className="text-red mr-[0px] hover:before:bg-redborder-[#D62929] relative rounded-full h-[32px] w-[32px] overflow-hidden bg-[#f2f2f2] px-3 text-[#D62929] shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#D62929] before:transition-all before:duration-500 hover:text-white hover:shadow-[#D62929] hover:before:left-0 hover:before:w-full">
                                              <span className="relative z-10"><FaPlus className='w-[10px] h-[10px]'/></span>
                                            </button>
                                          </div>
                                        </div>
                                        </div>
                                          <p className='text-center text-2xl font-bold'>R{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <div className='md:block hidden pr-0'>
                                          <button onClick={() => removeFromOrders(item.id)} className="pl-6 pr-6 h-[128px] bg-[#f2f2f2] w-full text-[#D62929] right-0 top-0 relative overflow-hidden bg-[#f2f2f2] text-[#D62929] transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-[#D62929] hover:before:w-2/4 hover:before:bg-[#D62929] hover:after:w-2/4 hover:after:bg-[#D62929]">
                                            <span className="relative z-10 uppercase">delete</span>
                                          </button>
                                        </div>
                                        <div className='md:hidden block pr-0'>
                                          <button onClick={() => removeFromOrders(item.id)} className="pl-6 pr-6 h-[128px] bg-[#f2f2f2] w-full text-[#D62929] right-0 top-0 relative overflow-hidden bg-[#f2f2f2] text-[#D62929] transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-[#D62929] hover:before:w-2/4 hover:before:bg-[#D62929] hover:after:w-2/4 hover:after:bg-[#D62929]">
                                              <span className="relative z-10"><RxCross2 className='w-[25px] h-[25px]'/></span>
                                          </button>
                                        </div>
                                    </div>
                                    <hr />
                                  </div>
                        </React.Fragment>
                    ))}
                  </div>
                  <div className='justify-center items-center text-center absolute bottom-0 w-full'>
                    <div className='relative md:bottom-[32px] min-h-[76px] md:pt-7 w-[100%] flex space-x-2'>
                      <div className='w-full'>
                          <p className='text-black text-2xl font-bold'>TOTAL</p>
                      </div>
                      <div className='w-full'>
                      <p className='mr-0 text-[#212322] text-3xl font-normal relative'>R{calculateTotal().total.toFixed(2)}</p>
                      </div>
                    </div>
                    <button onClick={() => setShowOrders(false)} disabled={currentOrders.length === 0} className={`group relative bottom-2 min-h-[66px] md:min-h-[76px] w-[96%] overflow-hidden border ${(currentOrders.length === 0) ? "border-[#898989]":"border-[#D62929]"} bg-[#f2f2f2] ${(currentOrders.length === 0) ? "text-[#898989]":"text-[#D62929]"} transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 ${(currentOrders.length === 0) ? "":"before:bg-[#D62929]"} before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 ${(currentOrders.length === 0) ? "":"after:bg-[#D62929]"} after:duration-500 ${(currentOrders.length === 0) ? "":"hover:text-[#ffffff]"} hover:before:h-full hover:after:h-full`}>
                      <span className={`top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 ${(currentOrders.length === 0) ? "":"before:bg-[#D62929]"} before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 ${(currentOrders.length === 0) ? "":"after:bg-[#D62929]"} after:duration-500 ${(currentOrders.length === 0) ? "":"hover:text-[#ffffff]"} group-hover:before:h-full group-hover:after:h-full`}></span>
                      <span className={`absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center ${(currentOrders.length === 0) ? "group-hover:text-[#898989]":"group-hover:text-[#ffffff]"} text-[18px] font-semibold`}>Continue Ordering</span>
                    </button>
                    <button disabled={currentOrders.length === 0}  className={`group relative bottom-0 min-h-[66px] md:min-h-[86px] w-[100%] overflow-hidden border ${(currentOrders.length === 0) ? "border-[#898989]":"border-[#D62929]"} ${(currentOrders.length === 0) ? "bg-[#898989]":"bg-[#D62929]"} text-white transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 ${(currentOrders.length === 0) ? "before:bg-[#898989]":"before:bg-[#f2f2f2]"} before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 ${(currentOrders.length === 0) ? "after:bg-[#898989]":"after:bg-[#f2f2f2]"} after:duration-500 ${(currentOrders.length === 0) ? "hover:text-[#898989]":"hover:text-[#D62929]"} hover:before:h-full hover:after:h-full`}>
                      <span className={`top-[0] flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 ${(currentOrders.length === 0) ? "before:bg-[#898989]":"before:bg-[#f2f2f2]"} before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 ${(currentOrders.length === 0) ? "after:bg-[#898989]":"after:bg-[#f2f2f2]"} after:duration-500 hover:text-black group-hover:before:h-full group-hover:after:h-full`}></span>
                      <span className={`absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center ${(currentOrders.length === 0) ? "group-hover:text-[#ffffff]":"group-hover:text-[#D62929]"} text-[18px] font-semibold`}>Order</span>
                    </button>
                  </div>
                </div>
              </React.Fragment>
        </div>
      </div>
    </div>
  );
};

export default Orders;