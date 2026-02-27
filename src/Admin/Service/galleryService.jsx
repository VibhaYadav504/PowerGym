import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
const API_URL = `${baseURL}/api/gallerys`;

// const API_URL = "http://localhost:5000/api/gallerys";
// const API_URL = "https://powergym-94ad.onrender.com";

// Get all galleries
export const getGallery = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get single gallery by ID
export const getGalleryById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create gallery
export const createGallery = async (galleryData) => {
  // galleryData must have: { photo: File, status: string }
  const formData = new FormData();
  formData.append("photo", galleryData.photo); // required
  formData.append("status", galleryData.status || "Active");

  const response = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Update gallery
export const updateGallery = async (id, galleryData) => {
  const formData = new FormData();
  if (galleryData.photo) formData.append("photo", galleryData.photo);
  if (galleryData.status) formData.append("status", galleryData.status);

  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Delete gallery
export const deleteGallery = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};