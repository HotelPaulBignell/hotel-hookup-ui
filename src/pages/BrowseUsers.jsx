import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function BrowseUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const snapshot = await getDocs(collection(db, "users"));
      const list = [];
      snapshot.forEach(doc => {
        if (doc.id !== auth.currentUser?.uid) {
          list.push(doc.data());
        }
      });
      setUsers(list);
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Other Guests</h2>
      {users.length === 0 && <p>No one else is here yet.</p>}
      {users.map((u, i) => (
        <div key={i} style={{ borderBottom: "1px solid #444", marginBottom: 10, paddingBottom: 10 }}>
          <strong>{u.name}</strong> ({u.age})<br />
          <em>{u.bio}</em>
        </div>
      ))}
    </div>
  );
}