// binFactory.js
import Bin from "./BinModel.js";

class BinFactory {
  createBin(type, location) {
    const defaultData = {
      location,
      capacity: 50, // Default capacity
      lastEmptied: new Date(),
    };

    switch (type) {
      case "recycling":
        return new Bin({
          ...defaultData,
          binType: "recycling",
          capacity: 100, // Higher capacity for recycling bins
        });
      case "organic":
        return new Bin({
          ...defaultData,
          binType: "organic",
          capacity: 80,
        });
      case "general":
      default:
        return new Bin({
          ...defaultData,
          binType: "general",
        });
    }
  }
}

export default new BinFactory();
