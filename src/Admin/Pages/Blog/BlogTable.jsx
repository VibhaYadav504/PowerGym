import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBlog, getBlogs } from "../../Service/blogService";

const BlogTable = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id);
        fetchBlogs(); // refresh table
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.heading}>Blogs</h2>
        <button
          style={styles.addButton}
          onClick={() => navigate("/blog-form")}
        >
          + Add Blog
        </button>
      </div>

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Photo</th>
            <th style={styles.th}>Date-Time</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} style={styles.tr}>
              <td style={styles.td}>
                <img src={blog.photo} alt={blog.title} style={styles.photo} />
              </td>
              <td style={styles.td}>{new Date(blog.date).toLocaleString()}</td>
              <td style={styles.td}>{blog.title}</td>
              <td style={styles.td}>{blog.description}</td>
              <td style={styles.td}>
                <span
                  style={{
                    ...styles.status,
                    backgroundColor: blog.status === "Published" ? "#ff0000" : "#555",
                  }}
                >
                  {blog.status}
                </span>
              </td>
              <td style={styles.td}>
                <button
                  style={styles.editButton}
                  onClick={() => navigate(`/edit-blog/${blog._id}`)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(blog._id)}
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


const styles = { header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", }, heading: { color: "#fff" }, addButton: { padding: "10px 20px", backgroundColor: "#ff0000", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", transition: "0.3s", }, table: { width: "100%", borderCollapse: "collapse", backgroundColor: "#141414", }, th: { color: "#fff", padding: "12px", textAlign: "left", borderBottom: "2px solid #ff0000", cursor: "pointer", }, tr: { borderBottom: "1px solid #333", transition: "0.2s" }, td: { padding: "12px", color: "#fff", verticalAlign: "middle" }, photo: { width: "80px", height: "50px", objectFit: "cover", borderRadius: "6px" }, status: { padding: "5px 10px", borderRadius: "6px", color: "#fff", fontWeight: "bold" }, editButton: { padding: "5px 10px", backgroundColor: "#ff0000", color: "#fff", border: "none", borderRadius: "6px", marginRight: "5px", cursor: "pointer", fontWeight: "bold", }, deleteButton: { padding: "5px 10px", backgroundColor: "#555", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", }, };

export default BlogTable;