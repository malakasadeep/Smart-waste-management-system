// controllers/collectionController.js
import Collection from "../models/SpecialCollection.js";

// Create a new collection
export const createCollection = async (req, res) => {
  try {
    const newCollection = new Collection(req.body);
    const savedCollection = await newCollection.save();
    res.status(201).json(savedCollection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all collections
export const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a collection by ID
export const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);
    if (!collection)
      return res.status(404).json({ message: "Collection not found" });
    res.status(200).json({ message: "Collection deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
