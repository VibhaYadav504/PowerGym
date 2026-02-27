import axios from "axios";

const API_URL = "http://localhost:5000/api/trainers"; 

// Get all trainers
export const getTrainers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get trainer by ID
export const getTrainerById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a trainer
export const createTrainer = async (payload) => {
  const response = await axios.post(API_URL, payload); // expects {name, position, status, photo (URL or base64)}
  return response.data;
};

// Update a trainer
export const updateTrainer = async (id, payload) => {
  const response = await axios.put(`${API_URL}/${id}`, payload);
  return response.data;
};


export const deleteTrainer = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};