import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UserProfile from "./UserProfile";
import "@testing-library/jest-dom/extend-expect"; // for the additional matchers

describe("UserProfile Component", () => {
  beforeEach(() => {
    render(<UserProfile />);
  });

  test("renders user profile header", () => {
    const header = screen.getByText(/John Doe's Profile/i);
    expect(header).toBeInTheDocument();
  });

  test("toggles editing state when Edit Profile button is clicked", () => {
    const editButton = screen.getByRole("button", { name: /Edit Profile/i });

    // Initially, the profile should be in view mode
    expect(screen.queryByLabelText(/Email:/i)).toBeInTheDocument();

    // Click the edit button
    fireEvent.click(editButton);

    // After clicking, the input fields should be visible
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();

    // Click the cancel button
    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelButton);

    // After clicking, the input fields should not be visible
    expect(screen.queryByLabelText(/Email:/i)).not.toBeInTheDocument();
  });

  test("opens schedule modal when Create New Schedule button is clicked", () => {
    const createScheduleButton = screen.getByRole("button", {
      name: /Create New Schedule/i,
    });

    // Click the Create New Schedule button
    fireEvent.click(createScheduleButton);

    // Check if Schedule Modal is rendered (You may want to adjust the expectation based on how ScheduleModal renders)
    const modal = screen.getByText(/Schedule Modal Title/i); // Adjust this to match actual text inside your modal
    expect(modal).toBeInTheDocument();
  });

  test("deletes collection when delete button is clicked", async () => {
    const deleteButton = screen.getByRole("button", { name: /Delete/i });

    // Click the delete button
    fireEvent.click(deleteButton);

    // Here, you would need to mock the API call to ensure the state updates
    // Expect the collection to be removed (implementing the expected behavior will require more logic)
    // You may need to re-render the component or check the state here.
  });

  test("opens report issue page when Report Issue button is clicked", () => {
    const reportButton = screen.getByRole("button", { name: /Report Issue/i });

    // Click the Report Issue button
    fireEvent.click(reportButton);

    // Check if the URL changes or if it redirects correctly (you may need to use a mock for routing)
    // This part depends on how your routing is implemented.
  });

  test("deletes account when Delete Account button is clicked", () => {
    const deleteAccountButton = screen.getByRole("button", {
      name: /Delete Account/i,
    });

    // Click the Delete Account button
    fireEvent.click(deleteAccountButton);

    // Here, you would also need to mock the API call and check for the confirmation or any further actions
    // You might want to check if a confirmation dialog appears or if the user is redirected.
  });
});
