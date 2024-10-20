import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateNewBin from "./CreateNewBin";

import dotenv from "dotenv";
dotenv.config(); // Load environment variables

test("renders CreateNewBin form with step 1 fields", () => {
  render(<CreateNewBin />);

  expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
});

test("should show step 2 when next is clicked", () => {
  render(<CreateNewBin />);

  // Click the "Next" button to navigate to step 2
  fireEvent.click(screen.getByRole("button", { name: /Next/i }));

  // Check if the Step 2 form is displayed
  expect(screen.getByText(/Step 2: Location & Capacity/i)).toBeInTheDocument();
});

test("should go back to step 1 when previous is clicked in step 2", () => {
  render(<CreateNewBin />);

  // Navigate to step 2
  fireEvent.click(screen.getByRole("button", { name: /Next/i }));

  // Click the "Previous" button to navigate back to step 1
  fireEvent.click(screen.getByRole("button", { name: /Previous/i }));

  // Check if the Step 1 form is displayed again
  expect(screen.getByText(/Step 1: Bin Details/i)).toBeInTheDocument();
});
