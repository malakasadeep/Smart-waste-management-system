// routes/collectionRoutes.js
import express from "express";
import {
  createCollection,
  getAllCollections,
  deleteCollection,
} from "../controllers/SpecialcollectionController.js";
const router = express.Router();

router.post("/", createCollection);
router.get("/", getAllCollections);
router.delete("/:id", deleteCollection);

export default router;
