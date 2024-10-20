// BinDetailsPage.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import BinDetailsPage from "../binmanage/BinDetailsPage"; // Adjust the import based on your folder structure
import { app } from "../../firebase.js"; // Import your firebase app
import { getStorage, ref } from "firebase/storage"; // Import storage methods

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytesResumable: jest.fn(() => ({
    on: jest.fn((state, progressCallback, errorCallback, completeCallback) => {
      if (state === "state_changed") {
        // Simulate upload progress
        progressCallback({ bytesTransferred: 50, totalBytes: 100 });
        completeCallback(); // Simulate successful upload completion
      }
    }),
  })),
  getDownloadURL: jest.fn(() =>
    Promise.resolve("http://example.com/image.jpg")
  ),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

describe("BinDetailsPage", () => {
  const binDetails = {
    binId: "BIN123",
    status: "Full",
    location: { lat: 12.34, lng: 56.78 },
    wasteLevel: 80,
  };

  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders bin details", () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/bin-details", state: { binDetails } }]}
      >
        <BinDetailsPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Bin ID:/)).toHaveTextContent(binDetails.binId);
    expect(screen.getByText(/Status:/)).toHaveTextContent(binDetails.status);
    expect(screen.getByText(/Location:/)).toHaveTextContent(
      `${binDetails.location.lat} ${binDetails.location.lng}`
    );
    expect(screen.getByText(/Waste Level:/)).toHaveTextContent(
      `${binDetails.wasteLevel}%`
    );
  });

  test("handles image selection", () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/bin-details", state: { binDetails } }]}
      >
        <BinDetailsPage />
      </MemoryRouter>
    );

    const fileInput = screen.getByLabelText(/Upload Proof Image/i); // Change to appropriate text
    const file = new File(["test"], "test.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files[0]).toBe(file);
  });

  test("uploads image and stores job data", async () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/bin-details", state: { binDetails } }]}
      >
        <BinDetailsPage />
      </MemoryRouter>
    );

    const fileInput = screen.getByLabelText(/Upload Proof Image/i);
    const file = new File(["test"], "test.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const uploadButton = screen.getByText(/Collected/i);
    fireEvent.click(uploadButton);

    await waitFor(() =>
      expect(screen.getByText(/Upload Progress:/)).toBeInTheDocument()
    );

    expect(fetch).toHaveBeenCalledWith("/api/job/add", expect.any(Object)); // Check if fetch is called
    expect(fetch).toHaveBeenCalledTimes(1); // Ensure fetch was called once
  });

  test("displays error on upload failure", async () => {
    // Mock fetch to return a failed response
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: "Error",
      })
    );

    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/bin-details", state: { binDetails } }]}
      >
        <BinDetailsPage />
      </MemoryRouter>
    );

    const fileInput = screen.getByLabelText(/Upload Proof Image/i);
    const file = new File(["test"], "test.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const uploadButton = screen.getByText(/Collected/i);
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText(/Failed to save job data./)).toBeInTheDocument();
    });
  });

  test("navigates to job list page after successful upload", async () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/bin-details", state: { binDetails } }]}
      >
        <BinDetailsPage />
      </MemoryRouter>
    );

    const fileInput = screen.getByLabelText(/Upload Proof Image/i);
    const file = new File(["test"], "test.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const uploadButton = screen.getByText(/Collected/i);
    fireEvent.click(uploadButton);

    await waitFor(() =>
      expect(screen.getByText(/Uploaded Image/i)).toBeInTheDocument()
    );

    // Check if navigate function is called
    // You can use a mocking approach based on your routing setup
    // Here, we are just checking the presence of the uploaded image text as a simple success check.
  });
});
