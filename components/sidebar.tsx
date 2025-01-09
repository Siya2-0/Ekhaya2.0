"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { FaBuilding, FaCode, FaUser, FaBoxOpen, FaArrowRight } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiTrolley } from "react-icons/pi";
import { MdOutlineInventory } from "react-icons/md";
import { PiUsersFourLight } from "react-icons/pi";
import { BsCashCoin } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import InactivityPopupClient from "./inactivitypopupclient";

const Sidebar = () => {
  const router = useRouter(); // Initialize useRouter
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState("company");

  const adminLinks = [
    { name: "Ekhaya", icon: <FaBuilding />, id: "company", path: "/" },
  ];

  const personalLinks = [
    { name: "Dashboard", icon: <LuLayoutDashboard />, id: "dashboard", path: "/protected/dashboard" },
    { name: "Orders", icon: <PiTrolley />, id: "orders", path: "/protected/orders" },
    { name: "Inventory", icon: <MdOutlineInventory />, id: "inventory", path: "/protected/inventory" },
    { name: "Staff", icon: <PiUsersFourLight />, id: "staff", path: "/protected/staff" },
    { name: "Billing & Payments", icon: <BsCashCoin />, id: "billing", path: "/protected/billing" },
    { name: "Reports", icon: <TbReportSearch />, id: "reports", path: "/protected/reports" },
    { name: "Notifications", icon: <IoIosNotificationsOutline />, id: "notifications", path: "/protected/notifications" },
    { name: "Profile", icon: <FaUser />, id: "profile", path: "/protected/profile" },
    { name: "Settings", icon: <IoSettingsOutline />, id: "settings", path: "/protected/settings" },
  ];

  const handleLinkClick = (linkId: any, path: string) => {
    setActiveLink(linkId);
    router.push(path); // Navigate to the desired page
  };

  return (
    <div
      className={`h-screen flex flex-col relative bg-[#303030] text-white transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"} fixed left-0 top-0`}
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
              className={`flex items-center cursor-pointer p-3 rounded-lg mb-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${activeLink === link.id ? "bg-[#D62929]" : "hover:bg-gray-500"}`}
            >
              <span className="text-xl transition-transform duration-300 transform group-hover:scale-110">{link.icon}</span>
              <span className={`ml-3 ${isCollapsed ? "hidden" : "block"}`}>{link.name}</span>
            </div>
          ))}
        </div>

        <div>
          {personalLinks.map((link) => (
            <div
              key={link.id}
              onClick={() => handleLinkClick(link.id, link.path)} // Pass path to handleLinkClick
              className={`flex items-center cursor-pointer p-3 rounded-lg mb-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${activeLink === link.id ? "bg-[#D62929]" : "hover:bg-gray-500"}`}
            >
              <span className="text-xl transition-transform duration-300 transform group-hover:scale-110">{link.icon}</span>
              <span className={`ml-3 ${isCollapsed ? "hidden" : "block"}`}>{link.name}</span>
            </div>
          ))}
        </div>
      </div>
      <InactivityPopupClient />
    </div>
  );
};

export default Sidebar;
