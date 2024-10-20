import Job from "../models/Job.js";

class JobRepository {
  async create(jobData) {
    const job = new Job(jobData);
    return await job.save();
  }

  async findById(jobId) {
    return await Job.findOne({ jobId });
  }

  async findAll(query) {
    return await Job.find(query);
  }

  async delete(jobId) {
    return await Job.findOneAndDelete({ jobId });
  }
}

export default new JobRepository();
