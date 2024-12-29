"use client";

import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaCheck, FaTimes, FaUserShield, FaUserCog, FaReceipt, FaChartLine, FaUsers, FaLock } from "react-icons/fa";

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
  console.log("EmployeeProfile: ", users);

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

  const EditModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" defaultValue={employeeData.user_metadata.first_name} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" defaultValue={employeeData.user_metadata.last_name} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" defaultValue={employeeData.user_metadata.email} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="tel" defaultValue={employeeData.user_metadata.phone_number} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
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
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
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
                    <button className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 text-white hover:bg-blue-700 transition-colors">
                      <FaEdit className="h-4 w-4" />
                    </button>
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

      {showEditModal && <EditModal />}
    </div>
  );
};

export default EmployeeProfile;