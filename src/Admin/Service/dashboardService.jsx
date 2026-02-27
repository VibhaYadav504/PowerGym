// src/Service/dashboardService.js
import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
const API_URL = `${baseURL}/api/dashboards`;

// const API_URL = "http://localhost:5000/api/dashboards"; 
// const API_URL = "https://powergym-94ad.onrender.com";

export const getDashboardStats = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // { totalBlogs, totalCarousel, totalContacts, ... }
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    throw error;
  }
};