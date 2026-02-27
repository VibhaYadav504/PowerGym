
import cloudinary from "../config/cloudinary.js";
import Gallery from "../model/Gallery.js";

// Helper: upload file buffer to Cloudinary
export const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "gallery" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

// ------------------ CREATE Gallery ------------------
export const createGallery = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Photo is required" });
    }

    // Cloudinary upload
    const photoUrl = await uploadToCloudinary(req.file.buffer);

    const gallery = await Gallery.create({
      photo: photoUrl,
      status: req.body.status || "Active",
    });

    res.status(201).json(gallery);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// ------------------ GET All Galleries ------------------
export const getGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(galleries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------ GET Single Gallery ------------------
export const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery)
      return res.status(404).json({ message: "Gallery not found" });
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------ UPDATE Gallery ------------------
export const updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });

    // Update status
    gallery.status = req.body.status || gallery.status;

    // Update photo if provided
    if (req.file) {
      const photoUrl = await uploadToCloudinary(req.file.buffer);
      gallery.photo = photoUrl;
    }

    const updatedGallery = await gallery.save();
    res.status(200).json(updatedGallery);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// ------------------ DELETE Gallery ------------------
export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery)
      return res.status(404).json({ message: "Gallery not found" });

    res.status(200).json({ message: "Gallery deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};