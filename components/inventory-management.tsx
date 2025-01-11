"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { FaPlus, FaEdit, FaTrash, FaFileExport, FaSearch, FaFilter, FaChartLine, FaBoxOpen, FaExclamationTriangle, FaEnvelope, FaBarcode } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import CategoryManagement from "./category-management";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';
import emailjs from 'emailjs-com';
import toast, { Toaster } from "react-hot-toast";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type InventoryItem = {
  id: number;
  item_name: string;
  category: string;
  stock_quantity: number;
  price: number;
  last_restock_date: string;
  reorder_level: number;
  Image_url: string;
  image_file: File | null,
  description: string;
  created_at: string;
  update_at: string;
  barcode: string;
};
type Category = {
  id: number;
  category_name: string;
  category_description: string;
};

const InventoryManagement = ({categoriesData, itemsData}: any) => {
  const [inventory, setInventory] = useState(itemsData);
  const [categories, setCategories] = useState<Category[]>(categoriesData || []);

  const [isAdding, setIsAdding] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [updatedImageFile, setUpdatedImageFile] = useState<File | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [successModalHeader, setSuccessModalHeader] = useState("");
  const [successModalDescription, setSuccessModalDescription] = useState("");
  const [successModalType, setSuccessModalType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const [itemCode, setItemCode] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedItem, setSelectedItem] = useState<{
    editing: boolean,
    id: number;
    name: string;
    category: string;
    quantity: number;
    unitPrice: number;
    reorderLevel: number;
    last_restock_date: string;
    image: string;
    description: string;
    dateAdded: string;
    barcode: string;
    new_quantity: number;
  } | null>(null);
  const [newItem, setNewItem] = useState<{
    item_name: string;
    description: string;
    category: string;
    price: number;
    stock_quantity: number;
    reorder_level: number;
    last_restock_date: string;
    Image_url: string;
    image_file: File | null;
    barcode: string;
  }>({
    item_name: "",
    description: "",
    category: "",
    price: 0,
    stock_quantity: 0,
    reorder_level: 0,
    last_restock_date: new Date("2023-10-05").toISOString(),
    Image_url: "",
    image_file: null,
    barcode: ""
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (!showAddModal){
      let barcodeBuffer = "";
      let lastKeyTime = Date.now();
    
      const handleBarcodeInput = (e: KeyboardEvent) => {
        const currentTime = Date.now();
        
        // Reset the buffer if time between key presses is too long (> 100 ms)
        if (currentTime - lastKeyTime > 1000) {
          barcodeBuffer = "";
        }
        
        lastKeyTime = currentTime;
    
        if (e.key !== "Enter") {
          barcodeBuffer += e.key;
        } else {
          if (barcodeBuffer) {
            const trimmedBarcode = barcodeBuffer.trim();
            setItemCode(trimmedBarcode);
            handleBarcodeScan(trimmedBarcode);
            barcodeBuffer = "";
          }
          
        }
      };
    
      window.addEventListener("keypress", handleBarcodeInput);
    
      return () => {
        window.removeEventListener("keypress", handleBarcodeInput);
      };
    }
      }, [showAddModal]);


  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    if (!newItem.item_name) newErrors.item_name = 'Item name is required.';
    if (!newItem.category) newErrors.category = 'Category is required.';
    if (!newItem.stock_quantity) newErrors.stock_quantity = 'Quantity is required.';
    if (!newItem.price) newErrors.price = 'Price is required.';
    if (!newItem.reorder_level) newErrors.reorder_level = 'Reorder level is required.';
    if (!newItem.description) newErrors.description = 'Description is required.';
    if (!newItem.image_file) newErrors.image_file = 'Item image is required.';
    if (!newItem.barcode) newErrors.barcode = 'Item barcode is required.';

    return newErrors;
  }, [newItem]);

  // validateForm();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setNewItem({...newItem, image_file: event.target.files[0]});
    }
  };

  const handleImageUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUpdatedImageFile(file); // Store the file for further use (e.g., upload).
      const fileUrl = URL.createObjectURL(file); // Create a temporary URL for the image preview.
      if (selectedItem) {
        setSelectedItem({ 
          ...selectedItem, 
          image: fileUrl, 
          editing: true 
        }); // Update the image preview in the selected item.
      }
    }
  };
  

  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    cateogryDescription: "",
  });

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
          if (payload.eventType === "INSERT") {
            setInventory((prev: InventoryItem[]) => [...prev, payload.new]); // Append the new category
          }

          if (payload.eventType === "UPDATE") {
            // Update the existing category in the list when an update event happens
            setInventory((prev: InventoryItem[]) =>
              prev.map((item) =>
                item.id === payload.new.id ? payload.new : item
              )
            );
          }

          if (payload.eventType === "DELETE") {
            // Remove the deleted category from the list when a delete event happens
            setInventory((prev: InventoryItem[]) =>
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

  // const categories = ["WINE", "GIN", "VODKA"];

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const isFormValid = useMemo(() => {
    const errors = validateForm();
    return Object.keys(errors).length === 0;
  }, [validateForm]);
  
  const handleAddItem = async () => {
    const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return; // Exit if there are errors
  }

    setIsAdding(true);
    try {
      // Wait for the image to be uploaded and URL to be returned
      const storageImageUrl = await handleUpload();
  
      if (!storageImageUrl) {
        throw new Error("Image upload failed.");
      }
  
      // Proceed with adding the item
      const response = await fetch("/api/item/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_name: newItem.item_name,
          description: newItem.description,
          category: newItem.category,
          price: newItem.price,
          stock_quantity: newItem.stock_quantity,
          reorder_level: newItem.reorder_level,
          last_restock_date: new Date("2023-10-05").toISOString(),
          Image_url: storageImageUrl,
          barcode: newItem.barcode
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setNewItem({
          item_name: "",
          description: "",
          category: "",
          price: 0,
          stock_quantity: 0,
          reorder_level: 0,
          last_restock_date: new Date("2023-10-05").toISOString(),
          Image_url: "",
          image_file: null,
          barcode: "",
        });
        setErrors({});
        setSuccessModalDescription("Item added successfully.");
        setSuccessModalHeader("Successful!");
        setShowSuccessModal(true);
        setShowAddCategoryModal(false);
        resetNewItem();
      } else {
        console.log(`Error: ${data.error.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error(`Error: ${String(error)}`);
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleAddCat = () => {
    setIsAddingCategory(true);
    handleAddCategory();
  }

  const handleAddCategory = async () => {
    try {
      const response = await fetch("/api/category/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryname: newCategory.categoryName,
          categorydescription: (newCategory.cateogryDescription === "" ? "\t" : newCategory.cateogryDescription),
        }),
      });
      

      const data = await response.json();
      if (response.ok) {
        setSuccessModalDescription("Category added successfully.");
        setSuccessModalHeader("Successful!");
        setShowSuccessModal(true);
        setShowAddCategoryModal(false);
        setIsAddingCategory(false);
      } else {
        console.log(`Error: ${data.error}`);
        setIsAddingCategory(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        setIsAddingCategory(false);
      } else {
        console.log(`Error: ${String(error)}`);
        setIsAddingCategory(false);
      }
    }
  };

  const handleFinish = () => {
    setShowSuccessModal(false); // Close the modal
    if(successModalDescription === "Category added successfully.") {
      window.location.reload();
    }
    else {
      setShowAddModal(false);
    }
  };

  const handleEditItem = async (
    item_name: string,
    description: string,
    category: string,
    price: number,
    stock_quantity: number,
    reorder_level: number,
    last_restock_date: Date,
    Image_url: string,
    id: number,
    barcode: string
  ) => {
    try {
      let storageImageUrl: any | null = await handleUpdateImageUpload();
      if (storageImageUrl === null || storageImageUrl === undefined) {
        storageImageUrl = Image_url;
      }
      if (!storageImageUrl) {
        throw new Error("Image upload failed.");
      }
  
      // Ensure the correct key name for the image URL
      const response = await fetch("/api/item/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_name,
          description,
          category,
          price,
          stock_quantity,
          reorder_level,
          last_restock_date,
          Image_url: storageImageUrl, // Use the correct key
          id,
          barcode,
        }),
      });
  
      const data = await response;
      if (response.ok) {
        return data;
      } else {
        const errorData = await response.json();
        console.error(`Error: ${errorData}`);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  

  const handleUpdate = async () => {
    setIsEditingItem(true);
    if (!selectedItem || !selectedItem.editing) {
      setIsEditingItem(false);
      return;
    };
  
    try {
      // Call the API to update the category
      const updatedItem = await handleEditItem(
        selectedItem?.name,
        selectedItem?.description,
        selectedItem.category,
        selectedItem?.unitPrice,
        (selectedItem?.quantity + selectedItem?.new_quantity),
        selectedItem?.reorderLevel,
        new Date(selectedItem?.last_restock_date),
        selectedItem?.image,
        selectedItem.id,
        selectedItem.barcode,
      );
  
      if (updatedItem) {
        setShowEditModal(false);
        setSelectedItem(null);
        setIsEditingItem(false);
      }
    } catch (error) {
      console.error("Failed to update the category:", error);
    }
  };

  const getStatus = (stock_quantity: number, reorder_level: number) => {
    if (stock_quantity === 0) return "Out-of-Stock";
    if (stock_quantity <= reorder_level) return "Low-Stock";
    return "In-Stock";
  };

  const filteredInventory = inventory.filter((item: InventoryItem) => {
    const matchesSearch = 
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.barcode === searchTerm;
    
    const matchesStatus = 
      filterStatus === "all" || 
      getStatus(item.stock_quantity, item.reorder_level) === filterStatus;
    
    const matchesCategory = 
      filterCategory === "all" || 
      item.category === filterCategory;
  
    return matchesSearch && matchesStatus && matchesCategory;
  });
  

  const stats = {
    total: inventory.length,
    lowStock: inventory.filter((item: InventoryItem) => getStatus(item.stock_quantity, item.reorder_level) === "Low-Stock").length,
    outOfStock: inventory.filter((item: InventoryItem) => getStatus(item.stock_quantity, item.reorder_level) === "Out-of-Stock").length
  };

  const handleDeleteItem = async (id: any) => {
    try {
      const response = await fetch("/api/item/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id
        }),
      });
      

      const data = await response.json();
      if (response.ok) {
      } else {
        console.log(`Error: ${data.error.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
      } else {
        console.log(`Error: ${String(error)}`);
      }
    }
  };

  const handleDelete = async (id: any) => {
    // setLoading(true); // Start loading
    try {
      // Call the handleDeleteCategory function to perform the API call
      await handleDeleteItem(id);
  
      // If successful, remove the category from the state
      if (selectedItem) {
        const updatedInventory = inventory.filter((item: InventoryItem) => item.id !== selectedItem.id);
        setInventory(updatedInventory);
        setShowDeleteModal(false);
        setSelectedItem(null);
      }
    } catch (error) {
      console.error("Failed to delete the category:", error);
    } finally {
      // setLoading(false); // Stop loading
    }
  };

  const uploadFile = async (file: File, filePath: string) => {
    const { data, error } = await supabase.storage.from('Ekhaya_Bucket').upload(filePath, file);
    if (error) {
      console.log(`Error uploading file: ${error.message}`);
    } else {
      const { data: url } = await supabase.storage.from('Ekhaya_Bucket').getPublicUrl(filePath);
      return url.publicUrl;
    }
  };

  const handleUpload = async () => {
    if (file) {
      // setUploading(true);
      const filePath = `image/${uuidv4()}.${file.name.split('.').pop()}`;
      return uploadFile(file, filePath);
    } else {
      console.log('No file selected');
      return null;
    }
  };

  const handleUpdateImageUpload = async () => {
    if (updatedImageFile) {
      // setUploading(true);
      const filePath = `image/${uuidv4()}.${updatedImageFile.name.split('.').pop()}`;
      return uploadFile(updatedImageFile, filePath);
    } else {
      console.log('No file selected');
      return null;
    }
  };

  const resetNewItem = () => {
    setNewItem({
      item_name: "",
      description: "",
      category: "",
      price: 0,
      stock_quantity: 0,
      reorder_level: 0,
      last_restock_date: new Date("2023-10-05").toISOString(),
      Image_url: "",
      image_file: null,
      barcode: "",
    });
  };

  const handleCancel = () => {
    resetNewItem(); // Reset fields on cancel
    setShowAddModal(false); // Close modal
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(inventory);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
    XLSX.writeFile(workbook, "inventory.xlsx");
  };

  const handleAddItemManually = () => {
    if (!itemCode.trim()) {
      toast.error("Please enter a valid item code.");
      return;
    }

  
    // Find the item with the matching barcode
    const matchedItem = inventory.find((item: InventoryItem) => item.barcode === itemCode.trim());
  
    if (matchedItem) {
      setSearchTerm(matchedItem.barcode);
      setItemCode("");
      setIsOpen(false);
      toast.success(`${matchedItem.item_name} found`);
    } else {
      toast.error("Item not found.");
    }
  };

  const handleBarcodeScan = (code: any) => {
    if (!code.trim()) {
      toast.error("Please enter a valid item code.");
      return;
    }
  
    // Find the item with the matching barcode
    const matchedItem = inventory.find((item: InventoryItem) => item.barcode === code.trim());
  
    if (matchedItem) {
      setSearchTerm(matchedItem.barcode);
      setItemCode("");
      setIsOpen(false);
      toast.success(`${matchedItem.item_name} found`);
    } else {
      toast.error("Item not found.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] p-8">
      <Toaster/>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-500">Total Items</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg shadow">
              <p className="text-yellow-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg shadow">
              <p className="text-red-600">Out of Stock Items</p>
              <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                className="pl-10 w-full p-2 border rounded-lg bg-transparent"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <select
              className="p-2 border rounded-lg bg-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="In-Stock">In Stock</option>
              <option value="Low-Stock">Low Stock</option>
              <option value="Out-of-Stock">Out of Stock</option>
            </select>
            <select
              className="p-2 border rounded-lg bg-transparent"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.category_name}>
                  {category.category_name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              <FaPlus /> Add New Item
            </button>
            <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Manage Categories
          </button>
            <button
              onClick={() => setShowAddCategoryModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              <FaPlus /> Add New Category
            </button>
            <button
              onClick={handleExportToExcel}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700"
            >
              <FaFileExport /> Export to Excel
            </button>
            {/* <button
              onClick={() => setIsOpen(true)}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-700"
            >
              <FaBarcode /> Scan Barcode
            </button> */}
            <div className="relative flex">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Manually enter item code"
                className="pl-10 w-full flex-1 p-2 border rounded-lg bg-transparent"
                value={itemCode}
                onChange={(e) => setItemCode(e.target.value)}
              />
              <button
              onClick={handleAddItemManually}
              className="bg-green-600 text-white ml-4 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700"
              >Find</button>
            </div>
            {/* <button
              onClick={handleSendEmail}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700"
            >
              <FaEnvelope /> Send via Email
            </button> */}
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item: InventoryItem) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={item.Image_url}
                        alt={item.item_name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.item_name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.stock_quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    R{item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        getStatus(item.stock_quantity, item.reorder_level) === "In-Stock"
                          ? "bg-green-100 text-green-800"
                          : getStatus(item.stock_quantity, item.reorder_level) === "Low-Stock"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {getStatus(item.stock_quantity, item.reorder_level)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedItem({
                          editing: false,
                          id: item.id,
                          name: item.item_name,
                          category: item.category,
                          quantity: item.stock_quantity,
                          unitPrice: item.price,
                          last_restock_date: item.last_restock_date,
                          reorderLevel: item.reorder_level,
                          image: item.Image_url,
                          description: item.description,
                          dateAdded: item.created_at,
                          barcode: item.barcode,
                          new_quantity: 0,
                        });
                        setShowEditModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedItem({
                          editing: false,
                          id: item.id,
                          name: item.item_name,
                          category: item.category,
                          quantity: item.stock_quantity,
                          unitPrice: item.price,
                          reorderLevel: item.reorder_level,
                          last_restock_date: item.last_restock_date,
                          image: item.Image_url,
                          description: item.description,
                          dateAdded: item.created_at,
                          barcode: item.barcode,
                          new_quantity: 0,
                        });
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedItem({
                          editing: false,
                          id: item.id,
                          name: item.item_name,
                          category: item.category,
                          quantity: item.stock_quantity,
                          unitPrice: item.price,
                          last_restock_date: item.last_restock_date,
                          reorderLevel: item.reorder_level,
                          image: item.Image_url,
                          description: item.description,
                          dateAdded: item.created_at,
                          barcode: item.barcode,
                          new_quantity: 0,
                        });
                        setIsQuantityModalOpen(true);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-2 ml-8"
                    >
                      Stock intake
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full">
              <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    Item Name
                  </label>
                  <input
                    type="text"
                    placeholder="Item Name"
                    className="w-full p-2 border rounded bg-transparent"
                    value={newItem.item_name}
                    onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    Category
                  </label>
                  <select
                    className="w-full p-2 border rounded bg-transparent"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.category_name}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="w-full p-2 border rounded bg-transparent"
                    value={newItem.stock_quantity ?? ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewItem({
                        ...newItem,
                        stock_quantity: value ? parseInt(value, 10) : 0,
                      });
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    Unit Price (R)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Unit Price"
                    className="w-full p-2 border rounded bg-transparent"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({ ...newItem, price: parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    Reorder Level
                  </label>
                  <input
                    type="number"
                    placeholder="Reorder Level"
                    className="w-full p-2 border rounded bg-transparent"
                    value={newItem.reorder_level}
                    onChange={(e) =>
                      setNewItem({ ...newItem, reorder_level: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    Item Description
                  </label>
                  <input
                    type="text"
                    placeholder="Item Description"
                    className="w-full p-2 border rounded bg-transparent"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    Item Barcode
                  </label>
                  <input
                    type="text"
                    placeholder="Item Barcode"
                    className="w-full p-2 border rounded bg-transparent"
                    value={newItem.barcode}
                    onChange={(e) => setNewItem({ ...newItem, barcode: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    Item Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full p-2 border rounded bg-transparent"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItem}
                  className={`px-4 py-2 rounded-lg ${!isFormValid ? 'bg-gray-400': 'bg-blue-600 hover:bg-blue-700'}  text-white`}
                  disabled={!isFormValid || isAdding}
                >
                  {isAdding ? 'Adding...' : 'Add Item'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Category Modal */}
        {showAddCategoryModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <form action={handleAddCat}>
                  <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-[-10px] capitalize">
                      Category Name
                    </label>
                    <input
                      type="text"
                      placeholder="Category Name"
                      className="w-full p-2 border rounded bg-transparent"
                      value={newCategory.categoryName}
                      required
                      onChange={(e) => setNewCategory({ ...newCategory, categoryName: e.target.value })}
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-[-10px] capitalize">
                      Category Description
                    </label>
                    <input
                      type="text"
                      placeholder="Category Description"
                      className="w-full p-2 border rounded bg-transparent"
                      value={newCategory.cateogryDescription || ""}
                      onChange={(e) => setNewCategory({ ...newCategory, cateogryDescription: e.target.value })}
                    />
                  </div>
                  <div className="mt-6 flex justify-end gap-4">
                    <button
                      onClick={() => setShowAddCategoryModal(false)}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      // onClick={() => setIsAddingCategory(true)}
                      disabled={(newCategory.categoryName === "") || isAddingCategory}
                      className={`px-4 py-2 rounded-lg ${
                        (!newCategory.categoryName || isAddingCategory) ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                      } text-white`}
                    >
                      {isAddingCategory ? "Adding..." : "Add Category"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        {showSuccessModal && (
          <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
        //   onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all sm:p-8">
            <div className="absolute right-4 top-4">
              <button
                // onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                aria-label="Close modal"
              >
                <IoMdClose className="h-6 w-6" />
              </button>
            </div>
    
            <div className="flex flex-col items-center justify-center">
              <div className="mb-4 rounded-full bg-green-100 p-3">
                <FiCheckCircle className="h-12 w-12 text-green-500" />
              </div>
    
              <h2
                id="modal-title"
                className="mb-2 text-center text-2xl font-bold text-gray-900"
              >
                {successModalHeader}
              </h2>
              <p className="mb-6 text-center text-gray-600">
                {successModalDescription}
              </p>
    
              <div className="flex w-full flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleFinish}
                  className="flex-1 rounded-lg bg-green-100 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
        {/* Edit Modal */}
        {showEditModal && selectedItem && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 max-w-[60%] w-full">
              <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
              <div className="space-y-4">
                <div className="flex justify-center items-center w-full mb-16">
                  <div className="w-32 h-32">
                    <img
                      src={selectedItem.image}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d";
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      Item Name
                    </label>
                    <input
                      type="text"
                      placeholder="Item Name"
                      className="w-full p-4 border rounded bg-transparent"
                      value={selectedItem.name}
                      onChange={(e) =>
                        setSelectedItem({ ...selectedItem, name: e.target.value, editing: true })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      Item Description
                    </label>
                    <input
                      type="text"
                      placeholder="Item Description"
                      className="w-full p-4 border rounded bg-transparent"
                      value={selectedItem.description}
                      onChange={(e) =>
                        setSelectedItem({ ...selectedItem, description: e.target.value, editing: true })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      Item Category
                    </label>
                    <select
                      className="w-full p-4 border rounded bg-transparent"
                      value={selectedItem.category}
                      onChange={(e) =>
                        setSelectedItem({ ...selectedItem, category: e.target.value, editing: true })
                      }
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.category_name}>
                          {category.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      Quantity
                    </label>
                    <input
                      type="number"
                      placeholder="Quantity"
                      className="w-full p-4 border rounded bg-transparent"
                      value={selectedItem.quantity}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          quantity: parseInt(e.target.value),
                          editing: true,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      Reorder Level
                    </label>
                    <input
                      type="number"
                      placeholder="Reorder Level"
                      className="w-full p-4 border rounded bg-transparent"
                      value={selectedItem.reorderLevel}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          reorderLevel: parseInt(e.target.value),
                          editing: true,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      Unit Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Unit Price"
                      className="w-full p-4 border rounded bg-transparent"
                      value={selectedItem.unitPrice}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          unitPrice: parseFloat(e.target.value),
                          editing: true,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      Item Barcode
                    </label>
                    <input
                      type="text"
                      placeholder="Item Barcode"
                      className="w-full p-4 border rounded bg-transparent"
                      value={selectedItem.barcode}
                      onChange={(e) =>
                        setSelectedItem({ ...selectedItem, barcode: e.target.value, editing: true })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                        Update Item Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full p-4 border rounded"
                        onChange={handleImageUpdate}
                      />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className={`px-4 py-2 rounded-lg ${
                      isEditingItem ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                    disabled={isEditingItem} // Disable button while loading
                  >
                    {isEditingItem ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Delete Modal */}
        {showDeleteModal && selectedItem && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Delete Item</h2>
              <p className="mb-4">Are you sure you want to delete {selectedItem.name}?</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedItem.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isCategoryModalOpen && <CategoryManagement setIsCategoryModalOpen={setIsCategoryModalOpen} categoriesData={categoriesData}/>}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 transform transition-all"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                id="modal-title"
                className="text-xl font-semibold text-gray-900"
              >
                Barcode Scanner
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                aria-label="Close modal"
              >
                <IoMdClose className="text-2xl" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-center">
                  Waiting for you to scan a barcode...
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="itemCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Manual Entry
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  id="itemCode"
                  value={itemCode}
                  onChange={(e) => setItemCode(e.target.value)}
                  placeholder="Enter item code"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  aria-label="Item code input"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddItemManually}
                  disabled={!itemCode.trim()}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isQuantityModalOpen && selectedItem && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-6 rounded shadow-lg">
            <h4 className="text-lg font-semibold mb-4">Update Quantity</h4>
            <div>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              Quantity
            </label>
            <input
              type="number"
              step="1"
              placeholder="Quantity"
              className="w-full p-4 border rounded bg-transparent"
              value={selectedItem?.new_quantity}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  new_quantity: parseFloat(e.target.value),
                  editing: true,
                })
              }
            />
          </div>
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => setIsQuantityModalOpen(false)} 
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className={`px-4 py-2 rounded-lg ${
                  isEditingItem ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
                disabled={isEditingItem} // Disable button while loading
              >
                {isEditingItem ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
