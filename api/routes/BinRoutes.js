import express from "express";
import {
  createNewBin,
  getAllBins,
  getBinbyId,
  deleteBin,
  updateBin,
} from "../controllers/BinController.js";
const router = express.Router();

router.post("/add", createNewBin);
router.get("/get", getAllBins);
router.get("/get/:binId", getBinbyId);
router.delete("/delete/:binId", deleteBin);
router.put("/update/:id", updateBin);

export default router;
