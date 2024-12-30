"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaPlus, FaMinus, FaShoppingCart, FaCreditCard, FaReceipt } from "react-icons/fa";
import Image from "next/image";
import { RxCross2 } from 'react-icons/rx';
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Toolbar,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { FiMenu, FiPlusCircle, FiSearch, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import Payments from "@/components/billing";
import OrderSummary from "@/components/orderSummary";
import base64 from "@/app/assets/base64.jpeg";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast, { Toaster } from 'react-hot-toast';

const SearchWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 2,
  marginBottom: 3,
}));

type InventoryItem = {
    id: number;
    item_name: string;
    category: string;
    stock_quantity: number;
    price: number;
    last_restock_date: string;
    reorder_level: number;
    Image_url: string;
    description: string;
    created_at: string;
    update_at: string;
  };

  type Category = {
    id: number;
    category_name: string;
    category_description: string;
  };

const NewOrderManagement = ({ categoriesData, itemsData, username }: any) => {
    const [liquorItems, setLiquorItems] = useState(itemsData);
    const [categories, setCategories] = useState<Category[]>(categoriesData || []);
    const [newOrder, setNewOrder] = useState({});

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showOrders, setShowOrders] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [page, setPage] = useState(1);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showOrderSummary, setShowOrderSummary] = useState(false);
    const [pay, setPay] = useState(false);

    const supabase = createClientComponentClient();

    useEffect(() => {
      // Subscribe to real-time updates on 'Categories' table
      const subscription = supabase
        .channel("realtime:inventory")
        .on(
          'postgres_changes', // Correct event name
          {
            event: "*", // Listen for all events
            schema: "public",
            table: "Inventory",
          },
          (payload: any) => {
            console.log("Real-time update:", payload);
            if (payload.eventType === "INSERT") {
              setLiquorItems((prev: InventoryItem[]) => [...prev, payload.new]); // Append the new category
            }
  
            if (payload.eventType === "UPDATE") {
              // Update the existing category in the list when an update event happens
              setLiquorItems((prev: InventoryItem[]) =>
                prev.map((item) =>
                  item.id === payload.new.id ? payload.new : item
                )
              );
            }
  
            if (payload.eventType === "DELETE") {
              // Remove the deleted category from the list when a delete event happens
              setLiquorItems((prev: InventoryItem[]) =>
                prev.filter((item) => item.id !== payload.old.id)
              );
            }
          }
        )
        .subscribe();
  
      // Cleanup the subscription on component unmount
      return () => {
        supabase.removeChannel(subscription); // Clean up the subscription
      };
    }, [supabase]);

  interface OrderItem {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    quantity: number;
  }

  const [currentOrders, setCurrentOrders] = useState<OrderItem[]>([]);

  const handleCategoryChange = (category: any) => {
    setSelectedCategories((prev: any) =>
      prev.includes(category)
        ? prev.filter((cat: any) => cat !== category)
        : [...prev, category]
    );
  };

  const filteredItems = liquorItems
    .filter((product: InventoryItem) =>
      searchQuery
        ? product.item_name.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .filter((product: InventoryItem) =>
      selectedCategories.length > 0
        ? selectedCategories.includes(product.category)
        : true
    )
    .sort((a: InventoryItem, b: InventoryItem) => {
      if (sortBy === "priceLowToHigh") return a.price - b.price;
      if (sortBy === "priceHighToLow") return b.price - a.price;
      return 0;
    });

    const addToOrders = (item: InventoryItem) => {
      const existingItem = currentOrders.find(order => order.id === item.id);
      if (existingItem) {
        setCurrentOrders(currentOrders.map(order =>
          order.id === item.id
            ? { ...order, quantity: order.quantity + 1 }
            : order
        ));
      } else {
        setCurrentOrders([...currentOrders, { id: item.id, name: item.item_name, category: item.category, price: item.price, image: item.Image_url, quantity: 1 }]);
      }
      toast.success(`${item.item_name} added to orders`);
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
    const tax = subtotal;
    const total = subtotal;
    return { subtotal, tax, total };
  };

  const itemsPerPage = 4;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  const drawer = (
      <div className="flex">
          <Box sx={{ pb: 2, width: "100%" }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Categories
          </Typography>
          <FormGroup sx={{ flexDirection: "row" }}>
              {categories.map((category) => (
              <FormControlLabel
                  key={category.id}
                  control={
                  <Checkbox
                      checked={selectedCategories.includes(category.category_name)}
                      onChange={() => handleCategoryChange(category.category_name)}
                  />
                  }
                  label={category.category_name}
              />
              ))}
          </FormGroup>
          </Box>
      </div>
    );

    const processPayment = (paymentMethod: any) => {
      const newOrder = {
        id: Date.now(),
        items: currentOrders,
        total: currentOrders.reduce((acc: any, item: any) => acc + item.total, 0),
        status: paymentMethod === "card" ? "paid" : "unpaid",
        timestamp: new Date().toISOString()
      };
      // Store the new order separately
      const newOrders = [...currentOrders];
      setNewOrder(newOrder);
      // Store the new order separately
      const ordersHistory = JSON.parse(localStorage.getItem('ordersHistory') || '[]');
      ordersHistory.push(newOrder);
      localStorage.setItem('ordersHistory', JSON.stringify(ordersHistory));
      setPay(paymentMethod === "card");
      setShowOrderSummary(true);
    };

    const PaymentModal = () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center w-full justify-center z-50">
        {!showOrderSummary && (
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Payment Options</h2>
            <div className="space-y-4">
              <button
                onClick={() => processPayment("card")}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
              >
                <FaCreditCard /> Pay Now
              </button>
              <button
                onClick={() => processPayment("later")}
                className="w-full flex items-center justify-center gap-2 bg-yellow-600 text-white p-3 rounded-lg hover:bg-yellow-700"
              >
                <FaReceipt /> Pay Later
              </button>
            </div>
          </div>
        )}
        {showOrderSummary && (
          <OrderSummary
            pay={pay} setShowPaymentModal={setShowPaymentModal} setCurrentOrders={setCurrentOrders} setShowOrderSummary={setShowOrderSummary} newOrder={newOrder} username={username}
          />
        )}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <Toaster />
      <div className="flex">
        {/* Left column: Occupies remaining space */}
        <div className="flex-1 bg-[#F2F2F2] min-h-screen">
      <header className="bg-[#F2F2F2] shadow-md p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#303030]">E&nbsp;k&nbsp;h&nbsp;a&nbsp;y&nbsp;a&nbsp;&nbsp;&nbsp;&nbsp;B&nbsp;a&nbsp;r&nbsp;&nbsp;&nbsp;&nbsp;L&nbsp;o&nbsp;u&nbsp;n&nbsp;g&nbsp;e&nbsp;&nbsp;&nbsp;&nbsp;m&nbsp;e&nbsp;n&nbsp;u</h1>
        </div>
      </header>

      <div className="container mx-auto p-0">

        <main className="w-full h-full flex overflow-auto">
        <Box sx={{ flexGrow: 1 }}>
        <Container sx={{ mt: 4, mb: 8 }}>
            <Grid item xs={12} sm={9}>
                {drawer}
                <SearchWrapper sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                    startAdornment: <FiSearch />,
                    }}
                />
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                    value={sortBy}
                    label="Sort By"
                    onChange={(e) => setSortBy(e.target.value)}
                    >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                    <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
                    </Select>
                </FormControl>
                </SearchWrapper>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {paginatedItems.map((item: InventoryItem) => (
                    <div
                      key={item.id}
                      className="bg-[#FFFFFF] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                      <div className="flex flex-col md:flex-row h-full">
                        <div className="h-32 md:h-auto pt-4 pl-4 relative overflow-hidden">
                          <Image
                            src={item.Image_url}
                            alt="" 
                            unoptimized 
                            priority 
                            placeholder='blur' 
                            blurDataURL={"https://firebasestorage.googleapis.com/v0/b/ubac-18e0d.appspot.com/o/base64.jpeg?alt=media&token=3cbefe48-0084-439e-8ce4-3e95fd466c74"}
                            loading="eager" 
                            width={300} 
                            height={300}
                            className="w-full h-[100px] object-cover transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                        <div className="p-4 flex-1 justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-[#303030] mb-2">{item.item_name}</h3>
                            <p className="text-gray-400 text-sm mb-2">{item.category}</p>
                            <p className="text-[#303030] font-bold text-[24px]">R{item.price.toFixed(2)}</p>
                          </div>
                          <div className="w-full mt-[0px] justify-end items-end flex">
                            <button
                              onClick={() => addToOrders(item)}
                              className="mt-4 flex items-center justify-center bg-[#D62929] hover:opacity-90 text-white px-4 py-2 rounded-lg transition-opacity duration-300"
                            >
                              <FiPlusCircle className="mr-2" />
                              Add to Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </Grid>
                <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                    <Pagination
                      count={Math.ceil(filteredItems.length / itemsPerPage)}
                      page={page}
                      onChange={(e, value) => setPage(value)}
                      color="primary"
                    />
                  </Box>
        </Container>
        </Box>
    </main>
      </div>
        </div>

        {/* Right column: Fixed width */}
        <div className="w-[530px] bg-[#FFFFFF] min-h-screen">
        <div className={`fixed top-0 right-0 h-full w-full md:w-[530px] bg-[#FFFFFF] z-50`}>
        <div className="p-0 h-full flex flex-col">
          <React.Fragment>
                <div className='h-full w-full bg-[#FFFFFF] text-[#212322]'>
                  <div className='absolute top-0 w-full md:justify-center md:items-center md:text-center'>
                    <h2 className='sm:text-5xl text-4xl font-bold md:mt-8 mt-4 ml-4'>Current Orders</h2>
                  </div>
                  
                  <div className='absolute w-full top-28 md:bottom-[200px] bottom-[200px] overflow-y-auto'>
                    {currentOrders.map(item => (
                        <React.Fragment key={item.id}>
                                  <div className='mb-2' key={item.id}>
                                    <hr />
                                    <div className='flex items-center sm:space-x-4 w-full'>
                                        <div className='w-full pl-2'>
                                            <p className='font-bold sm:text-[18px] text-1xl'>{item.name}</p>
                                            <p className='text-sm'>{item.category}</p>
                                        </div>
                                        <div className='hidden sm:block min-w-[100px]'>
                                        <div className="py-2 px-3 inline-block bg-[#FFFFFF]" data-hs-input-number>
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
                                        <div className="py-2 px-3 inline-block bg-[#FFFFFF]" data-hs-input-number>
                                          <div className="flex items-center gap-x-1.5">
                                          <button onClick={() => updateQuantity(item.id, "decrement")} className="text-red mr-[0px] hover:before:bg-redborder-black relative rounded-full h-[32px] w-[32px] overflow-hidden bg-[#FFFFFF] px-3 text-[#D62929] shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#D62929] before:transition-all before:duration-500 hover:text-white hover:shadow-[#D62929] hover:before:left-0 hover:before:w-full">
                                            <span className="relative z-10"><FaMinus className='w-[10px] h-[10px]'/></span>
                                          </button>
                                            <input className="p-0 w-4 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-[#D62929]" type="text" value={item.quantity} data-hs-input-number-input readOnly/>
                                            <button onClick={() =>  updateQuantity(item.id, "increment")} className="text-red mr-[0px] hover:before:bg-redborder-[#D62929] relative rounded-full h-[32px] w-[32px] overflow-hidden bg-[#FFFFFF] px-3 text-[#D62929] shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#D62929] before:transition-all before:duration-500 hover:text-white hover:shadow-[#D62929] hover:before:left-0 hover:before:w-full">
                                              <span className="relative z-10"><FaPlus className='w-[10px] h-[10px]'/></span>
                                            </button>
                                          </div>
                                        </div>
                                        </div>
                                          <p className='text-center text-2xl font-bold'>R{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <div className='md:block hidden pr-0'>
                                          <button onClick={() => removeFromOrders(item.id)} className="pl-6 pr-6 h-[100px] bg-[#FFFFFF] w-full text-[#D62929] right-0 top-0 relative overflow-hidden bg-[#f2f2f2] text-[#D62929] transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-[#D62929] hover:before:w-2/4 hover:before:bg-[#D62929] hover:after:w-2/4 hover:after:bg-[#D62929]">
                                            <span className="relative z-10 uppercase text-[14px]">delete</span>
                                          </button>
                                        </div>
                                        <div className='md:hidden block pr-0'>
                                          <button onClick={() => removeFromOrders(item.id)} className="pl-6 pr-6 h-[100px] bg-[#FFFFFF] w-full text-[#D62929] right-0 top-0 relative overflow-hidden bg-[#f2f2f2] text-[#D62929] transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-[#D62929] hover:before:w-2/4 hover:before:bg-[#D62929] hover:after:w-2/4 hover:after:bg-[#D62929]">
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
                    <button onClick={() => setShowPaymentModal(true)} disabled={currentOrders.length === 0}  className={`group relative bottom-0 min-h-[66px] md:min-h-[86px] w-[100%] overflow-hidden border ${(currentOrders.length === 0) ? "border-[#898989]":"border-[#D62929]"} ${(currentOrders.length === 0) ? "bg-[#898989]":"bg-[#D62929]"} text-white transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 ${(currentOrders.length === 0) ? "before:bg-[#898989]":"before:bg-[#f2f2f2]"} before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 ${(currentOrders.length === 0) ? "after:bg-[#898989]":"after:bg-[#f2f2f2]"} after:duration-500 ${(currentOrders.length === 0) ? "hover:text-[#898989]":"hover:text-[#D62929]"} hover:before:h-full hover:after:h-full`}>
                      <span className={`top-[0] flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 ${(currentOrders.length === 0) ? "before:bg-[#898989]":"before:bg-[#f2f2f2]"} before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 ${(currentOrders.length === 0) ? "after:bg-[#898989]":"after:bg-[#f2f2f2]"} after:duration-500 hover:text-black group-hover:before:h-full group-hover:after:h-full`}></span>
                      <span className={`absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center ${(currentOrders.length === 0) ? "group-hover:text-[#ffffff]":"group-hover:text-[#D62929]"} text-[18px] font-semibold`}>Process Payment</span>
                    </button>
                  </div>
                </div>
              </React.Fragment>
        </div>
      </div>
        </div>
      </div>
      {showPaymentModal && <PaymentModal />}
    </div>
  );
};

export default NewOrderManagement;