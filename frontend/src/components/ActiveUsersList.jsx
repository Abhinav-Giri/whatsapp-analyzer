import React from "react";

function ActiveUsersList({ users }) {
  return (
    <div style={{ marginTop: 40 }}>
      <h3>Users Active ≥ 4 Days</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default ActiveUsersList;