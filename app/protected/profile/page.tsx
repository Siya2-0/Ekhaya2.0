"use client";

import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaCheck, FaTimes, FaUserShield, FaUserCog, FaReceipt, FaChartLine, FaUsers, FaLock } from "react-icons/fa";

const EmployeeProfile = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [employeeData] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    role: "Management",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
    permissions: [
      { id: 1, name: "Access POS System", granted: true },
      { id: 2, name: "Manage Inventory", granted: true },
      { id: 3, name: "View Reports", granted: true },
      { id: 4, name: "Manage Staff", granted: false },
      { id: 5, name: "System Configuration", granted: false },
    ]
  });

  const EditModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" defaultValue={employeeData.name} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" defaultValue={employeeData.email} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="tel" defaultValue={employeeData.phone} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
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
                      src={employeeData.profileImage}
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
                  <h2 className="mt-4 text-xl font-semibold">{employeeData.name}</h2>
                  <p className="text-gray-600">{employeeData.role}</p>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-gray-600">{employeeData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-gray-600">{employeeData.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Role and Permissions Card */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Role & Permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {employeeData.permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center p-3 border rounded-lg">
                      {permission.granted ? (
                        <FaCheck className="h-5 w-5 text-green-500" />
                      ) : (
                        <FaTimes className="h-5 w-5 text-red-500" />
                      )}
                      <span className="ml-3 text-gray-700">{permission.name}</span>
                    </div>
                  ))}
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