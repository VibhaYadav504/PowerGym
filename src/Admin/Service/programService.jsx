import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
const API_URL = `${baseURL}/api/programs`;

// const API_URL = "http://localhost:5000/api/programs";
// const API_URL = "https://powergym-94ad.onrender.com";


export const getPrograms = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


export const getProgramById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};


export const createProgram = async (programData) => {
  const formData = new FormData();
  formData.append("photo", programData.photo); 
  formData.append("title", programData.title);
  formData.append("description", programData.description);
  formData.append("status", programData.status || "Active");

  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


export const updateProgram = async (id, programData) => {
  const formData = new FormData();
  if (programData.photo) formData.append("photo", programData.photo);
  if (programData.title) formData.append("title", programData.title);
  if (programData.description) formData.append("description", programData.description);
  if (programData.status) formData.append("status", programData.status);

  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};


export const deleteProgram = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};