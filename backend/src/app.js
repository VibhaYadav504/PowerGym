import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js"; 
import planRoutes from "./routes/planRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import carouselRoutes from "./routes/carouselRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));


app.use("/api/contacts", contactRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/programs",programRoutes);
app.use("/api/gallerys",galleryRoutes);
app.use("/api/carousels",carouselRoutes);
app.use("/api/dashboards", dashboardRoutes);
app.get("/test", (req, res) => {
  res.send("API is running");
});

export default app;