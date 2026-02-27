import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGalleryById, updateGallery } from "../../Service/galleryService";

const EditGallery = () => {
  const { id } = useParams(); // get gallery id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    photo: null,  // File object
    status: "Active",
    existingPhoto: "", // URL for display
  });

  // Fetch gallery data from API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const gallery = await getGalleryById(id);
        setFormData({
          photo: null, // initially no new file
          status: gallery.status || "Active",
          existingPhoto: gallery.photo || "", // display current photo
        });
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
        alert("Failed to load gallery data");
      }
    };
    fetchGallery();
  }, [id]);

  const handleChange = (e) => {
    const { name, files, value } = e.target;

    if (name === "photo") {
      if (files && files[0]) {
        setFormData((prev) => ({ ...prev, photo: files[0] })); // store new File
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      if (formData.photo) data.append("photo", formData.photo); // new file
      data.append("status", formData.status);

      await updateGallery(id, data); // send FormData to backend
      alert("Gallery updated successfully!");
      navigate("/gallerys");
    } catch (err) {
      console.error("Failed to update gallery:", err);
      alert(err.response?.data?.message || "Failed to update gallery");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Edit Gallery</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Current Photo</label>
          {formData.existingPhoto && (
            <img
              src={formData.existingPhoto}
              alt="Gallery"
              style={styles.preview}
            />
          )}

          <label style={styles.label}>Upload New Photo</label>
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
            Update Gallery
          </button>
        </form>
      </div>
    </div>
  );
};

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
  input: { padding: "12px", borderRadius: "8px", border: "1px solid #ff0000", backgroundColor: "#1a1a1a", color: "#fff", fontSize: "14px" },
  select: { padding: "12px", borderRadius: "8px", border: "1px solid #ff0000", backgroundColor: "#1a1a1a", color: "#fff", fontSize: "14px" },
  submitButton: { padding: "14px 0", backgroundColor: "#ff0000", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "16px", marginTop: "10px", transition: "0.3s" },
  preview: { width: "150px", height: "100px", objectFit: "cover", borderRadius: "6px", marginBottom: "10px" },
};

export default EditGallery;