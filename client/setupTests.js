import dotenv from "dotenv";
dotenv.config(); // Load environment variables

import "@testing-library/jest-dom"; // For extended matchers

// Mock Firebase storage functions if necessary
jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytesResumable: jest.fn(() => ({
    on: jest.fn((event, progress, complete) => {
      if (event === "state_changed") {
        complete(); // Simulate successful upload
      }
    }),
  })),
  getDownloadURL: jest.fn(() => Promise.resolve("mocked-download-url")),
}));

// Mock your firebase configuration
jest.mock("./src/firebase.js", () => ({
  app: {}, // Mock the app object as necessary
}));
