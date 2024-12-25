"use client";

import React, { useState, useEffect } from "react";
import { FaSearch, FaGlassMartini, FaCreditCard, FaBell, FaExclamationTriangle, FaCheck, FaTrash } from "react-icons/fa";

const NotificationsManagement = () => {
  interface Notification {
    id: number;
    title: string;
    description: string;
    timestamp: string;
    type: string;
    isRead: boolean;
  }
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Mock data initialization
    const mockNotifications = [
      {
        id: 1,
        title: "New Order Received",
        description: "Table 7 ordered 2 Mojitos and 1 Margarita",
        timestamp: "2024-01-20T10:30:00",
        type: "order",
        isRead: false,
      },
      {
        id: 2,
        title: "Payment Successful",
        description: "Payment of $45.99 received from Table 12",
        timestamp: "2024-01-20T10:25:00",
        type: "payment",
        isRead: false,
      },
      {
        id: 3,
        title: "Low Stock Alert",
        description: "Tequila stock is running low. Please reorder.",
        timestamp: "2024-01-20T10:15:00",
        type: "alert",
        isRead: true,
      },
    ];
    setNotifications(mockNotifications);
  }, []);

  const getNotificationIcon = (type: any) => {
    switch (type) {
      case "order":
        return <FaGlassMartini className="text-blue-500" />;
      case "payment":
        return <FaCreditCard className="text-green-500" />;
      case "alert":
        return <FaExclamationTriangle className="text-red-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  const markAsRead = (id: any) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const deleteNotification = (id: any) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const NotificationCard = ({ notification }: any) => (
    <div className={`mb-4 p-4 rounded-lg shadow-lg transition-all duration-300 ${notification.isRead ? "bg-white" : "bg-white"} hover:bg-[#f3f3f3]`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-2 rounded-full bg-white">
            {getNotificationIcon(notification.type)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#303030]">{notification.title}</h3>
            <p className="text-gray-700 mt-1">{notification.description}</p>
            <p className="text-sm text-gray-400 mt-2">
              {new Date(notification.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {!notification.isRead && (
            <button
              onClick={() => markAsRead(notification.id)}
              className="p-2 rounded-full hover:bg-gray-600 text-green-500 transition-colors duration-200"
              aria-label="Mark as read"
            >
              <FaCheck />
            </button>
          )}
          <button
            onClick={() => deleteNotification(notification.id)}
            className="p-2 rounded-full hover:bg-gray-600 text-red-500 transition-colors duration-200"
            aria-label="Delete notification"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f2f2f2] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* <h1 className="text-3xl font-bold text-[#303030] mb-8">Notifications</h1> */}
        
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-[#303030] pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No notifications found
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsManagement;