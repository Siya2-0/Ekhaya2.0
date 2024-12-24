import React, { useState, useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const OrderSuccessModal = () => {
  const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const handleEscape = (e: any) => {
//       if (e.key === "Escape") {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       setIsVisible(true);
//       document.addEventListener("keydown", handleEscape);
//     }

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const handleOverlayClick = (e: any) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

  return (
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
            Payment Successful!
          </h2>
          <p className="mb-6 text-center text-gray-600">
            Congratulations! Your payment was successful.
          </p>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <button
            //   onClick={onNewOrder}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              New Order
            </button>
            <button
            //   onClick={onViewOrders}
              className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
