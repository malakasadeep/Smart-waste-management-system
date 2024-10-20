// jobRepository.js
import Job from "./JobModel.js"; // Import the Mongoose model

class JobRepository {
  // Create a new job
  async createJob(jobData) {
    try {
      const job = new Job(jobData);
      return await job.save();
    } catch (error) {
      throw new Error(`Unable to create job: ${error.message}`);
    }
  }

  // Find job by ID
  async getJobById(jobId) {
    try {
      return await Job.findOne({ jobId });
    } catch (error) {
      throw new Error(`Unable to find job with ID ${jobId}: ${error.message}`);
    }
  }

  // Get all jobs
  async getAllJobs() {
    try {
      return await Job.find({});
    } catch (error) {
      throw new Error(`Unable to retrieve jobs: ${error.message}`);
    }
  }

  // Delete a job by ID
  async deleteJob(jobId) {
    try {
      return await Job.findOneAndDelete({ jobId });
    } catch (error) {
      throw new Error(`Unable to delete job: ${error.message}`);
    }
  }
}

export default new JobRepository();
