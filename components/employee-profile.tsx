"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaCheck, FaTimes, FaUserShield } from "react-icons/fa";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  phone: string;
  confirmation_sent_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    LOA: string;
    email: string;
    email_verified: boolean;
    first_name: string;
    image_url: string;
    last_name: string;
    phone_number: string;
    phone_verified: boolean;
    role: string;
    status: string;
    sub: string;
  };
  identities: null | Record<string, unknown>; // Replace with a more specific type if you know the structure
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

const EmployeeProfile = ({ users }: any) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [employeeData, setEmployeeData] = useState<User>(users);
  const [editEmployee, setEditEmployee] = useState<User>(users);
  const [initialEditEmployee, setInitialEditEmployee] = useState<User>(users);
  const [isUpdating, setIsUpdating] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClientComponentClient();

  useEffect(() => {
    setEditEmployee(users);
    setEmployeeData(users);
    setInitialEditEmployee(users);
  }, [users]);
  

  const managerPermissions = [
    { id: 1, name: "Access POS System", granted: true },
    { id: 2, name: "Manage Inventory", granted: true },
    { id: 3, name: "View Reports", granted: true },
    { id: 4, name: "Manage Staff", granted: false },
    { id: 5, name: "System Configuration", granted: false },
    { id: 6, name: "Make Sales", granted: true},
    { id: 7, name: "Manage Orders", granted: true},
  ]

  const adminPermissions = [
    { id: 1, name: "Access POS System", granted: true },
    { id: 2, name: "Manage Inventory", granted: true },
    { id: 3, name: "View Reports", granted: true },
    { id: 4, name: "Manage Staff", granted: true },
    { id: 5, name: "System Configuration", granted: true },
    { id: 6, name: "Make Sales", granted: true},
    { id: 7, name: "Manage Orders", granted: true},
  ]

  const nonManagementPermissions = [
    { id: 1, name: "Access POS System", granted: true },
    { id: 2, name: "Manage Inventory", granted: false },
    { id: 3, name: "View Reports", granted: false },
    { id: 4, name: "Manage Staff", granted: false },
    { id: 5, name: "System Configuration", granted: false },
    { id: 6, name: "Make Sales", granted: true},
    { id: 7, name: "Manage Orders", granted: true},
  ]

  useEffect(() => {
    if (file) {
      handleUploadProfilePicture();
    }
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      // handleUploadProfilePicture();
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

  const handleUploadProfilePicture = async () => {
    setLoading(true);
    if (file) {
      const filePath = `image/${uuidv4()}.${file.name.split('.').pop()}`;

      const imageUrl = await uploadFile(file, filePath).finally(() => console.log("Upload complete"));
      if (imageUrl) {
        setEditEmployee((prev) => ({
          ...prev,
          user_metadata: {
            ...prev.user_metadata,
            image_url: imageUrl,
          },
        }));
        handleEditEmployee({
          ...editEmployee,
          user_metadata: {
            ...editEmployee.user_metadata,
            image_url: imageUrl,
          },
        });
        setLoading(false);
      }
    } else {
      console.log('No file selected');
      setLoading(false);
    }
  };

  const handleEditEmployee = async (updatedEmployee: User) => {
    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: updatedEmployee.user_metadata.first_name,
          last_name: updatedEmployee.user_metadata.last_name,
          phone_number: updatedEmployee.user_metadata.phone_number,
          role: updatedEmployee.user_metadata.role,
          image_url: updatedEmployee.user_metadata.image_url,
          LOA: updatedEmployee.user_metadata.LOA,
          status: updatedEmployee.user_metadata.status,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User updated successfully!");
        setEmployeeData(updatedEmployee);
        setInitialEditEmployee(updatedEmployee);
        setShowEditModal(false);
        setLoading(false);
      } else {
        console.error(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditEmployee((prev) => ({
      ...prev,
      user_metadata: {
        ...prev.user_metadata,
        [name]: value,
      },
    }));
  };
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    await handleEditEmployee(editEmployee);
  };

  const hasChanges = JSON.stringify(editEmployee) !== JSON.stringify(initialEditEmployee);

  return (
    <div className="min-h-screen bg-gray-100">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-transparent p-6 rounded-lg">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
            <h2 className="text-2xl font-bold text-white">Please wait...</h2>
          </div>
        </div>
      )}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <FaUserShield className="h-8 w-8 text-blue-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">Employee Profile</h1>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Information Card */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={employeeData.user_metadata.image_url === "Default Image" ? "https://knnhfplevewsnqnrexkd.supabase.co/storage/v1/object/public/Ekhaya_Bucket/image/user.png" : employeeData.user_metadata.image_url}
                      alt="Profile"
                      className="h-32 w-32 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d";
                      }}
                    />
                    {/* upload profile picture button */}
                    <button
                      className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 text-white hover:bg-blue-700 transition-colors"
                      onClick={() => document.getElementById('fileInput')?.click()}
                    >
                      <FaEdit className="h-4 w-4" />
                    </button>
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold">{`${employeeData.user_metadata.first_name} ${employeeData.user_metadata.last_name}`}</h2>
                  <p className="text-gray-600">{employeeData.user_metadata.role}</p>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-gray-600">{employeeData.user_metadata.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-gray-600">{employeeData.user_metadata.phone_number}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Role and Permissions Card */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Role & Permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {employeeData.user_metadata.LOA === "Admin" && (
                    adminPermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center p-3 border rounded-lg">
                        {permission.granted ? (
                          <FaCheck className="h-5 w-5 text-green-500" />
                        ) : (
                          <FaTimes className="h-5 w-5 text-red-500" />
                        )}
                        <span className="ml-3 text-gray-700">{permission.name}</span>
                      </div>
                    ))
                  )}

                  {employeeData.user_metadata.LOA === "Management" && (
                    managerPermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center p-3 border rounded-lg">
                        {permission.granted ? (
                          <FaCheck className="h-5 w-5 text-green-500" />
                        ) : (
                          <FaTimes className="h-5 w-5 text-red-500" />
                        )}
                        <span className="ml-3 text-gray-700">{permission.name}</span>
                      </div>
                    ))
                  )}

                  {employeeData.user_metadata.LOA === "NonManagement" && (
                    nonManagementPermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center p-3 border rounded-lg">
                        {permission.granted ? (
                          <FaCheck className="h-5 w-5 text-green-500" />
                        ) : (
                          <FaTimes className="h-5 w-5 text-red-500" />
                        )}
                        <span className="ml-3 text-gray-700">{permission.name}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowEditModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <FaEdit className="-ml-1 mr-2 h-4 w-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </main>

      {showEditModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={editEmployee.user_metadata.first_name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={editEmployee.user_metadata.last_name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editEmployee.user_metadata.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={editEmployee.user_metadata.phone_number}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-transparent"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  disabled={!hasChanges || isUpdating}
                >
                  {isUpdating ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default EmployeeProfile;