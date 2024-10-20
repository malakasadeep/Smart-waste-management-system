import JobRepository from "../repositories/JobRepository.js";

class JobService {
  async createJob(jobData) {
    const existingJob = await JobRepository.findById(jobData.jobId);
    if (existingJob) {
      throw new Error("Job already exists");
    }
    return await JobRepository.create(jobData);
  }

  async uploadProof(jobId, proofImageUrl) {
    const job = await JobRepository.findById(jobId);
    if (!job) {
      throw new Error("Job not found");
    }
    job.proofImageUrl = proofImageUrl;
    job.collectedAt = Date.now(); // Update collectedAt to current date
    return await job.save();
  }

  async getJobs(query) {
    return await JobRepository.findAll(query);
  }

  async deleteJob(jobId) {
    const job = await JobRepository.delete(jobId);
    if (!job) {
      throw new Error("Job not found");
    }
    return job;
  }
}

export default new JobService();
