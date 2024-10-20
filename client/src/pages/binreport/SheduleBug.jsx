import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";

const SheduleBug = () => {
  const location = useLocation();
  const { binDetails } = location.state || {}; // Get the bin details passed via state
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); // Progress state
  const [compId, setcompId] = useState(
    "JOB_" + Math.random().toString(36).substr(2, 9)
  ); // Example job ID, generate your own or handle it accordingly
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    const storage = getStorage(app);
    const storageRef = ref(storage, `item_images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (uploadError) => {
        console.error("Error uploading image:", uploadError);
        alert("Error uploading image.");
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(downloadURL);
          await storeJobData(downloadURL); // Call to store job data
          setUploading(false);
        } catch (error) {
          console.error("Error getting download URL:", error);
          alert("Error getting the download URL.");
          setUploading(false);
        }
      }
    );
  };

  const storeJobData = async (proofImageUrl) => {
    const jobData = {
      compId: compId,
      binId: binDetails.binId, // Use the binId from binDetails
      proofImageUrl: proofImageUrl,
      collectedAt: new Date(), // Current date
    };

    try {
      const response = await fetch("/api/binbug/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Complaint registered successfully!");
        navigate("/admin/allbug");
      } else {
        alert("Failed to register the complaint.");
      }
    } catch (error) {
      alert("Error saving complaint.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-2xl">
        <h3 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Report Bin Issue
        </h3>
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-600">
            <span className="text-gray-800">Bin ID:</span> {binDetails?.binId}
          </p>
          <p className="text-lg font-semibold text-gray-600">
            <span className="text-gray-800">Status:</span> {binDetails?.status}
          </p>
          <p className="text-lg font-semibold text-gray-600">
            <span className="text-gray-800">Location:</span>{" "}
            {binDetails?.location?.lat}, {binDetails?.location?.lng}
          </p>
          <p className="text-lg font-semibold text-gray-600">
            <span className="text-gray-800">Waste Level:</span>{" "}
            {binDetails?.wasteLevel}%
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="proofImage"
            className="block text-gray-700 font-semibold mb-2"
          >
            Upload Proof Image
          </label>
          <input
            id="proofImage"
            type="file"
            className="block w-full text-sm text-gray-600 file:py-2 file:px-4 file:rounded-md file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
            onChange={handleImageChange}
          />
          <button
            className={`mt-4 w-full px-4 py-2 text-white font-semibold rounded-md transition-all ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Submit Complaint"}
          </button>
        </div>

        {uploading && (
          <p className="text-blue-600 text-center text-sm mb-4">
            Upload Progress: {Math.round(uploadProgress)}%
          </p>
        )}

        {imageUrl && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Uploaded Proof Image
            </h3>
            <img
              src={imageUrl}
              alt="Uploaded proof"
              className="mx-auto w-64 h-auto rounded-md shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SheduleBug;
