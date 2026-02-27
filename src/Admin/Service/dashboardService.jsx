// src/Service/dashboardService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboards"; 

export const getDashboardStats = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // { totalBlogs, totalCarousel, totalContacts, ... }
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    throw error;
  }
};