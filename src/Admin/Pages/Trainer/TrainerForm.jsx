import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createTrainer } from "../../Service/trainerService";
const baseURL = import.meta.env.VITE_BASE_URL;
// Cloudinary config
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload";
const CLOUDINARY_UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";

const TrainerForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    experience: "",
    status: "Active",
    photo: "", // Will store Cloudinary URL
  });

  const [photoFile, setPhotoFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!photoFile) {
    alert("Please select a photo to upload");
    return;
  }

  try {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("position", formData.position);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("photo", photoFile);

    await axios.post(`${baseURL}/api/trainers`, formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Trainer added successfully!");
    navigate("/trainers");
  } catch (err) {
    console.error("Failed to add trainer:", err);
    alert(err.response?.data?.message || "Failed to add trainer");
  }
};

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Add Trainer</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Experience</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <label style={styles.label}>Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={styles.input}
          />

          <button type="submit" style={styles.submitButton}>
            Submit Trainer
          </button>
        </form>
      </div>
    </div>
  );
};

// Theme styles remain exactly the same
const styles = {
  pageWrapper: { display: "flex", justifyContent: "center", padding: "40px 20px", minHeight: "calc(100vh - 80px)", backgroundColor: "#1c1c1c" },
  container: { width: "100%", maxWidth: "600px", backgroundColor: "#141414", padding: "40px 30px", borderRadius: "12px", border: "1px solid #ff0000", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" },
  heading: { color: "#ff0000", marginBottom: "30px", textAlign: "center", fontSize: "28px" },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  label: { marginBottom: "5px", fontWeight: "bold", color: "#fff", fontSize: "14px" },
  input: { padding: "12px", borderRadius: "8px", border: "1px solid #ff0000", backgroundColor: "#1a1a1a", color: "#fff", fontSize: "14px" },
  select: { padding: "12px", borderRadius: "8px", border: "1px solid #ff0000", backgroundColor: "#1a1a1a", color: "#fff", fontSize: "14px" },
  submitButton: { padding: "14px 0", backgroundColor: "#ff0000", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "16px", marginTop: "10px", transition: "0.3s" },
};

export default TrainerForm;