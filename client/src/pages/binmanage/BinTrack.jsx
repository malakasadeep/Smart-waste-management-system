import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyAPcKOA3rdm5EO1cFlnHvI-yEJRepMzF30";

// Map container styles
const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

// Default center of the map (for initial view)
const defaultCenter = {
  lat: 6.9271, // Default lat (example: Colombo, Sri Lanka)
  lng: 79.8612, // Default lng
};

const BinTrack = () => {
  const [bins, setBins] = useState([]);

  // Fetch bins data (dummy API for example)
  useEffect(() => {
    // Replace with your API call to fetch bins
    const fetchBins = async () => {
      const response = await fetch("/api/bin/get");
      const data = await response.json();
      setBins(data);
    };

    fetchBins();
  }, []);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={12}
      >
        {bins.map((bin) => (
          <Marker
            key={bin.binId}
            position={{ lat: bin.location.lat, lng: bin.location.lng }}
            label={bin.binType} // Display bin type as marker label
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default BinTrack;
