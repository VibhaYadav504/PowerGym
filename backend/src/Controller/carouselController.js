import Carousel from "../model/Carousel.js"; // Ensure folder name is "models"
import cloudinary from "../config/cloudinary.js";

// Helper to upload to Cloudinary
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) return reject(error);
      resolve(result.secure_url);
    });
    stream.end(fileBuffer);
  });
};

// Create Carousel
export const createCarousel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const photoUrl = await uploadToCloudinary(req.file.buffer, "carousel");

    const carousel = await Carousel.create({
      photo: photoUrl,
      status: req.body.status?.trim() || "Draft",
    });

    res.status(201).json(carousel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Carousels
export const getCarousels = async (req, res) => {
  try {
    const carousels = await Carousel.find().sort({ createdAt: -1 });
    res.status(200).json(carousels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single Carousel
export const getCarouselById = async (req, res) => {
  try {
    const carousel = await Carousel.findById(req.params.id);
    if (!carousel) return res.status(404).json({ message: "Carousel not found" });
    res.status(200).json(carousel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Carousel
export const updateCarousel = async (req, res) => {
  try {
    const carousel = await Carousel.findById(req.params.id);
    if (!carousel) return res.status(404).json({ message: "Carousel not found" });

    carousel.status = req.body.status?.trim() || carousel.status;

    if (req.file) {
      carousel.photo = await uploadToCloudinary(req.file.buffer, "carousel");
    }

    const updatedCarousel = await carousel.save();
    res.status(200).json(updatedCarousel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Carousel
export const deleteCarousel = async (req, res) => {
  try {
    const carousel = await Carousel.findByIdAndDelete(req.params.id);
    if (!carousel) return res.status(404).json({ message: "Carousel not found" });
    res.status(200).json({ message: "Carousel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};