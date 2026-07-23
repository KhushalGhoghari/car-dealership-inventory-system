import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import AddVehicle from "./pages/AddVehicle";
import EditVehicle from "./pages/EditVehicle";

import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { token } = useAuth();

  return token ? children : <Navigate to="/login" />;
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        {children}
      </div>
    </>
  );
}

export default function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/vehicles"
        element={
          <PrivateRoute>
            <Layout>
              <Vehicles />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/vehicles/add"
        element={
          <PrivateRoute>
            <Layout>
              <AddVehicle />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/vehicles/edit/:id"
        element={
          <PrivateRoute>
            <Layout>
              <EditVehicle />
            </Layout>
          </PrivateRoute>
        }
      />

    </Routes>
  );
}