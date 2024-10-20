import React from 'react'; // Import React
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ScheduleModal from "./ScheduleModal"; // Import your component
import "@testing-library/jest-dom"; // Optional, for matchers like `toBeInTheDocument`

describe("ScheduleModal", () => {
  it("renders and submits the form successfully", async () => {
    const mockSubmit = jest.fn();

    render(<ScheduleModal onClose={mockSubmit} />);

    // Fill in the form with valid data
    fireEvent.change(screen.getByLabelText(/Collection Date/i), {
      target: { value: "2024-10-20" },
    });

    // Fill in other required fields
    fireEvent.change(screen.getByLabelText(/Collection Type/i), {
      target: { value: "Standard Waste" },
    });
    fireEvent.change(screen.getByLabelText(/Time Slot/i), {
      target: { value: "Morning" },
    });
    fireEvent.change(screen.getByLabelText(/Waste Description/i), {
      target: { value: "Household waste" },
    });
    fireEvent.change(screen.getByLabelText(/Pickup Address/i), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "0123456789" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Payment Method/i), {
      target: { value: "Online Payment" },
    });
    
    // Agree to terms
    fireEvent.click(screen.getByLabelText(/I agree to the terms and conditions/i));

    // Submit the form
    const submitButton = screen.getByText(/Schedule Collection/i);
    fireEvent.click(submitButton);

    // Wait for the mock submit function to be called
    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
  });

  it("shows error messages when required fields are not filled", async () => {
    const mockSubmit = jest.fn();

    render(<ScheduleModal onClose={mockSubmit} />);

    // Submit the form without filling any fields
    const submitButton = screen.getByText(/Schedule Collection/i);
    fireEvent.click(submitButton);

    // Check for error messages
    expect(await screen.findByText(/Collection type is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Collection date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Time slot is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Waste description is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Pickup address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment method is required/i)).toBeInTheDocument();
    expect(screen.getByText(/You must agree to the terms/i)).toBeInTheDocument();
  });

  it("calls the onClose function when canceled", () => {
    const mockClose = jest.fn();

    render(<ScheduleModal onClose={mockClose} />);

    // Click the cancel button
    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);

    // Check if the onClose function was called
    expect(mockClose).toHaveBeenCalled();
  });
});
