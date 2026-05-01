import { useState } from "react";

import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import AdminDashboard from "./Pages/AdminDashboard";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute role="admin" />}>
          {/* admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* user routes */}
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
        </Route>

        {/* auth routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
