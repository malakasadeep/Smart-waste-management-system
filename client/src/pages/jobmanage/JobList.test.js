// src/pages/jobmanage/JobList.test.js

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import JobList from "../jobmanage/JobList"; // Adjust the import based on your folder structure

// Mocking the fetch function globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          jobId: "JOB001",
          binId: "BIN123",
          proofImageUrl: "http://example.com/image.jpg",
          collectedAt: new Date().toISOString(),
        },
        {
          jobId: "JOB002",
          binId: "BIN456",
          proofImageUrl: "http://example.com/image2.jpg",
          collectedAt: new Date().toISOString(),
        },
      ]),
  })
);

describe("JobList", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders loading state initially", () => {
    render(
      <MemoryRouter>
        <JobList />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading jobs.../)).toBeInTheDocument();
  });

  test("is successfully fetching data", async () => {
    render(
      <MemoryRouter>
        <JobList />
      </MemoryRouter>
    );

    // Wait for the job list to be populated
    await waitFor(() => {
      expect(screen.getByText(/Recent Done Jobs/)).toBeInTheDocument();
    });

    // Check if job details are displayed
    expect(screen.getByText(/JOB001/)).toBeInTheDocument();
    expect(screen.getByText(/BIN123/)).toBeInTheDocument();

    // Use getAllByText to handle multiple "View Image" links
    const viewImageLinks = screen.getAllByText(/View Image/);
    expect(viewImageLinks).toHaveLength(2); // Check if two links are present

    expect(screen.getByText(/Collected At/)).toBeInTheDocument();
  });

  test("handles error state", async () => {
    // Mocking fetch to simulate an error
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: "Error",
      })
    );

    render(
      <MemoryRouter>
        <JobList />
      </MemoryRouter>
    );

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.getByText(/Error: Failed to fetch jobs/)
      ).toBeInTheDocument();
    });
  });
});
