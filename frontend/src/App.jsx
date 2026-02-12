import React, { useState } from "react";
import axios from "axios";
import ChartView from "./components/ChartView";
import ActiveUsersList from "./components/ActiveUsersList";

function App() {
  const [data, setData] = useState(null);

  const handleFileUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const res = await axios.post("http://localhost:5000/analyze", formData);
    setData(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>WhatsApp Chat Analyzer</h2>
      <input type="file" onChange={handleFileUpload} />

      {data && (
        <>
          <ChartView chartData={data.chartData} />
          <ActiveUsersList users={data.active4DaysUsers} />
        </>
      )}
    </div>
  );
}

export default App;