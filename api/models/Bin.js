import mongoose from "mongoose";

const BinSchema = new mongoose.Schema({
  binId: {
    type: String,
    required: true,
    unique: true,
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
    enum: ["recyclable", "non-recyclable", "organic", "hazardous"],
    required: true,
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

    required: true,
  },
  maintenanceStatus: {
    type: Boolean,
    default: false,
  },
});

const Bin = mongoose.model("Bin", BinSchema);
export default Bin;
