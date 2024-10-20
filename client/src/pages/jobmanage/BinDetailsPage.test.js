import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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
        progressCallback({ bytesTransferred: 100, totalBytes: 100 });
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

    expect(screen.getByText(/Bin ID:/)).toBeInTheDocument();
    
    expect(screen.getByText(/Status:/)).toBeInTheDocument();
    
    expect(screen.getByText(/Location:/)).toBeInTheDocument();

    expect(screen.getByText(/Waste Level:/)).toBeInTheDocument();
  });

  test("handles image selection", () => {
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

    expect(fileInput.files[0]).toBe(file);
  });
});
