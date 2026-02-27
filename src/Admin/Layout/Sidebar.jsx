import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBlog,
  FaImages,
  FaPhotoVideo,
  FaEnvelope,
  FaClipboardList,
  FaDumbbell,
  FaUsers,
} from "react-icons/fa";

const Sidebar = () => {
  const getLinkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "6px",
    textDecoration: "none",
    color: isActive ? "#000" : "#fff",
    backgroundColor: isActive ? "#ff0000" : "transparent",
    transition: "0.3s",
  });

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Menu</h2>

      <ul style={styles.menu}>
        <li>
          <NavLink to="/dashboard" style={getLinkStyle}>
            <FaTachometerAlt /> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/blogs" style={getLinkStyle}>
            <FaBlog /> Blog
          </NavLink>
        </li>

        <li>
          <NavLink to="/carousels" style={getLinkStyle}>
            <FaImages /> Carousel
          </NavLink>
        </li>

        <li>
          <NavLink to="/gallerys" style={getLinkStyle}>
            <FaPhotoVideo /> Gallery
          </NavLink>
        </li>

        <li>
          <NavLink to="contacts" style={getLinkStyle}>
            <FaEnvelope /> Contact Form
          </NavLink>
        </li>

        <li>
          <NavLink to="/plans" style={getLinkStyle}>
            <FaClipboardList /> Plan
          </NavLink>
        </li>

        <li>
          <NavLink to="/programs" style={getLinkStyle}>
            <FaDumbbell /> Program
          </NavLink>
        </li>

        <li>
          <NavLink to="/trainers" style={getLinkStyle}>
            <FaUsers /> Trainers
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    backgroundColor: "#141414",
    padding: "20px",
    color: "#fff",
    borderRight: "2px solid #ff0000",
  },
  title: {
    marginBottom: "30px",
    color: "#ff0000",
  },
  menu: {
    listStyle: "none",
    padding: 0,
  },
};

export default Sidebar;