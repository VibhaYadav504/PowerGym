
import Program from "../model/Program.js";
import cloudinary from "../config/cloudinary.js";


const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "programs" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

// Create program
export const createProgram = async (req, res) => {
  try {
    // 🔥 Clean & trim incoming keys
    const cleanedBody = {};
    Object.keys(req.body).forEach((key) => {
      cleanedBody[key.trim()] = req.body[key];
    });

    const title = cleanedBody.title?.trim();
    const description = cleanedBody.description?.trim();
    const status = cleanedBody.status;

    if (!title || !description) {
      return res.status(400).json({ message: "All required fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const photoUrl = await uploadToCloudinary(req.file.buffer);

    const program = await Program.create({
      title,
      description,
      status,
      photo: photoUrl,
    });

    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all programs
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get program by ID
export const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update program
export const updateProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });

    program.title = req.body.title || program.title;
    program.description = req.body.description || program.description;
    program.status = req.body.status || program.status;

    if (req.file) {
      program.photo = await uploadToCloudinary(req.file.buffer);
    }

    const updatedProgram = await program.save();
    res.status(200).json(updatedProgram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete program
export const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });
    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};