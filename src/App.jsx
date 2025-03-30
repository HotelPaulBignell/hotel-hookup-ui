import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import BrowseUsers from "./pages/BrowseUsers";
import EditProfile from "./pages/EditProfile";

export default function App() {
  return (
    <Router>
      <div style={{ padding: 20 }}>
        <img src="/hotel_hookup_logo_page1.png" alt="Logo" style={{ width: 120, marginBottom: 20 }} />
        <nav style={{ marginBottom: 20 }}>
          <Link to="/" style={{ marginRight: 10 }}>Home</Link>
          <Link to="/browse" style={{ marginRight: 10 }}>Browse</Link>
          <Link to="/profile">Edit Profile</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowseUsers />} />
          <Route path="/profile" element={<EditProfile />} />
        </Routes>
      </div>
    </Router>
  );
}