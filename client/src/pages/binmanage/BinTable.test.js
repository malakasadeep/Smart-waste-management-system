// src/pages/BinTable.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BinTable from "./BinTable";

// Mock fetch to avoid actual API calls
global.fetch = jest.fn();

describe("BinTable Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders bin list correctly", async () => {
    // Mock the fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          _id: "1",
          binId: "Bin1",
          binType: "Type A",
          location: { lat: 12.34, lng: 56.78 },
          status: "Active",
        },
        {
          _id: "2",
          binId: "Bin2",
          binType: "Type B",
          location: { lat: 23.45, lng: 67.89 },
          status: "Inactive",
        },
      ],
    });

    render(<BinTable />);

    // Wait for bins to be displayed
    const bin1 = await screen.findByText("Bin1");
    const bin2 = await screen.findByText("Bin2");

    expect(bin1).toBeInTheDocument();
    expect(bin2).toBeInTheDocument();
  });

  test("handles delete action", async () => {
    // Mock the fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          _id: "1",
          binId: "Bin1",
          binType: "Type A",
          location: { lat: 12.34, lng: 56.78 },
          status: "Active",
        },
      ],
    });

    render(<BinTable />);

    // Wait for the bin to be displayed
    const deleteButton = await screen.findByText("Delete");
    
    // Confirm delete action
    jest.spyOn(window, "confirm").mockImplementation(() => true);
    
    // Mock delete fetch call
    fetch.mockResolvedValueOnce({ ok: true });

    fireEvent.click(deleteButton);

    // Check if the fetch function was called with the correct URL
    expect(fetch).toHaveBeenCalledWith("/api/bin/delete/1", { method: "DELETE" });
    
    // Clean up
    window.confirm.mockRestore();
  });

  test("shows message when no bins are available", async () => {
    // Mock fetch to return no bins
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<BinTable />);

    // Wait for no bins message
    const noBinsMessage = await screen.findByText("No bins available.");
    expect(noBinsMessage).toBeInTheDocument();
  });
});
