




import Blog from "../model/Blog.js";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// Upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, folder = "blogs") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

// Create new blog
export const createBlog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const photoUrl = await uploadToCloudinary(req.file.buffer, "blogs");

    const blog = await Blog.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date || new Date(),
      status: req.body.status.trim(), // remove extra spaces
      photo: photoUrl,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.title = req.body.title || blog.title;
    blog.description = req.body.description || blog.description;
    blog.status = req.body.status ? req.body.status.trim() : blog.status;
    blog.date = req.body.date || blog.date;

    if (req.file) {
      const photoUrl = await uploadToCloudinary(req.file.buffer, "blogs");
      blog.photo = photoUrl;
    }

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};