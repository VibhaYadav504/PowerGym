
import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.left}>
        © {new Date().getFullYear()} <span style={{ color: "#ff0000" }}>POWERGYM</span> Admin Panel
      </div>

      <div style={styles.right}>
        Designed with  by PowerGym
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    height: "60px",
    backgroundColor: "#111",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    borderTop: "2px solid #ff0000",
    fontSize: "14px",
  },
  left: {
    opacity: 0.8,
  },
  right: {
    opacity: 0.8,
  },
};

export default Footer;