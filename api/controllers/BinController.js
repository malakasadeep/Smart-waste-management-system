import mongoose from "mongoose";
import Bin from "../models/Bin.js";

export const createNewBin = async (req, res) => {
  try {
    const newBin = new Bin(req.body);
    await newBin.save();
    res.status(201).json({ message: "New Bin Created Sucessfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create a new Bin",
      error: error.message,
    });
  }
};

export const getAllBins = async (req, res) => {
  try {
    const bins = await Bin.find();
    res.status(200).json(bins);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Bin Data", error });
  }
};

export const getBinbyId = async (req, res) => {
  try {
    const binId = req.params.binId;

    const bins = await Bin.findOne({ binId });

    if (bins) {
      return res.status(200).json(bins);
    }
    res.status(404).json({ message: "Bin not found" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching Bin: " + error.message });
  }
};

export const deleteBin = async (req, res) => {
  try {
    await Bin.findByIdAndDelete(req.params.binId);
    res.status(200).json({ message: "Bin Sucessfully Deleated" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleating Bin" });
  }
};

export const updateBin = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedBin = await Bin.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(updatedBin);
  } catch (error) {
    res.status(500).json({ message: "Error Updating Bin", error });
  }
};
