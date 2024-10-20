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
  });

  test("renders and submits the form successfully", async () => {
    // Mock successful fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({}),
    });

    render(<ScheduleModal onClose={mockClose} />);

    // Fill in the form with valid data
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
    fireEvent.click(screen.getByLabelText(/I agree to the terms/i));

    // Submit the form
    fireEvent.click(screen.getByText(/Schedule Collection/i));

    // Ensure that fetch was called with the correct payload
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/sp-col/",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );

    // Ensure the success toast is shown and modal is closed
    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith(
        "Collection scheduled successfully!"
      )
    );
    expect(mockClose).toHaveBeenCalled();
  });

  test("shows error message when required fields are missing", async () => {
    render(<ScheduleModal onClose={mockClose} />);

    // Try submitting the form without any input
    fireEvent.click(screen.getByText(/Schedule Collection/i));

    // Check that the required field validation errors are shown
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

    // Ensure the fetch was not called
    await waitFor(() => expect(fetch).not.toHaveBeenCalled());
  });

  test("shows error toast when API call fails", async () => {
    // Mock failed fetch response
    fetch.mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({}),
    });

    render(<ScheduleModal onClose={mockClose} />);

    // Fill in the form with valid data
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
    fireEvent.click(screen.getByLabelText(/I agree to the terms/i));

    // Submit the form
    fireEvent.click(screen.getByText(/Schedule Collection/i));

    // Ensure that fetch was called
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Ensure the error toast is shown and modal is not closed
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("Error scheduling collection")
      )
    );
    expect(mockClose).not.toHaveBeenCalled();
  });
});

// Positive Test (renders and submits the form successfully):

// Mocks a successful API call.
// Fills in the form with valid data.
// Submits the form and checks if the API call is made and if the success toast and modal close actions are triggered.

// Negative Test (shows error message when required fields are missing):

// Tries to submit the form without filling any fields.
// Asserts that all validation errors appear.
// Ensures the API call is not made.

// Negative Test (shows error toast when API call fails):

// Mocks a failed API response.
// Fills in the form with valid data.
// Submits the form and ensures that an error toast is shown, but the modal is not closed.
