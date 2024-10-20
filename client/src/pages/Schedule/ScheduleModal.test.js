// ScheduleModal.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ScheduleModal from "./ScheduleModal";
import { toast } from "react-hot-toast";

// Mock fetch and toast
global.fetch = jest.fn();
jest.mock("react-hot-toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockClose = jest.fn();

describe("ScheduleModal", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks between tests
    render(<ScheduleModal onClose={mockClose} />); // Render modal for each test
  });

  test("submits the form successfully", async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    fillForm(); // Helper function to fill the form

    fireEvent.click(screen.getByText(/Schedule Collection/i)); // Click submit button

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1); // Check if fetch was called
      expect(toast.success).toHaveBeenCalledWith(
        "Collection scheduled successfully!"
      ); // Check success toast
      expect(mockClose).toHaveBeenCalled(); // Check if modal closed
    });
  });

  test("shows error messages when required fields are missing", async () => {
    fireEvent.click(screen.getByText(/Schedule Collection/i)); // Click submit without filling form

    expect(
      screen.getByText(/Collection type is required/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Collection date is required/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Time slot is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Waste description is required/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Pickup address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment method is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/You must agree to the terms/i)
    ).toBeInTheDocument();

    await waitFor(() => expect(fetch).not.toHaveBeenCalled()); // Ensure fetch was not called
  });

  test("shows error toast when API call fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    fillForm(); // Fill the form with valid data
    fireEvent.click(screen.getByText(/Schedule Collection/i)); // Click submit button

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1); // Check if fetch was called
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("Error scheduling collection")
      ); // Check error toast
      expect(mockClose).not.toHaveBeenCalled(); // Ensure modal is not closed
    });
  });

  // Helper function to fill the form fields
  function fillForm() {
    fireEvent.change(screen.getByLabelText(/Collection Type/i), {
      target: { value: "Standard Waste" },
    });
    fireEvent.change(screen.getByLabelText(/Collection Date/i), {
      target: { value: "2024-10-25" },
    });
    fireEvent.change(screen.getByLabelText(/Time Slot/i), {
      target: { value: "Morning" },
    });
    fireEvent.change(screen.getByLabelText(/Waste Description/i), {
      target: { value: "General waste from household" },
    });
    fireEvent.change(screen.getByLabelText(/Pickup Address/i), {
      target: { value: "123 Waste Street" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Payment Method/i), {
      target: { value: "Online Payment" },
    });
    fireEvent.click(screen.getByLabelText(/I agree to the terms/i)); // Agree to terms
  }
});
