import JobService from "../services/JobService.js";

export const createJob = async (req, res) => {
  try {
    const job = await JobService.createJob(req.body);
    return res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(400).json({ error: error.message });
  }
};

export const uploadProof = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { proofImageUrl } = req.body;
    const job = await JobService.uploadProof(jobId, proofImageUrl);
    return res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(400).json({ error: error.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const { jobId, binId } = req.query;
    const query = {};
    if (jobId) query.jobId = jobId;
    if (binId) query.binId = binId;
    const jobs = await JobService.getJobs(query);
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ error: "Error fetching jobs" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await JobService.deleteJob(jobId);
    return res.status(200).json({ message: "Job deleted successfully", job });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(400).json({ error: error.message });
  }
};
