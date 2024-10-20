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
  beforeEach(() => {
    render(
      <Router>
        <Signin />
      </Router>
    );
  });

  it("renders the Signin form with inputs and button", () => {
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it("submits the form and shows success message", async () => {
    axios.post.mockResolvedValueOnce({ data: { isAdmin: false } });

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText(/Sign In/i));

    expect(axios.post).toHaveBeenCalledWith("/api/auth/signin", {
      email: "test@example.com",
      password: "password123",
    });

    expect(toast.success).toHaveBeenCalledWith("Signed in successfully!", {
      autoClose: 3000,
    });
  });

  it("shows error message on API failure", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: "Signin failed!" } },
    });

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByText(/Sign In/i));

    expect(toast.error).toHaveBeenCalledWith("Signin failed!", {
      autoClose: 3000,
    });
  });
});
