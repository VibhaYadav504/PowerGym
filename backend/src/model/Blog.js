import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Published", "Draft"], 
    required: true,
  },
  photo: { type: String, required: true }, // store Cloudinary URL
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;