import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
const API_URL = `${baseURL}/api/blogs`; // Update if your backend URL/port is different
// const API_URL = "https://powergym-94ad.onrender.com"; // Update if your backend URL/port is different


export const getBlogs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


export const getBlogById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};


export const createBlog = async (blogData) => {
  const formData = new FormData();
  formData.append("title", blogData.title);
  formData.append("description", blogData.description);
  formData.append("date", blogData.date); // string or Date
  formData.append("status", blogData.status || "Draft");
  formData.append("photo", blogData.photo); // file object

  const response = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateBlog = async (id, blogData) => {
  const formData = new FormData();
  if (blogData.title) formData.append("title", blogData.title);
  if (blogData.description) formData.append("description", blogData.description);
  if (blogData.date) formData.append("date", blogData.date);
  if (blogData.status) formData.append("status", blogData.status);
  if (blogData.photo) formData.append("photo", blogData.photo);

  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};