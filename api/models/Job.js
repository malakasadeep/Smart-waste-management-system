import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true,
  },
  binId: {
    type: String,
    required: true,
  },
  proofImageUrl: {
    type: String,
  },
  collectedAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", JobSchema);
export default Job;
