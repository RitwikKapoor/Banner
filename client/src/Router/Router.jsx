import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Login from "../pages/Login.jsx";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/dashboard/login" replace />;
  }

  return children;
};

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/dashboard/main"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/dashboard/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
