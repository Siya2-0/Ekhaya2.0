"use client";

import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaFileExport, FaSearch, FaFilter, FaChartLine, FaBoxOpen, FaExclamationTriangle } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import CategoryManagement from "./category-management";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

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
  });

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
          console.log("Real-time update:", payload);
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

  const handleAddItem = async () => {
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
          Image_url: storageImageUrl, // Use the uploaded image URL
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log("Item added successfully!");
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

  const handleAddCategory = async () => {
    setIsAddingCategory(true);
    try {
      const response = await fetch("/api/category/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryname: newCategory.categoryName,
          categorydescription: newCategory.cateogryDescription,
        }),
      });
      

      const data = await response.json();
      if (response.ok) {
        console.log("Category added successfully!");
        setSuccessModalDescription("Category added successfully.");
        setSuccessModalHeader("Successful!");
        setShowSuccessModal(true);
        setShowAddCategoryModal(false);
        setIsAddingCategory(false);
      } else {
        console.log(`Error: ${data.error.message}`);
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
    id: number
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
        }),
      });
  
      const data = await response;
      if (response.ok) {
        console.log("Item updated successfully!");
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
        selectedItem?.quantity,
        selectedItem?.reorderLevel,
        new Date(selectedItem?.last_restock_date),
        selectedItem?.image,
        selectedItem.id
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
    const matchesSearch = item.item_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || getStatus(item.stock_quantity, item.reorder_level) === filterStatus;
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
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
        console.log("Delete added successfully!");
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
      console.log(url.publicUrl);
      console.log(`File uploaded successfully: ${data}`);
      return url.publicUrl;
    }
  };

  const handleUpload = async () => {
    if (file) {
      // setUploading(true);
      const filePath = `image/${uuidv4()}.${file.name.split('.').pop()}`;
      return uploadFile(file, filePath).finally(() => console.log("Upload complete"));
    } else {
      console.log('No file selected');
      return null;
    }
  };

  const handleUpdateImageUpload = async () => {
    if (updatedImageFile) {
      // setUploading(true);
      const filePath = `image/${uuidv4()}.${updatedImageFile.name.split('.').pop()}`;
      return uploadFile(updatedImageFile, filePath).finally(() => console.log("Upload complete"));
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
    });
  };

  const handleCancel = () => {
    resetNewItem(); // Reset fields on cancel
    setShowAddModal(false); // Close modal
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] p-8">
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
                        });
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Modal */}
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
                    className="w-full p-2 border rounded"
                    value={newItem.item_name}
                    onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    Category
                  </label>
                  <select
                    className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    Item Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full p-2 border rounded"
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
                  className={`px-4 py-2 rounded-lg ${
                    isAdding ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                  disabled={isAdding}
                >
                  {isAdding ? "Adding..." : "Add Item"}
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Add Category Modal */}
        {showAddCategoryModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 mb-[-10px] capitalize">
                    Category Name
                  </label>
                  <input
                    type="text"
                    placeholder="Category Name"
                    className="w-full p-2 border rounded"
                    value={newCategory.categoryName}
                    onChange={(e) => setNewCategory({ ...newCategory, categoryName: e.target.value })}
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-[-10px] capitalize">
                    Category Description
                  </label>
                  <input
                    type="text"
                    placeholder="Category Description"
                    className="w-full p-2 border rounded"
                    value={newCategory.cateogryDescription}
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
                    onClick={handleAddCategory}
                    className={`px-4 py-2 rounded-lg ${
                      isAddingCategory ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                    disabled={isAddingCategory} // Disable button while loading
                  >
                    {isAddingCategory ? "Adding..." : "Add Category"}
                  </button>
                </div>
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
                    {/* <button className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 text-white hover:bg-blue-700 transition-colors">
                      <FaEdit className="h-4 w-4" />
                    </button> */}
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
                      className="w-full p-4 border rounded"
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
                      className="w-full p-4 border rounded"
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
                      className="w-full p-4 border rounded"
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
                      className="w-full p-4 border rounded"
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
                      className="w-full p-4 border rounded"
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
                      className="w-full p-4 border rounded"
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
                        Update Item Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full p-2 border rounded"
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
    </div>
  );
};

export default InventoryManagement;
