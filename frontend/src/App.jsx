import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import AddVehicle from "./pages/AddVehicle";
import EditVehicle from "./pages/EditVehicle";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

function MainLayout({ children, search, setSearch }) {
  return (
    <div className="flex min-h-screen bg-[#0b0f19] text-slate-100 font-sans antialiased">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Navbar search={search} setSearch={setSearch} />
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [globalSearch, setGlobalSearch] = useState("");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout search={globalSearch} setSearch={setGlobalSearch}>
              <Dashboard search={globalSearch} />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/vehicles"
        element={
          <PrivateRoute>
            <MainLayout search={globalSearch} setSearch={setGlobalSearch}>
              <Vehicles search={globalSearch} setSearch={setGlobalSearch} />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/vehicles/add"
        element={
          <PrivateRoute>
            <MainLayout search={globalSearch} setSearch={setGlobalSearch}>
              <AddVehicle />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/vehicles/edit/:id"
        element={
          <PrivateRoute>
            <MainLayout search={globalSearch} setSearch={setGlobalSearch}>
              <EditVehicle />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}