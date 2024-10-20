import React, { useState } from "react";
import { QrReader } from "@blackbox-vision/react-qr-reader";
import { useNavigate } from "react-router-dom";

const BinScan = () => {
  const [scanError, setScanError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(true);
  const navigate = useNavigate();

  const fetchBinDetails = async (binId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/bin/get/${binId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch bin details for ${binId}`);
      }
      const data = await response.json();

      // Navigate to the BinDetailsPage and pass the bin details as state
      navigate("/bin-bug", { state: { binDetails: data } });
    } catch (error) {
      setScanError(error.message);
      setScanning(true); // Allow scanning again on error
    } finally {
      setLoading(false);
    }
  };

  const handleQrScan = (data) => {
    if (scanning) {
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

      {scanning && (
        <div style={{ width: "200px", height: "200px", margin: "0 auto" }}>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                handleQrScan(result?.text);
              }
              if (!!error) {
                handleError(error);
              }
            }}
            constraints={{ facingMode: "environment" }}
            containerStyle={{ width: "200px", height: "200px" }} // Set to 200px
          />
        </div>
      )}
      {loading && <p>Loading bin details...</p>}
    </div>
  );
};

export default BinScan;
