// models/Collection.js
import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    collectionType: {
      type: String,
      enum: ["Standard Waste", "Bulky Items", "Hazardous Waste"],
      required: true,
    },
    collectionDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      enum: ["Morning", "Afternoon", "Evening"],
      required: true,
    },
    wasteDescription: {
      type: String,
      required: true,
    },
    pickupAddress: {
      type: String,
      required: true,
    },
    specialInstructions: String,
    contactInfo: {
      phoneNumber: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      enum: ["Online Payment", "Pay-on-Pickup"],
      required: true,
    },
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number],
    },
    termsAgreed: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
const Collection = mongoose.model("Collection", collectionSchema);
export default Collection;
