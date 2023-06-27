import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
