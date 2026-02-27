import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
const API_URL = `${baseURL}/api/plans`;

// const API_URL = "http://localhost:5000/api/plans"; 
// const API_URL = "https://powergym-94ad.onrender.com";

export const getPlans = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


export const getPlanById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};


export const createPlan = async (planData) => {
  // planData = { price, service, status }
  const response = await axios.post(API_URL, planData);
  return response.data;
};


export const updatePlan = async (id, planData) => {
  const response = await axios.put(`${API_URL}/${id}`, planData);
  return response.data;
};


export const deletePlan = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};