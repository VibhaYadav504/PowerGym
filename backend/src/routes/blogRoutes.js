// src/routes/blogRoutes.js
import express from "express";
import upload from "../middleware/multer.js";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../Controller/blogController.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/", upload.single("photo"), createBlog);
router.put("/:id", upload.single("photo"), updateBlog);
router.delete("/:id", deleteBlog);

export default router;