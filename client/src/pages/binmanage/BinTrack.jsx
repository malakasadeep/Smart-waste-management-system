import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { IoTrashBin } from "react-icons/io5"; // Import the trash bin icon from React Icons
import "./BinTrack.css"; // Import your CSS for custom styles (if needed)

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
  const [hoveredBin, setHoveredBin] = useState(null); // State to track the hovered bin

  // Fetch bins data (dummy API for example)
  useEffect(() => {
    const fetchBins = async () => {
      const response = await fetch("/api/bin/get");
      const data = await response.json();
      setBins(data);
      console.log(data);
    };

    fetchBins();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-16">
      <h2 className="text-2xl font-bold mb-4">Trash Bin Locations</h2>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        libraries={["geometry"]}
      >
        {" "}
        {/* Load geometry library */}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={12}
        >
          {bins.map((bin) => (
            <Marker
              key={bin.binId}
              position={{ lat: bin.location.lat, lng: bin.location.lng }}
              onMouseOver={() => setHoveredBin(bin)} // Set hovered bin on mouse over
              onMouseOut={() => setHoveredBin(null)} // Reset hovered bin on mouse out
              icon={{
                url:
                  "data:image/svg+xml;charset=UTF-8," +
                  encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                      <path fill="green" d="M3 6v2h18V6h-3V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2H3zm3 4h12v12H6V10zm4 2v8h4v-8h-4z"/>
                    </svg>
                  `),
                scaledSize: new window.google.maps.Size(30, 30), // Adjust size as needed
              }}
            >
              <div className="custom-marker flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md cursor-pointer hover:bg-gray-200">
                <IoTrashBin size={24} color="green" />
              </div>
            </Marker>
          ))}
          {/* Tooltip to display bin data */}
          {hoveredBin && (
            <div
              className="tooltip absolute bg-white border border-gray-300 rounded p-2 shadow-lg"
              style={{
                left: `${hoveredBin.location.lng}px`, // Adjust position for the tooltip
                top: `${hoveredBin.location.lat}px`, // Adjust position for the tooltip
              }}
            >
              <h4 className="font-bold">{hoveredBin.binType}</h4>
              <p>Bin ID: {hoveredBin.binId}</p>
              {/* Add any additional bin data here */}
            </div>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default BinTrack;
