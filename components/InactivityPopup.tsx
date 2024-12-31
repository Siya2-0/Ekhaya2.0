import React, { useState, useEffect } from 'react';
import { signOut } from "../app/Restapi/restapi"
const InactivityPopup = () => {
  const [isInactive, setIsInactive] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;
    let countdownTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      clearInterval(countdownTimer);
      setIsInactive(false);
      setCountdown(10);
      inactivityTimer = setTimeout(() => {
        setIsInactive(true);
        countdownTimer = setInterval(() => {
          setCountdown((prev) => {
            if (prev === 1) {
              clearInterval(countdownTimer);
              // Add your sign-out logic here if needed
              signOut();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 60000); // 60 seconds of inactivity
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);

    resetTimer(); // Initialize the timer

    return () => {
      clearTimeout(inactivityTimer);
      clearInterval(countdownTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
    };
  }, []);

  const handleStay = () => {
    setIsInactive(false);
    setCountdown(10);
  };

  const handleSignOut = () => {
    // Add your sign-out logic here
    signOut()
    setIsInactive(false);
    setCountdown(10);
  };

  return (
    <div>
      {isInactive && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p className="text-lg">Are you still there?</p>
            <p className="text-lg">Signing out in {countdown} seconds...</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="p-2 bg-blue-500 text-white rounded"
                onClick={handleStay}
              >
                Stay
              </button>
              <button
                className="p-2 bg-red-500 text-white rounded"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InactivityPopup;