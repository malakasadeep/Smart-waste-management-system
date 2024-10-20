import collectionService from "../services/SpecialcollectionService.js";
import winston from "winston"; // Importing a logging library

// Logger configuration
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "collection.log" }),
  ],
});

// Create a new collection
export const createCollection = async (req, res) => {
  try {
    // Log the incoming request
    logger.info("Creating a new collection", { body: req.body });

    const savedCollection = await collectionService.createCollection(req.body);

    // Log successful creation
    logger.info("Collection created successfully", {
      collection: savedCollection,
    });
    res.status(201).json(savedCollection);
  } catch (error) {
    // Log the error
    logger.error("Error creating collection", { message: error.message });
    res.status(400).json({ message: error.message });
  }
};

// Get all collections
export const getAllCollections = async (req, res) => {
  try {
    // Log the retrieval request
    logger.info("Retrieving all collections");

    const collections = await collectionService.getAllCollections();

    // Log successful retrieval
    logger.info("Collections retrieved successfully", {
      count: collections.length,
    });
    res.status(200).json(collections);
  } catch (error) {
    // Log the error
    logger.error("Error retrieving collections", { message: error.message });
    res.status(500).json({ message: error.message });
  }
};

// Delete a collection by ID
export const deleteCollection = async (req, res) => {
  try {
    // Log the deletion request
    logger.info("Deleting collection with ID", { id: req.params.id });

    const collection = await collectionService.deleteCollection(req.params.id);
    if (!collection) {
      // Log not found situation
      logger.warn("Collection not found", { id: req.params.id });
      return res.status(404).json({ message: "Collection not found" });
    }

    // Log successful deletion
    logger.info("Collection deleted successfully", { id: req.params.id });
    res.status(200).json({ message: "Collection deleted" });
  } catch (error) {
    // Log the error
    logger.error("Error deleting collection", { message: error.message });
    res.status(500).json({ message: error.message });
  }
};
