import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGallery, deleteGallery } from "../../Service/galleryService";

const GalleryTable = () => {
  const navigate = useNavigate();
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGallery();
        setGalleries(data);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
        alert("Failed to load gallery");
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gallery item?")) return;
    try {
      await deleteGallery(id);
      setGalleries(galleries.filter((g) => g._id !== id));
      alert("Deleted successfully!");
    } catch (err) {
      console.error("Failed to delete gallery:", err);
      alert("Failed to delete gallery");
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <h2 style={styles.heading}>Gallery</h2>
        <button style={styles.addButton} onClick={() => navigate("/add-gallery")}>
          + Add Gallery
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Photo</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {galleries.map((gallery) => (
            <tr key={gallery._id} style={styles.tr}>
              <td style={styles.td}>
                <img src={gallery.photo} alt="Gallery" style={styles.photo} />
              </td>
              <td style={styles.td}>
                <span
                  style={{
                    ...styles.status,
                    backgroundColor: gallery.status === "Active" ? "#ff0000" : "#555",
                  }}
                >
                  {gallery.status}
                </span>
              </td>
              <td style={styles.td}>
                <button
                  style={styles.editButton}
                  onClick={() => navigate(`/edit-gallery/${gallery._id}`)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(gallery._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Keep your theme colors
const styles = { /* same as your original */ 
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  heading: { color: "#fff" },
  addButton: { padding: "10px 20px", backgroundColor: "#ff0000", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", transition: "0.3s" },
  table: { width: "100%", borderCollapse: "collapse", backgroundColor: "#141414" },
  th: { color: "#fff", padding: "12px", textAlign: "left", borderBottom: "2px solid #ff0000", cursor: "pointer" },
  tr: { borderBottom: "1px solid #333", transition: "0.2s" },
  td: { padding: "12px", color: "#fff", verticalAlign: "middle" },
  photo: { width: "80px", height: "50px", objectFit: "cover", borderRadius: "6px" },
  status: { padding: "5px 10px", borderRadius: "6px", color: "#fff", fontWeight: "bold" },
  editButton: { padding: "5px 10px", backgroundColor: "#ff0000", color: "#fff", border: "none", borderRadius: "6px", marginRight: "5px", cursor: "pointer", fontWeight: "bold" },
  deleteButton: { padding: "5px 10px", backgroundColor: "#555", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
};

export default GalleryTable;