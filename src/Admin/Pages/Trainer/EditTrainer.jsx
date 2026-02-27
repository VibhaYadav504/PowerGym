import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getTrainerById } from "../../Service/trainerService";

const EditTrainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    experience: "",
    status: "Active",
    photo: "", // existing photo URL
  });

  // State for new photo file
  const [photoFile, setPhotoFile] = useState(null);

  // Fetch existing trainer data
  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const data = await getTrainerById(id);
        setFormData(data);
      } catch (err) {
        console.error("Failed to fetch trainer:", err);
      }
    };
    fetchTrainer();
  }, [id]);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("position", formData.position);
      formDataToSend.append("experience", formData.experience);
      formDataToSend.append("status", formData.status);

      // Append new photo only if user selected one
      if (photoFile) {
        formDataToSend.append("photo", photoFile);
      }

      await axios.put(`http://localhost:5000/api/trainers/${id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Trainer updated successfully!");
      navigate("/trainers");
    } catch (err) {
      console.error("Failed to update trainer:", err);
      alert(err.response?.data?.message || "Failed to update trainer");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Edit Trainer</h2>

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

          <label style={styles.label}>Current Photo URL</label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Upload New Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={styles.input}
          />

          <button type="submit" style={styles.submitButton}>
            Update Trainer
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles
const styles = {
  pageWrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
    minHeight: "calc(100vh - 80px)",
    backgroundColor: "#1c1c1c",
  },
  container: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#141414",
    padding: "40px 30px",
    borderRadius: "12px",
    border: "1px solid #ff0000",
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
  },
  heading: { color: "#ff0000", marginBottom: "30px", textAlign: "center", fontSize: "28px" },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  label: { marginBottom: "5px", fontWeight: "bold", color: "#fff", fontSize: "14px" },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ff0000",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    fontSize: "14px",
  },
  select: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ff0000",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    fontSize: "14px",
  },
  submitButton: {
    padding: "14px 0",
    backgroundColor: "#ff0000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    marginTop: "10px",
    transition: "0.3s",
  },
};

export default EditTrainer;