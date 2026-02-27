import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProgram } from "../../Service/programService";


const ProgramForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    photo: null,
    description: "",
    status: "Active",
  });

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
      await createProgram(formData);
      console.log("Program Submitted:", formData);
      navigate("/programs");
    } catch (error) {
      console.error("Error creating program:", error);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Add / Edit Program</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Title */}
          <label style={styles.label}>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter program title"
            style={styles.input}
          />

          {/* Photo Upload */}
          <label style={styles.label}>Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            style={styles.input}
          />

          {/* Description */}
          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter program description"
            rows="6"
            style={styles.textarea}
          />

          {/* Status */}
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

          {/* Submit */}
          <button type="submit" style={styles.submitButton}>
            Submit Program
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
  heading: {
    color: "#ff0000",
    marginBottom: "30px",
    textAlign: "center",
    fontSize: "28px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#fff",
    fontSize: "14px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ff0000",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    fontSize: "14px",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ff0000",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    resize: "vertical",
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

export default ProgramForm;