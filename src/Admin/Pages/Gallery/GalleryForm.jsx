import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGallery } from "../../Service/galleryService";

const GalleryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ photo: null, status: "Active" });

  const handleChange = (e) => {
    const { name, files, value } = e.target;

    if (name === "photo") {
      if (files && files[0]) {
        setFormData((prev) => ({ ...prev, photo: files[0] }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.photo) {
      alert("Please select a photo!");
      return;
    }

    try {
      // Call service
      await createGallery(formData);
      alert("Gallery added successfully!");
      navigate("/gallerys");
    } catch (err) {
      console.error("Failed to add gallery:", err);
      alert(err.response?.data?.message || "Failed to add gallery");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Add Gallery</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
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

          <button type="submit" style={styles.submitButton}>
            Submit Gallery
          </button>
        </form>
      </div>
    </div>
  );
};

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

export default GalleryForm;