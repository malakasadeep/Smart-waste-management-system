// src/pages/BinTable.jsx
import React, { useState, useEffect } from "react";

const BinTable = () => {
  const [bins, setBins] = useState([]);

  // Fetch bins data
  useEffect(() => {
    const fetchBins = async () => {
      try {
        const response = await fetch("/api/bin/get"); // Replace with your actual API endpoint
        const data = await response.json();
        setBins(data);
      } catch (error) {
        console.error("Error fetching bins:", error);
      }
    };

    fetchBins();
  }, []);

  // Delete a bin
  const handleDelete = async (binId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bin?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/bin/delete/${binId}`, {
          // Replace with your actual delete API endpoint
          method: "DELETE",
        });

        if (response.ok) {
          // Reload the page after successful deletion
          window.location.reload();
        } else {
          console.error("Failed to delete the bin.");
        }
      } catch (error) {
        console.error("Error deleting bin:", error);
      }
    }
  };

  return (
    <div className="p-20 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">
        Bin List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-slate-200">
            <tr>
              <th className="border-b px-4 py-2 text-left text-gray-600">
                Bin ID
              </th>
              <th className="border-b px-4 py-2 text-left text-gray-600">
                Bin Type
              </th>
              <th className="border-b px-4 py-2 text-left text-gray-600">
                Location (Lat, Lng)
              </th>
              <th className="border-b px-4 py-2 text-left text-gray-600">
                Status
              </th>
              <th className="border-b px-4 py-2 text-left text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bins.length > 0 ? (
              bins.map((bin) => (
                <tr
                  key={bin._id}
                  className="border-b hover:bg-green-50 transition-colors duration-200"
                >
                  <td className="px-4 py-2 text-gray-700">{bin.binId}</td>
                  <td className="px-4 py-2 text-gray-700">{bin.binType}</td>
                  <td className="px-4 py-2 text-gray-700">
                    {bin.location.lat}, {bin.location.lng}
                  </td>
                  <td className="px-4 py-2 text-gray-700">{bin.status}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200"
                      onClick={() => handleDelete(bin._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No bins available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BinTable;
