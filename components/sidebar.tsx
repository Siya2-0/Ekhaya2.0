"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { FaBuilding, FaUser, FaArrowRight } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiTrolley } from "react-icons/pi";
import { MdOutlineInventory } from "react-icons/md";
import { PiUsersFourLight } from "react-icons/pi";
import { MdOutlineBorderColor } from "react-icons/md";
import useNavigation from '@/app/hook/useNavigation';
import InactivityPopupClient from "./inactivity-popup-client";

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

const Sidebar = ({user}: any) => {
  const [employeeData, setEmployeeData] = useState<User>(user);
  const router = useRouter(); // Initialize useRouter
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeLink, setActiveLink] = useState("company");

  const adminLinks = [
    { name: "Ekhaya", icon: <FaBuilding />, id: "company", path: "/" },
  ];

  const handleLinkClick = (linkId: any, path: string) => {
    setActiveLink(linkId);
    router.push(path); // Navigate to the desired page
  };

  const {
    isDashboardActive,
    isNewOrderActive,
    isOrdersActive,
    isInventoryActive,
    isStaffActive,
    isProfileActive,
    isHomeActive,} = useNavigation();

  return (
    <div
      className={`h-screen sticky flex flex-col bg-[#303030] text-white transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"} fixed left-0 top-0`}
    >
      <div className={`absolute right-0 z-10 ${isCollapsed ? 'top-0' : 'top-0'}`}>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className='bg-[#D62929] text-white p-2 cursor-pointer'>
          <FaArrowRight className={`w-5 h-5 transform ${!isCollapsed ? 'rotate-180' : 'rotate-0'} transition-transform duration-500 ease-in-out`} />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-8 mt-8">
          <h2 className={`text-gray-400 uppercase text-xs font-semibold mb-4 ${isCollapsed ? "hidden" : "block"}`}>
            Administrative
          </h2>
          {adminLinks.map((link) => (
            <div
              key={link.id}
              onClick={() => handleLinkClick(link.id, link.path)} // Pass path to handleLinkClick
              className={`flex items-center cursor-pointer p-3 rounded-lg mb-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${isHomeActive ? "bg-[#D62929]" : "hover:bg-gray-500"}`}
            >
              <span className="text-xl transition-transform duration-300 transform group-hover:scale-110">{link.icon}</span>
              <span className={`ml-3 ${isCollapsed ? "hidden" : "block"}`}>{link.name}</span>
            </div>
          ))}
        </div>

        <div>
            {employeeData.user_metadata.LOA !== "NonManagement" && (
              <div
                onClick={() => handleLinkClick("dashboard", "/protected/dashboard")} // Pass path to handleLinkClick
                className={`flex items-center cursor-pointer p-3 rounded-lg mb-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${isDashboardActive ? "bg-[#D62929]" : "hover:bg-gray-500"}`}
              >
                <span className="text-xl transition-transform duration-300 transform group-hover:scale-110"><LuLayoutDashboard /></span>
                <span className={`ml-3 ${isCollapsed ? "hidden" : "block"}`}>Dashboard</span>
              </div>
            )}
            <div
              onClick={() => handleLinkClick("neworder", "/protected/new-order")} // Pass path to handleLinkClick
              className={`flex items-center cursor-pointer p-3 rounded-lg mb-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${isNewOrderActive ? "bg-[#D62929]" : "hover:bg-gray-500"}`}
            >
              <span className="text-xl transition-transform duration-300 transform group-hover:scale-110"><MdOutlineBorderColor /></span>
              <span className={`ml-3 ${isCollapsed ? "hidden" : "block"}`}>New Order</span>
            </div>
            <div
              onClick={() => handleLinkClick("orders", "/protected/orders")} // Pass path to handleLinkClick
              className={`flex items-center cursor-pointer p-3 rounded-lg mb-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${isOrdersActive ? "bg-[#D62929]" : "hover:bg-gray-500"}`}
            >
              <span className="text-xl transition-transform duration-300 transform group-hover:scale-110"><PiTrolley /></span>
              <span className={`ml-3 ${isCollapsed ? "hidden" : "block"}`}>Orders</span>
            </div>
            {employeeData.user_metadata.LOA !== "NonManagement" && (
              <>
                <div
                  onClick={() => handleLinkClick("inventory", "/protected/inventory")} // Pass path to handleLinkClick
                  className={`flex items-center cursor-pointer p-3 rounded-lg mb-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${isInventoryActive ? "bg-[#D62929]" : "hover:bg-gray-500"}`}
                >
                  <span className="text-xl transition-transform duration-300 transform group-hover:scale-110"><MdOutlineInventory /></span>
                  <span className={`ml-3 ${isCollapsed ? "hidden" : "block"}`}>Inventory</span>
                </div>
                <div
                  onClick={() => handleLinkClick("staff", "/protected/staff")} // Pass path to handleLinkClick
                  className={`flex items-center cursor-pointer p-3 rounded-lg mb-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${isStaffActive ? "bg-[#D62929]" : "hover:bg-gray-500"}`}
                >
                  <span className="text-xl transition-transform duration-300 transform group-hover:scale-110"><PiUsersFourLight /></span>
                  <span className={`ml-3 ${isCollapsed ? "hidden" : "block"}`}>Staff</span>
                </div>
              </>
            )}
            <div
              onClick={() => handleLinkClick("profile", "/protected/profile")} // Pass path to handleLinkClick
              className={`flex items-center cursor-pointer p-3 rounded-lg mb-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${isProfileActive ? "bg-[#D62929]" : "hover:bg-gray-500"}`}
            >
              <span className="text-xl transition-transform duration-300 transform group-hover:scale-110"><FaUser /></span>
              <span className={`ml-3 ${isCollapsed ? "hidden" : "block"}`}>Profile</span>
            </div>
        </div>
      </div>
      <InactivityPopupClient />
    </div>
  );
};

export default Sidebar;
