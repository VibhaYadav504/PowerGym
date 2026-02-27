import express from "express";
import upload from "../middleware/multer.js";
import {
  getTrainers,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  getTrainerById,
} from "../controller/trainerController.js";

const router = express.Router();

router.get("/", getTrainers);
router.get("/:id", getTrainerById);

router.post("/", upload.single("photo"), createTrainer);

router.put("/:id", upload.single("photo"), updateTrainer);

router.delete("/:id", deleteTrainer);

export default router;