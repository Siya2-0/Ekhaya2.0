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
                  {filteredItems.map((item: InventoryItem) => (
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
                    count={Math.ceil(filteredItems.length / 3)}
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
      </div>
      {showPaymentModal && <PaymentModal />}
    </div>
  );
};

export default NewOrderManagement;