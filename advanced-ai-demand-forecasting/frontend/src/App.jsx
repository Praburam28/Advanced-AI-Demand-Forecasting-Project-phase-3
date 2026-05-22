import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Datasets from "./pages/Datasets";
import Forecasting from "./pages/Forecasting";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Monitoring from "./pages/Monitoring";
import Search from "./pages/Search";
import NotAuthorized from "./pages/NotAuthorized";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-white">
      <Sidebar open={sidebarOpen} close={() => setSidebarOpen(false)} />

      <main className="min-h-screen xl:ml-80">
        <Navbar toggleSidebar={() => setSidebarOpen(true)} />
        <section className="p-6 md:p-8">{children}</section>
      </main>
    </div>
  );
};

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
    <Route path="/datasets" element={<ProtectedRoute><Layout><Datasets /></Layout></ProtectedRoute>} />
    <Route path="/analytics" element={<ProtectedRoute><Layout><Analytics /></Layout></ProtectedRoute>} />
    <Route path="/reports" element={<ProtectedRoute><Layout><Reports /></Layout></ProtectedRoute>} />
    <Route path="/search" element={<ProtectedRoute><Layout><Search /></Layout></ProtectedRoute>} />

    <Route path="/forecasting" element={<RoleRoute allowedRoles={["Super Admin", "Analyst"]}><Layout><Forecasting /></Layout></RoleRoute>} />
    <Route path="/users" element={<RoleRoute allowedRoles={["Super Admin"]}><Layout><Users /></Layout></RoleRoute>} />
    <Route path="/monitoring" element={<RoleRoute allowedRoles={["Super Admin"]}><Layout><Monitoring /></Layout></RoleRoute>} />

    <Route path="/not-authorized" element={<NotAuthorized />} />
  </Routes>
);

export default App;