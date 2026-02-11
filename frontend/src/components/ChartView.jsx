import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from "recharts";

function ChartView({ chartData }) {
  return (
    <div style={{ marginTop: 40 }}>
      <h3>Last 7 Days Activity</h3>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="activeUsers" fill="#007bff" />   {/* Blue */}
        <Bar dataKey="newUsers" fill="#ffa500" />      {/* Orange */}
      </BarChart>
    </div>
  );
}

export default ChartView;