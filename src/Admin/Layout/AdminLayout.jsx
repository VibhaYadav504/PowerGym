// AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";


const AdminLayout = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header/>

      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar/>

        <div style={{ flex: 1, padding: "30px", background: "#000", color: "#fff" }}>
          <Outlet/>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default AdminLayout;