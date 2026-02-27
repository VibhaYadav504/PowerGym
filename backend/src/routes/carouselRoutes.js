
import express from "express";
import { upload } from "../middleware/multer.js";
import {
  createCarousel,
  getCarousels,
  getCarouselById,
  updateCarousel,
  deleteCarousel,
} from "../Controller/carouselController.js";

const router = express.Router();

router.get("/", getCarousels);
router.get("/:id", getCarouselById);
router.post("/", upload.single("photo"), createCarousel);
router.put("/:id", upload.single("photo"), updateCarousel);
router.delete("/:id", deleteCarousel);

export default router;