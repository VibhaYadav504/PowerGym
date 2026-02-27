// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



// Pages

import AdminLayout from "./Admin/Layout/AdminLayout";


import Dashboard from "./Admin/Pages/Dashboard/Dashboard";
import Blog from "./Admin/Pages/Blog/Blog";
import Carousel from "./Admin/Pages/Carousel/Carousel";
import ContactForm from "./Admin/Pages/Contact/ContactForm";
import Plan from "./Admin/Pages/Plan/Plan";
import Program from "./Admin/Pages/Program/Program";
import Trainer from "./Admin/Pages/Trainer/Trainer";
import Gallery from "./Admin/Pages/Gallery/Gallery";
import BlogForm from "./Admin/Pages/Blog/BlogForm";
import EditBlog from "./Admin/Pages/Blog/EditBlog";
import CarouselForm from "./Admin/Pages/Carousel/CarouselForm";
import EditCarousel from "./Admin/Pages/Carousel/EditCarousel";
import CarouselTable from "./Admin/Pages/Carousel/CarouselTable";
import TrainerForm from "./Admin/Pages/Trainer/TrainerForm";
import EditTrainer from "./Admin/Pages/Trainer/EditTrainer";
import PlanForm from "./Admin/Pages/Plan/PlanForm";
import EditPlan from "./Admin/Pages/Plan/PlanEdit";
import ProgramForm from "./Admin/Pages/Program/ProgramForm";
import EditProgram from "./Admin/Pages/Program/EditProgram";
import EditGallery from "./Admin/Pages/Gallery/EditGallery";
import GalleryForm from "./Admin/Pages/Gallery/GalleryForm";
import EditContact from "./Admin/Pages/Contact/EditContact";
import Contact from "./Admin/Pages/Contact/Contact";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="blogs" element={<Blog />} />
          <Route path="/blog-form" element={<BlogForm />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} />

          <Route path="carousel" element={<Carousel />} />
          <Route path="/carousels" element={<CarouselTable />} />
          <Route path="/carousel-form" element={<CarouselForm />} />
          <Route path="/edit-carousel/:id" element={<EditCarousel />} />

          <Route path="contacts" element={<Contact />} />
          <Route path="/add-contact" element={<ContactForm />} />
          <Route path="/edit-contact/:id" element={<EditContact />} />

          <Route path="plans" element={<Plan />} />
          <Route path="/add-plan" element={<PlanForm />} />
          <Route path="/edit-plan/:id" element={<EditPlan />} />

          <Route path="/programs" element={<Program />} />
          <Route path="/add-program" element={<ProgramForm />} />
          <Route path="/edit-program/:id" element={<EditProgram />} />

          <Route path="trainers" element={<Trainer />} />
          <Route path="/add-trainer" element={<TrainerForm />} />
          <Route path="/edit-trainer/:id" element={<EditTrainer />} />

          <Route path="gallerys" element={<Gallery />} />
          <Route path="/add-gallery" element={<GalleryForm />} />
          <Route path="/edit-gallery/:id" element={<EditGallery />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;