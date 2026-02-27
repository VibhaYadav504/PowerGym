// src/routes/galleryRoutes.js
import express from "express";
import upload from "../middleware/multer.js";
import {
  createGallery,
  
  getGalleryById,
  updateGallery,
  deleteGallery,
  getGallery,
} from "../Controller/galleryController.js";

const router = express.Router();

router.get("/", getGallery);
router.get("/:id", getGalleryById);
router.post("/", upload.single("photo"), createGallery);
router.put("/:id", upload.single("photo"), updateGallery);
router.delete("/:id", deleteGallery);

export default router;