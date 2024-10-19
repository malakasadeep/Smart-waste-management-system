import React, { useState } from "react";
import { QrReader } from "@blackbox-vision/react-qr-reader";

const QrBinScanner = () => {
  const [binDetails, setBinDetails] = useState(null);
  const [scanError, setScanError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [fetchInProgress, setFetchInProgress] = useState(false);

  const fetchBinDetails = async (binId) => {
    try {
      const response = await fetch(`/api/bin/get/${binId}`);
      console.log(binId);

      if (!response.ok) {
        throw new Error(`Failed to fetch bin details for ${binId}`);
      }
      const data = await response.json();
      console.log(data);
      setBinDetails(data);
      setScanning(false);
    } catch (error) {
      setScanError(error.message);
      setScanning(true); // Allow scanning again on error
    } finally {
      setFetchInProgress(false);
      setLoading(false);
    }
  };

  const handleQrScan = (data) => {
    // Only call fetchBinDetails if scanning is true and binDetails is null
    if (scanning && !binDetails) {
      fetchBinDetails(data);
    }
  };

  const handleError = (err) => {
    setScanError(err.message);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Scan QR Code to Fetch Bin Details</h2>

      {scanError && <p style={{ color: "red" }}>Error: {scanError}</p>}

      {scanning &&
        !binDetails && ( // Only render QrReader if scanning is true and no bin details have been fetched
          <div style={{ width: "100%", height: "400px" }}>
            {" "}
            {/* Explicit height for the container */}
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  handleQrScan(result?.text); // Send scanned data to fetch details
                }
                if (!!error) {
                  handleError(error);
                }
              }}
              constraints={{ facingMode: "environment" }} // Use the rear camera
              containerStyle={{ width: "100%", height: "100%" }} // Make sure QrReader takes the full height
            />
          </div>
        )}

      {loading && <p>Loading bin details...</p>}

      {binDetails && (
        <div>
          <h3>Bin Details</h3>
          <p>
            <strong>Bin ID:</strong> {binDetails.binId}
          </p>
          <p>
            <strong>Status:</strong> {binDetails.status}
          </p>
          <p>
            <strong>Location:</strong> {binDetails.location.lat},{" "}
            {binDetails.location.lng}
          </p>
          <p>
            <strong>Type:</strong> {binDetails.binType}
          </p>
          <p>
            <strong>Waste Level:</strong> {binDetails.wasteLevel}%
          </p>
          <p>
            <strong>Capacity:</strong> {binDetails.capacity} kg
          </p>
          <p>
            <strong>Last Emptied:</strong> {binDetails.lastEmptied}
          </p>
          <p>
            <strong>Owner ID:</strong> {binDetails.ownerId}
          </p>
          <p>
            <strong>Maintenance Status:</strong>{" "}
            {binDetails.maintenanceStatus ? "Under Maintenance" : "Operational"}
          </p>
          <p>
            <strong>Notifications:</strong> {binDetails.notifications}
          </p>
        </div>
      )}
    </div>
  );
};

export default QrBinScanner;
