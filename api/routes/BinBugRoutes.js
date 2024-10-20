import express from "express";
import {
  createNewBinBug,
  getBinBugs,
} from "../controllers/BinBugController.js";

const router = express.Router();

router.post("/add", createNewBinBug);
router.get("/get", getBinBugs);

export default router;
