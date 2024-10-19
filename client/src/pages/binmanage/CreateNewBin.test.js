import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateNewBin from "./CreateNewBin";

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

test("should show step 3 when next is clicked in step 2", () => {
  render(<CreateNewBin />);

  // Navigate to step 2
  fireEvent.click(screen.getByRole("button", { name: /Next/i }));

  // Navigate to step 3
  fireEvent.click(screen.getByRole("button", { name: /Next/i }));

  // Check if the Step 3 form is displayed
  expect(
    screen.getByText(/Step 3: Maintenance & Submission/i)
  ).toBeInTheDocument();

  // Check if Owner ID and Maintenance Needed fields are present
  expect(screen.getByLabelText(/Owner ID/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Maintenance Needed/i)).toBeInTheDocument();
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

test("should handle form submission", async () => {
  render(<CreateNewBin />);

  // Fill out step 1
  fireEvent.change(screen.getByLabelText(/Bin Status/i), {
    target: { value: "full" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Next/i }));

  // Fill out step 2
  fireEvent.change(screen.getByLabelText(/Capacity \(kg\)/i), {
    target: { value: "100" },
  });
  fireEvent.change(screen.getByLabelText(/Waste Level \(0-100\)/i), {
    target: { value: "50" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Next/i }));

  // Fill out step 3
  fireEvent.change(screen.getByLabelText(/Owner ID/i), {
    target: { value: "owner123" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

  // Check if the submission handling works correctly (you can mock the fetch call for more detailed testing)
  expect(screen.getByText(/Bin added successfully/i)).toBeInTheDocument();
});
