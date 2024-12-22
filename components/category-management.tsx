import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiSearch, FiX } from "react-icons/fi";
import { FaSort } from "react-icons/fa";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const CategoryManagement = ({setIsCategoryModalOpen, categoriesData}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState(categoriesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  type Category = {
    id: number;
    category_name: string;
    category_description: string;
  };

  const supabase = createClientComponentClient();

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    // Define the Payload type for the real-time event
    interface Payload {
      eventType: string;
      new: Category;
      old: Category;
    }

    // Subscribe to real-time updates on 'Categories' table
    const subscription = supabase
      .channel("realtime:categories")
      .on(
        'postgres_changes', // Correct event name
        {
          event: "*", // Listen for all events
          schema: "public",
          table: "Categories",
        },
        (payload: Payload) => {
          console.log("Real-time update:", payload);
          if (payload.eventType === "INSERT") {
            setCategories((prev: Category[]) => [...prev, payload.new]); // Append the new category
          }

          if (payload.eventType === "UPDATE") {
            // Update the existing category in the list when an update event happens
            setCategories((prev: Category[]) =>
              prev.map((category) =>
                category.id === payload.new.id ? payload.new : category
              )
            );
          }

          if (payload.eventType === "DELETE") {
            // Remove the deleted category from the list when a delete event happens
            setCategories((prev: Category[]) =>
              prev.filter((category) => category.id !== payload.old.id)
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

  const handleSort = (key: any) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedCategories = [...categories].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = (a[sortConfig.key] as string).toLowerCase();
    const bValue = (b[sortConfig.key] as string).toLowerCase();
    return sortConfig.direction === "ascending" 
      ? aValue > bValue ? 1 : -1
      : aValue < bValue ? 1 : -1;
  });

  const filteredCategories = sortedCategories.filter(
    (category) =>
      category.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.category_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
  };

  const handleUpdate = () => {
    if (!editingCategory || !editingCategory.category_name || !editingCategory.category_description) return;
    setCategories(
      categories.map((cat: any) =>
        cat.id === editingCategory.id ? editingCategory : cat
      )
    );
    setEditingCategory(null);
  };

  const handleDelete = (id: any) => {
    setCategories(categories.filter((cat: any) => cat.id !== id));
    setShowDeleteConfirm(null);
  };


  const FectchCategories = async () => {
    try {
      const response = await fetch("/api/category/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
        }),
      });
      

      const data = await response.json();
      if (response.ok) {
        console.log("Category added successfully!");
        console.log(data);
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

  return (
    <div className="font-sans">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Category Management</h2>
                <button
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition duration-200"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-4 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th
                        className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center gap-2">
                          Category Name
                          <FaSort className="text-gray-400" />
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("description")}
                      >
                        <div className="flex items-center gap-2">
                          Description
                          <FaSort className="text-gray-400" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCategories.map((category) => (
                      <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingCategory?.id === category.id ? (
                            <input
                              type="text"
                              className="w-full px-2 py-1 border rounded"
                              value={editingCategory?.category_name || ""}
                              onChange={(e) =>
                                setEditingCategory({
                                  ...editingCategory!,
                                  category_name: e.target.value,
                                })
                              }
                            />
                          ) : (
                            category.category_name
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {editingCategory?.id === category.id ? (
                            <input
                              type="text"
                              className="w-full px-2 py-1 border rounded"
                              value={editingCategory?.category_description || ""}
                              onChange={(e) =>
                                setEditingCategory({
                                  ...editingCategory!,
                                  category_description: e.target.value,
                                })
                              }
                            />
                          ) : (
                            category.category_description
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {editingCategory?.id === category.id ? (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={handleUpdate}
                                className="text-green-600 hover:text-green-900"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingCategory(null)}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-end gap-4">
                              <button
                                onClick={() => handleEdit(category)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <FiEdit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(category.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <FiTrash2 className="w-5 h-5" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
                <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this category?</p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(showDeleteConfirm)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  );
};

export default CategoryManagement;