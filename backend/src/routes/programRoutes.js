
import express from "express";
import upload from "../middleware/multer.js";
import {
  createProgram,
  getPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
} from "../Controller/programController.js";

const router = express.Router();

router.get("/", getPrograms);
router.get("/:id", getProgramById);
router.post("/", upload.single("photo"), createProgram);
router.put("/:id", upload.single("photo"), updateProgram);
router.delete("/:id", deleteProgram);

export default router;