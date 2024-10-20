import binFactory from "./BinFactory.js";

// Example usage
const createRecyclingBin = async () => {
  const bin = binFactory.createBin("recycling", { lat: 40.7128, lng: -74.006 });
  await bin.save();
  console.log("Recycling bin created:", bin);
};

const createGeneralBin = async () => {
  const bin = binFactory.createBin("general", { lat: 34.0522, lng: -118.2437 });
  await bin.save();
  console.log("General bin created:", bin);
};
