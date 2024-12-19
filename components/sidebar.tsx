"use client";

import React, { useState } from "react";
import { FaBuilding, FaCode, FaUser, FaBoxOpen } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiTrolley } from "react-icons/pi";
import { MdOutlineInventory } from "react-icons/md";
import { PiUsersFourLight } from "react-icons/pi";
import { BsCashCoin } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState("company");

  const adminLinks = [
    { name: "Ekhaya", icon: <FaBuilding />, id: "company" },
    // { name: "Developers", icon: <FaCode />, id: "developers" }
  ];

  const personalLinks = [
    { name: "Dashboard", icon: <LuLayoutDashboard />, id: "dashboard" },
    { name: "Orders", icon: <PiTrolley />, id: "orders" },
    { name: "Inventory", icon: <MdOutlineInventory />, id: "inventory" },
    { name: "Staff", icon: <PiUsersFourLight />, id: "Staff" },
    { name: "Billing & Payments", icon: <BsCashCoin />, id: "billing" },
    { name: "Reports", icon: <TbReportSearch />, id: "reports" },
    { name: "Notifications", icon: <IoIosNotificationsOutline />, id: "notifications" },
    { name: "Profile", icon: <FaUser />, id: "profile" },
    { name: "Settings", icon: <IoSettingsOutline />, id: "settings" }
  ];

  const handleLinkClick = (linkId: any) => {
    setActiveLink(linkId);
  };

  return (
    <div
      className={`h-screen bg-[#303030] text-white transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"} fixed left-0 top-0`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-9 bg-[#303030] rounded-full p-1 text-white hover:bg-gray-500 transition-all duration-300 hover:scale-110 transform"
      >
        {isCollapsed ? <MdKeyboardArrowRight size={20} /> : <MdKeyboardArrowLeft size={20} />}
      </button>

      <div className="p-4">
        <div className="mb-8">
          <h2 className={`text-gray-400 uppercase text-xs font-semibold mb-4 ${isCollapsed ? "hidden" : "block"}`}>
            Administrative
          </h2>
          {adminLinks.map((link) => (
            <div
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`flex items-center cursor-pointer p-3 rounded-lg mb-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${activeLink === link.id ? "bg-[#D62929]" : "hover:bg-gray-500"}`}
            >
              <span className="text-xl transition-transform duration-300 transform group-hover:scale-110">{link.icon}</span>
              <span className={`ml-3 ${isCollapsed ? "hidden" : "block"}`}>{link.name}</span>
            </div>
          ))}
        </div>

        <div>
          <h2 className={`text-gray-400 uppercase text-xs font-semibold mb-4 ${isCollapsed ? "hidden" : "block"}`}>
            Personal
          </h2>
          {personalLinks.map((link) => (
            <div
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`flex items-center cursor-pointer p-3 rounded-lg mb-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${activeLink === link.id ? "bg-[#D62929]" : "hover:bg-gray-500"}`}
            >
              <span className="text-xl transition-transform duration-300 transform group-hover:scale-110">{link.icon}</span>
              <span className={`ml-3 ${isCollapsed ? "hidden" : "block"}`}>{link.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;