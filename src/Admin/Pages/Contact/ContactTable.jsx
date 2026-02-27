import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContacts, deleteContact } from "../../Service/contactService";

const ContactTable = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  // Fetch all contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
        alert("Failed to load contacts");
      }
    };

    fetchContacts();
  }, []);

  // Delete contact
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      await deleteContact(id);
      setContacts(contacts.filter((contact) => contact._id !== id));
      alert("Contact deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete contact");
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <h2 style={styles.heading}>Contacts</h2>
        <button
          style={styles.addButton}
          onClick={() => navigate("/add-contact")}
        >
          + Add Contact
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Message</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id} style={styles.tr}>
              <td style={styles.td}>{contact.name}</td>
              <td style={styles.td}>{contact.email}</td>
              <td style={styles.td}>{contact.phone}</td>
              <td style={styles.td}>{contact.message}</td>
              <td style={styles.td}>
                <button
                  style={styles.editButton}
                  onClick={() => navigate(`/edit-contact/${contact._id}`)}
                >
                  Edit
                </button>

                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(contact._id)}
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

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  heading: { color: "#fff" },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#ff0000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#141414",
  },
  th: {
    color: "#fff",
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #ff0000",
    cursor: "pointer",
  },
  tr: { borderBottom: "1px solid #333", transition: "0.2s" },
  td: { padding: "12px", color: "#fff", verticalAlign: "middle" },
  editButton: {
    padding: "5px 10px",
    backgroundColor: "#ff0000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    marginRight: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#555",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default ContactTable;