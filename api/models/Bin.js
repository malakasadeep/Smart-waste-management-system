import mongoose from "mongoose";

const BinSchema = new mongoose.Schema({
  binId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["empty", "full", "damaged", "awaiting collection"],
    default: "empty",
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  binType: {
    type: String,
  },
  wasteLevel: {
    type: Number,
    default: 0,
  },
  capacity: {
    type: Number,
    required: true,
  },
  lastEmptied: {
    type: Date,
    default: Date.now,
  },
  ownerId: {
    type: String,
  },
  maintenanceStatus: {
    type: Boolean,
    default: false,
  },
});

const Bin = mongoose.model("Bin", BinSchema);
export default Bin;
