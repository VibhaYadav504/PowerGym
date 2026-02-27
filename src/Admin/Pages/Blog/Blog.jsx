import React, { useState } from "react";
import BlogTable from "./BlogTable";


const Blog = () => {
  const [activeTab, setActiveTab] = useState("table"); // table, add, edit

  return (
    <div style={styles.container}>
      {/* Tabs */}
      <div style={styles.tabHeader}>
        <button
          style={activeTab === "table" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("table")}
        >
          Blog Table
        </button>
       
      </div>

      {/* Active Tab Content */}
      <div style={styles.tabContent}>
        {activeTab === "table" && <BlogTable />}
       
      </div>
    </div>
  );
};

const styles = {
  container: {
    color: "#fff",
  },
  tabHeader: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    backgroundColor: "#141414",
    border: "1px solid #ff0000",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#fff",
  },
  activeTab: {
    padding: "10px 20px",
    backgroundColor: "#ff0000",
    border: "1px solid #ff0000",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#000",
    fontWeight: "bold",
  },
  tabContent: {
    marginTop: "10px",
  },
};

export default Blog;