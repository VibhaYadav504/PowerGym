
import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema(
  {
    photo: { type: String, required: true }, // Cloudinary URL
    status: { type: String, enum: ["Published", "Draft"], default: "Draft" },
  },
  { timestamps: true }
);

const Carousel = mongoose.model("Carousel", carouselSchema);
export default Carousel;