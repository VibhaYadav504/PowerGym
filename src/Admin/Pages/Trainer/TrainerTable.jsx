import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTrainer, getTrainers } from "../../Service/trainerService";


const TrainerTable = () => {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([]);

  // Fetch trainers from API
  const fetchTrainers = async () => {
    try {
      const data = await getTrainers();
      setTrainers(data);
    } catch (err) {
      console.error("Failed to fetch trainers:", err);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleDelete = async (trainerId) => {
    if (!window.confirm("Are you sure you want to delete this trainer?")) return;
    try {
      await deleteTrainer(trainerId);
      setTrainers((prev) => prev.filter((t) => t.id !== trainerId));
    } catch (err) {
      console.error("Failed to delete trainer:", err);
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <h2 style={styles.heading}>Trainers</h2>
        <button style={styles.addButton} onClick={() => navigate("/add-trainer")}>
          + Add Trainer
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Photo</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Position</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer.id} style={styles.tr}>
              <td style={styles.td}>
                <img src={trainer.photo} alt={trainer.name} style={styles.photo} />
              </td>
              <td style={styles.td}>{trainer.name}</td>
              <td style={styles.td}>{trainer.position}</td>
              <td style={styles.td}>
                <span
                  style={{
                    ...styles.status,
                    backgroundColor: trainer.status === "Active" ? "#ff0000" : "#555",
                  }}
                >
                  {trainer.status}
                </span>
              </td>
              <td style={styles.td}>
                <button
                  style={styles.editButton}
                  onClick={() => navigate(`/edit-trainer/${trainer._id}`)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(trainer.id)}
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

// Styles remain exactly as your theme
const styles = {
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

export default TrainerTable;