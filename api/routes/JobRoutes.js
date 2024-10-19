import express from "express";
import {
  createJob,
  uploadProof,
  getJobs,
  deleteJob,
} from "../controllers/JobController.js";

const router = express.Router();

// Create a new job
router.post("/add", createJob);

// Update job with proof image
router.put("/jobs/:jobId/proof", uploadProof);

// Get jobs by query parameters (jobId or binId)
router.get("/get", getJobs);

// Delete a job by jobId
router.delete("/jobs/:jobId", deleteJob);

export default router;
