import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlans, deletePlan } from "../../Service/planService";

const PlanTable = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const data = await getPlans();
      setPlans(data);
    } catch (err) {
      console.error("Failed to fetch plans:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await deletePlan(id);
        fetchPlans(); // refresh table
      } catch (err) {
        console.error("Failed to delete plan:", err);
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.heading}>Plans</h2>
        <button
          style={styles.addButton}
          onClick={() => navigate("/add-plan")}
        >
          + Add Plan
        </button>
      </div>

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Service</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan._id} style={styles.tr}>
              <td style={styles.td}>{plan.price}</td>
              <td style={styles.td}>{plan.service}</td>
              <td style={styles.td}>
                <span
                  style={{
                    ...styles.status,
                    backgroundColor:
                      plan.status === "Active" ? "#ff0000" : "#555",
                  }}
                >
                  {plan.status}
                </span>
              </td>
              <td style={styles.td}>
               <button onClick={() => navigate(`/edit-plan/${plan._id}`)}>Edit</button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(plan._id)}
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
    cursor: "pointer",
  },
  tr: { borderBottom: "1px solid #333", transition: "0.2s" },
  td: { padding: "12px", color: "#fff", verticalAlign: "middle" },
  status: { padding: "5px 10px", borderRadius: "6px", color: "#fff", fontWeight: "bold" },
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

export default PlanTable;