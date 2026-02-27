import React, { useEffect, useState } from "react";
import {
  FaBlog,
  FaImages,
  FaEnvelope,
  FaClipboardList,
  FaDumbbell,
  FaUsers,
  FaPhotoVideo,
} from "react-icons/fa";
import { getDashboardStats } from "../../Service/dashboardService";


const Dashboard = () => {
  const [stats, setStats] = useState([
    { title: "Total Blogs", count: 0, icon: <FaBlog /> },
    { title: "Total Carousel", count: 0, icon: <FaImages /> },
    { title: "Contact Messages", count: 0, icon: <FaEnvelope /> },
    { title: "Total Plans", count: 0, icon: <FaClipboardList /> },
    { title: "Total Programs", count: 0, icon: <FaDumbbell /> },
    { title: "Total Trainers", count: 0, icon: <FaUsers /> },
    { title: "Total Gallery Albums", count: 0, icon: <FaPhotoVideo /> },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();

        setStats([
          { title: "Total Blogs", count: data.totalBlogs, icon: <FaBlog /> },
          { title: "Total Carousel", count: data.totalCarousel, icon: <FaImages /> },
          { title: "Contact Messages", count: data.totalContacts, icon: <FaEnvelope /> },
          { title: "Total Plans", count: data.totalPlans, icon: <FaClipboardList /> },
          { title: "Total Programs", count: data.totalPrograms, icon: <FaDumbbell /> },
          { title: "Total Trainers", count: data.totalTrainers, icon: <FaUsers /> },
          { title: "Total Gallery Albums", count: data.totalGallery, icon: <FaPhotoVideo /> },
        ]);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 style={styles.heading}>Dashboard Overview</h1>

      <div className="dashboard-grid">
        {stats.map((item, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.icon}>{item.icon}</div>
            <h2 style={styles.count}>{item.count}</h2>
            <p style={styles.title}>{item.title}</p>
          </div>
        ))}
      </div>

      <style>
        {`
          .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
          }

          @media (max-width: 1024px) {
            .dashboard-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 600px) {
            .dashboard-grid {
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  heading: { color: "#fff", marginBottom: "30px" },
  card: {
    backgroundColor: "#141414",
    padding: "25px",
    borderRadius: "10px",
    border: "1px solid #ff0000",
    textAlign: "center",
    transition: "0.3s",
    cursor: "pointer",
  },
  icon: { fontSize: "28px", color: "#ff0000", marginBottom: "15px" },
  count: { fontSize: "32px", color: "#fff", margin: "10px 0" },
  title: { color: "#ccc" },
};

export default Dashboard;