import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContactById, updateContact } from "../../Service/contactService";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Fetch contact by ID
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await getContactById(id);
        setFormData(data);
      } catch (error) {
        console.error("Fetch failed:", error);
        alert("Failed to load contact");
      }
    };

    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateContact(id, formData);
      alert("Contact updated successfully!");
      navigate("/contacts");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update contact");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Edit Contact</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Name</label>
          <input name="name" value={formData.name} onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Phone</label>
          <input name="phone" value={formData.phone} onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} style={styles.textarea} />

          <button type="submit" style={styles.submitButton}>
            Update Contact
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
    fontSize: "14px",
    resize: "vertical",
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

export default EditContact;