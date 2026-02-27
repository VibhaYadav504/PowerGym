
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <span style={{ color: "#fff" }}>POWER</span>
        <span style={{ color: "#ff0000" }}>GYM</span>
        <span style={{ color: "#ff0000", marginLeft: "8px" }}>Admin</span>
      </div>

      <div style={styles.rightSection}>
        <FaUserCircle size={28} color="#ff0000" />
        <span style={{ color: "#fff", marginLeft: "8px" }}>Admin</span>
      </div>
    </header>
  );
};

const styles = {
  header: {
    height: "70px",
    backgroundColor: "#111",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    borderBottom: "2px solid #ff0000",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
  },
};

export default Header;