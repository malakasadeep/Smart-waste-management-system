import mongoose from "mongoose";
import Job from "../models/Job.js";

// Create a new job
export const createJob = async (req, res) => {
  try {
    const { jobId, binId } = req.body;

    // Check if job already exists
    const existingJob = await Job.findOne({ jobId });
    if (existingJob) {
      return res.status(400).json({ error: "Job already exists" });
    }

    const job = new Job(req.body);

    await job.save();
    return res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({ error: "Error creating job" });
  }
};

// Update job with proof image
export const uploadProof = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { proofImageUrl } = req.body;

    const job = await Job.findOne({ jobId });
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    job.proofImageUrl = proofImageUrl;
    job.collectedAt = Date.now(); // Update collectedAt to current date
    await job.save();

    return res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({ error: "Error updating job" });
  }
};

// Get jobs based on jobId or binId
export const getJobs = async (req, res) => {
  try {
    const { jobId, binId } = req.query;

    const query = {};
    if (jobId) query.jobId = jobId;
    if (binId) query.binId = binId;

    const jobs = await Job.find(query);
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ error: "Error fetching jobs" });
  }
};

// Delete a job by jobId
export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findOneAndDelete({ jobId });
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    return res.status(200).json({ message: "Job deleted successfully", job });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({ error: "Error deleting job" });
  }
};
