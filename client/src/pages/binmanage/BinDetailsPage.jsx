import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";

const BinDetailsPage = () => {
  const location = useLocation();
  const { binDetails } = location.state || {}; // Get the bin details passed via state
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); // Progress state
  const [jobId, setJobId] = useState(
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
          console.log("Download URL:", downloadURL);
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
      jobId: jobId,
      binId: binDetails.binId, // Use the binId from binDetails
      proofImageUrl: proofImageUrl,
      collectedAt: new Date(), // Current date
    };

    try {
      const response = await fetch("/api/job/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Job data saved:", result);
        alert("Job data saved successfully!");
        navigate("/admin/job");
      } else {
        console.error("Error saving job data:", response.statusText);
        alert("Failed to save job data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving job data.");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 shadow-md rounded-md w-full max-w-xl">
        <h3 className="text-2xl font-semibold mb-4 text-center">Bin Details</h3>
        <p className="mb-2">
          <strong>Bin ID:</strong> {binDetails?.binId}
        </p>
        <p className="mb-2">
          <strong>Status:</strong> {binDetails?.status}
        </p>
        <p className="mb-2">
          <strong>Location:</strong> {binDetails?.location?.lat},{" "}
          {binDetails?.location?.lng}
        </p>
        <p className="mb-4">
          <strong>Waste Level:</strong> {binDetails?.wasteLevel}%
        </p>

        <div className="mb-4">
          <label htmlFor="proofImage">Upload Proof Image</label>
          <input
            id="proofImage"
            type="file"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={handleImageChange}
          />
          <button
            className={`mt-4 w-full px-4 py-2 text-white font-semibold rounded-md transition ${
              uploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Confirming..." : "Collected"}
          </button>
        </div>

        {uploading && (
          <p className="text-blue-500 text-sm mb-4">
            Upload Progress: {Math.round(uploadProgress)}%
          </p>
        )}

        {imageUrl && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Uploaded Image</h3>
            <img
              src={imageUrl}
              alt="Uploaded proof"
              className="w-64 h-auto rounded-md shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BinDetailsPage;
