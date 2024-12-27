import React, { useState, useEffect } from "react";

const TransactionHistory = ({ orderId }: any) => {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderHistoryData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/transaction/fetchHistory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: orderId }),
        });

        if (response.ok) {
          const data = await response.json();
          setHistoryData(data.items);
          console.log("History fetched successfully!", data.items);
        } else {
          const errorData = await response.json();
          setError(`Error: ${errorData.message || "Failed to fetch history"}`);
          console.error("Error fetching history:", errorData);
        }
      } catch (error) {
        setError("An unexpected error occurred.");
        console.error("Error fetching history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrderHistoryData();
    }
  }, [orderId]); // Dependency array includes orderId to refetch on change

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-[70%] max-h-[80%] overflow-auto w-full mx-4">
            {isLoading ? (
                <p>Loading history...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : historyData.length > 0 ? (
                <div>
                <h3>Transaction History for Order #{orderId}</h3>
                <ul>
                    {historyData.map((history: any, index: number) => (
                    <li key={index}>
                        <p>
                        <strong>Date:</strong> {history.changed_at}
                        </p>
                        <p>
                        {/* <strong>Action:</strong> {history.action} */}
                        </p>
                    </li>
                    ))}
                </ul>
                </div>
            ) : (
                <p>No history available for this order.</p>
            )}
        </div>
    </div>
  );
};

export default TransactionHistory;
