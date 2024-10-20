import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

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

  const [currentStep, setCurrentStep] = useState(1);
  const searchBoxRef = useRef(null);
  const mapRef = useRef(null);

  // Function to generate a unique bin ID
  const generateBinId = () => `BIN-${Date.now()}`;

  useEffect(() => {
    // Automatically generate bin ID when the component mounts
    setBinData((prevData) => ({
      ...prevData,
      binId: generateBinId(),
    }));
  }, []);

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

  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const handlePrevStep = () => setCurrentStep((prevStep) => prevStep - 1);

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
        alert("Error: " + (data.message || "Unknown error occurred"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while adding the bin. Please try again.");
    }
  };

  const handleMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setBinData((prevData) => ({
      ...prevData,
      location: { lat, lng },
    }));
  }, []);

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length === 0) return;

    const place = places[0];
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setBinData((prevData) => ({
      ...prevData,
      location: { lat, lng },
    }));

    mapRef.current.panTo({ lat, lng });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <>
            <h3 className="text-lg font-medium text-gray-700">
              Step 1: Bin Details
            </h3>
            <div>
              <label
                htmlFor="binId"
                className="block text-sm font-medium text-gray-700"
              >
                Bin ID
              </label>
              <input
                type="text"
                name="binId"
                value={binData.binId}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                name="status"
                value={binData.status}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="empty">Empty</option>
                <option value="full">Full</option>
                <option value="damaged">Damaged</option>
                <option value="awaiting collection">Awaiting Collection</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleNextStep}
              className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </button>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h3 className="text-lg font-medium text-gray-700">
              Step 2: Location & Capacity
            </h3>
            <div>
              <label
                htmlFor="capacity"
                className="block text-sm font-medium text-gray-700"
              >
                Capacity (Kg)
              </label>
              <input
                type="number"
                name="capacity"
                value={binData.capacity}
                onChange={handleChange}
                required
                min="1" // Ensure capacity is at least 1 Kg
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="wasteLevel"
                className="block text-sm font-medium text-gray-700"
              >
                Waste Level
              </label>
              <input
                type="number"
                name="wasteLevel"
                value={binData.wasteLevel}
                min="0"
                max="100"
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Location selection using Google Maps */}
            <h3 className="text-lg font-medium text-gray-700">
              Select Bin Location
            </h3>
            <LoadScript
              googleMapsApiKey={GOOGLE_MAPS_API_KEY}
              libraries={["places"]}
            >
              <StandaloneSearchBox
                onLoad={(ref) => (searchBoxRef.current = ref)}
                onPlacesChanged={handlePlacesChanged}
              >
                <input
                  type="text"
                  placeholder="Search location..."
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                />
              </StandaloneSearchBox>

              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={defaultCenter}
                zoom={12}
                onClick={handleMapClick}
                onLoad={(map) => (mapRef.current = map)}
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

            <div className="mt-4 flex justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <h3 className="text-lg font-medium text-gray-700">
              Step 3: Maintenance & Submission
            </h3>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="maintenanceStatus"
                  checked={binData.maintenanceStatus}
                  onChange={handleChange}
                  className="mr-2"
                />
                Maintenance Needed
              </label>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Previous
              </button>
              <button
                type="submit"
                className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CreateNewBin;
