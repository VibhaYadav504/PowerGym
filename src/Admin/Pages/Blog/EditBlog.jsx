import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../../Service/blogService";


const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    photo: null,
    date: "",
    title: "",
    description: "",
    status: "Draft",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await getBlogById(id);
        setFormData({
          photo: null,
          date: new Date(blog.date).toISOString().slice(0,16),
          title: blog.title,
          description: blog.description,
          status: blog.status,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBlog(id, formData);
      alert("Blog updated successfully!");
      navigate("/blogs");
    } catch (err) {
      console.error(err);
      alert("Failed to update blog");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Blog</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Photo</label>
        <input type="file" name="photo" onChange={handleChange} style={styles.input} />

        <label style={styles.label}>Date & Time</label>
        <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} style={styles.input} />

        <label style={styles.label}>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} style={styles.input} />

        <label style={styles.label}>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows="5" style={styles.textarea} />

        <label style={styles.label}>Status</label>
        <select name="status" value={formData.status} onChange={handleChange} style={styles.select}>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>

        <button type="submit" style={styles.submitButton}>Update Blog</button>
      </form>
    </div>
  );
};

const styles = { container: { backgroundColor: "#141414", padding: "30px", borderRadius: "10px", color: "#fff", border: "1px solid #ff0000", }, heading: { color: "#ff0000", marginBottom: "20px", }, form: { display: "flex", flexDirection: "column", gap: "15px", }, label: { fontWeight: "bold", marginBottom: "5px", }, input: { padding: "10px", borderRadius: "6px", border: "1px solid #ff0000", backgroundColor: "#141414", color: "#fff", }, textarea: { padding: "10px", borderRadius: "6px", border: "1px solid #ff0000", backgroundColor: "#141414", color: "#fff", resize: "vertical", }, select: { padding: "10px", borderRadius: "6px", border: "1px solid #ff0000", backgroundColor: "#141414", color: "#fff", }, submitButton: { padding: "12px 20px", backgroundColor: "#ff0000", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", marginTop: "10px", alignSelf: "flex-start", transition: "0.3s", }, };

export default EditBlog;