import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
const API_URL = `${baseURL}/api/contacts`;

// const API_URL = "http://localhost:5000/api/contacts";
// const API_URL = "https://powergym-94ad.onrender.com";

export const getContacts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


export const getContactById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};


export const createContact = async (contactData) => {
  const response = await axios.post(API_URL, contactData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};


export const updateContact = async (id, contactData) => {
  const response = await axios.put(`${API_URL}/${id}`, contactData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};


export const deleteContact = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};