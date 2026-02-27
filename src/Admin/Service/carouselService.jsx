import axios from "axios";

const API_URL = "http://localhost:5000/api/carousels"; // update if your backend URL/port is different


export const getCarousels = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


export const getCarouselById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCarousel = async (carouselData) => {
  const formData = new FormData();
  formData.append("status", carouselData.status || "Draft");
  formData.append("photo", carouselData.photo); // file object

  const response = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};


export const updateCarousel = async (id, carouselData) => {
  const formData = new FormData();
  if (carouselData.status) formData.append("status", carouselData.status);
  if (carouselData.photo) formData.append("photo", carouselData.photo);

  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteCarousel = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};