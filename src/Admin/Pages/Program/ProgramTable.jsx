import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProgram, getPrograms } from "../../Service/programService";


const ProgramTable = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const data = await getPrograms();
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProgram(id);
      fetchPrograms();
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <h2 style={styles.heading}>Programs</h2>
        <button
          style={styles.addButton}
          onClick={() => navigate("/add-program")}
        >
          + Add Program
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Photo</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => (
            <tr key={program._id} style={styles.tr}>
              <td style={styles.td}>{program.title}</td>
              <td style={styles.td}>
                <img
                  src={program.photo}
                  alt={program.title}
                  style={styles.photo}
                />
              </td>
              <td style={styles.td}>{program.description}</td>
              <td style={styles.td}>
                <span
                  style={{
                    ...styles.status,
                    backgroundColor:
                      program.status === "Active" ? "#ff0000" : "#555",
                  }}
                >
                  {program.status}
                </span>
              </td>
              <td style={styles.td}>
                <button
                  style={styles.editButton}
                  onClick={() => navigate(`/edit-program/${program._id}`)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(program._id)}
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
  },
  tr: { borderBottom: "1px solid #333" },
  td: { padding: "12px", color: "#fff", verticalAlign: "middle" },
  photo: {
    width: "80px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  status: {
    padding: "5px 10px",
    borderRadius: "6px",
    color: "#fff",
    fontWeight: "bold",
  },
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

export default ProgramTable;