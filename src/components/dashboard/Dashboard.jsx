import React from "react";
import RealtimeChart from "../RealtimeChart";
import SignupBarChart from "./SignupBarChart";
import ActivePieChart from "./ActivePieChart";

export default function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Realtime Analytics Dashboard</h1>
      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
        <div style={{ margin: "10px" }}>
          <h3>Users Count</h3>
          <RealtimeChart />
        </div>
        <div style={{ margin: "10px" }}>
          <h3>Recent Signups</h3>
          <SignupBarChart />
        </div>
        <div style={{ margin: "10px" }}>
          <h3>Active Users</h3>
          <ActivePieChart />
        </div>
      </div>
    </div>
  );
}
