import mongoose from "mongoose";

const BinBug = new mongoose.Schema({
  compId: {
    type: String,
    required: true,
  },
  binId: {
    type: String,
  },
  proofImageUrl: {
    type: String,
  },
  collectedAt: {
    type: Date,
    default: Date.now,
  },
});

const binbug = mongoose.model("BinBug", BinBug);
export default binbug;
