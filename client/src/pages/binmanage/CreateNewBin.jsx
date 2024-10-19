import React, { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyAPcKOA3rdm5EO1cFlnHvI-yEJRepMzF30";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 6.9271,
  lng: 79.8612,
};

const CreateNewBin = () => {
  const [binData, setBinData] = useState({
    binId: "",
    status: "empty",
    location: { lat: "", lng: "" },
    binType: "",
    wasteLevel: 0,
    capacity: "",
    lastEmptied: new Date().toISOString().split("T")[0],
    ownerId: "",
    maintenanceStatus: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "lat" || name === "lng") {
      setBinData((prevData) => ({
        ...prevData,
        location: { ...prevData.location, [name]: value },
      }));
    } else if (type === "checkbox") {
      setBinData((prevData) => ({ ...prevData, [name]: checked }));
    } else {
      setBinData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Handle map click to set location
  const handleMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setBinData((prevData) => ({
      ...prevData,
      location: { lat, lng },
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/bin/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(binData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Bin added successfully");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bin ID</label>
          <input
            type="text"
            name="binId"
            value={binData.binId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Bin Status</label>
          <select name="status" value={binData.status} onChange={handleChange}>
            <option value="empty">Empty</option>
            <option value="full">Full</option>
            <option value="damaged">Damaged</option>
            <option value="awaiting collection">Awaiting Collection</option>
          </select>
        </div>

        <div>
          <label>Bin Type</label>
          <select
            name="binType"
            value={binData.binType}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="recyclable">Recyclable</option>
            <option value="non-recyclable">Non-Recyclable</option>
            <option value="organic">Organic</option>
            <option value="hazardous">Hazardous</option>
          </select>
        </div>

        <div>
          <label>Capacity (kg)</label>
          <input
            type="number"
            name="capacity"
            value={binData.capacity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Waste Level (0-100)</label>
          <input
            type="number"
            name="wasteLevel"
            value={binData.wasteLevel}
            min="0"
            max="100"
            onChange={handleChange}
          />
        </div>

        {/* Display lat and lng */}
        <div>
          <label>Location (Latitude)</label>
          <input
            type="number"
            name="lat"
            value={binData.location.lat}
            onChange={handleChange}
            required
            readOnly
          />
        </div>

        <div>
          <label>Location (Longitude)</label>
          <input
            type="number"
            name="lng"
            value={binData.location.lng}
            onChange={handleChange}
            required
            readOnly
          />
        </div>

        <div>
          <label>Owner ID</label>
          <input
            type="text"
            name="ownerId"
            value={binData.ownerId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Last Emptied</label>
          <input
            type="date"
            name="lastEmptied"
            value={binData.lastEmptied}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Maintenance Status</label>
          <input
            type="checkbox"
            name="maintenanceStatus"
            checked={binData.maintenanceStatus}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Bin</button>
      </form>

      {/* Google Maps Integration */}
      <h3>Select Bin Location</h3>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={12}
          onClick={handleMapClick} // Capture click event on the map
        >
          {binData.location.lat && binData.location.lng && (
            <Marker
              position={{
                lat: parseFloat(binData.location.lat),
                lng: parseFloat(binData.location.lng),
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default CreateNewBin;
