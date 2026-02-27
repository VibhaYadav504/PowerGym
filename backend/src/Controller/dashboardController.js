

import Blog from "../model/Blog.js";
import Carousel from "../model/Carousel.js";
import Contact from "../model/Contact.js";
import Plan from "../model/Plan.js";
import Program from "../model/Program.js";
import Trainer from "../model/Trainer.js";
import Gallery from "../model/Gallery.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalBlogs,
      totalCarousel,
      totalContacts,
      totalPlans,
      totalPrograms,
      totalTrainers,
      totalGallery,
    ] = await Promise.all([
      Blog.countDocuments(),
      Carousel.countDocuments(),
      Contact.countDocuments(),
      Plan.countDocuments(),
      Program.countDocuments(),
      Trainer.countDocuments(),
      Gallery.countDocuments(),
    ]);

    res.status(200).json({
      totalBlogs,
      totalCarousel,
      totalContacts,
      totalPlans,
      totalPrograms,
      totalTrainers,
      totalGallery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};