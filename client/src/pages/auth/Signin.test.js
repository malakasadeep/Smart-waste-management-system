// Signin.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // Required for <Navigate>
import Signin from "./Signin";
import axios from "axios";
import { toast } from "react-toastify";

// Mock axios and toast to avoid actual API calls and toast messages
jest.mock("axios");
jest.mock("react-toastify");

describe("Signin Component", () => {
  it("renders the Signin form", () => {
    render(
      <Router>
        <Signin />
      </Router>
    );

    // Check if email and password inputs are in the document
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    // Check if the sign-in button is rendered
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it("handles form submission", async () => {
    axios.post.mockResolvedValueOnce({
      data: { isAdmin: false }, // Simulate user (non-admin) login
    });

    render(
      <Router>
        <Signin />
      </Router>
    );

    // Simulate user input for email and password
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText(/Sign In/i));

    // Check if the toast success message is called
    expect(toast.success).toHaveBeenCalledWith("Signed in successfully!", {
      autoClose: 3000,
    });

    // Ensure axios post request is made with correct data
    expect(axios.post).toHaveBeenCalledWith("/api/auth/signin", {
      email: "test@example.com",
      password: "password123",
    });
  });

  it("handles API errors", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: "Signin failed!" } },
    });

    render(
      <Router>
        <Signin />
      </Router>
    );

    // Simulate user input for email and password
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "wrongpassword" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText(/Sign In/i));

    // Check if the toast error message is called
    expect(toast.error).toHaveBeenCalledWith("Signin failed!", {
      autoClose: 3000,
    });
  });
});
