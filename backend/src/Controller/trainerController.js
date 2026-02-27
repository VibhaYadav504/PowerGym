import Trainer from "../model/trainer.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

//  Create Trainer
export const createTrainer = async (req, res) => {
  try {
    const { name, position, status } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const result = await uploadToCloudinary(req.file.buffer, { folder: "trainers" });

    const newTrainer = new Trainer({
      name,
      position,
      status,
      photo: result.secure_url,
    });

    const savedTrainer = await newTrainer.save();
    res.status(201).json(savedTrainer);
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all trainers
export const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find().sort({ createdAt: -1 });
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });
    res.status(200).json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update trainer
export const updateTrainer = async (req, res) => {
  try {
    const { name, position, status } = req.body;
    let updatedData = { name, position, status };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, { folder: "trainers" });
      updatedData.photo = result.secure_url;
    }

    const trainer = await Trainer.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!trainer) return res.status(404).json({ message: "Trainer not found" });

    res.status(200).json(trainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete trainer
export const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });
    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};